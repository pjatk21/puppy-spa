import ky from 'ky'
import { useAppState } from './store'

type GqlResponseError<T = unknown> = {
  message: string
  extensions: Record<string, T>
}

type GqlLikeData<T> =
  | {
      data: T
      errors: undefined
    }
  | {
      data: undefined
      errors: GqlResponseError[]
    }

export class GqlFetchError extends Error {
  constructor(public readonly errors: GqlResponseError[]) {
    super(errors.map(({ message }) => message).join(' and '))
  }
}

export function kyFetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit['headers']
): () => Promise<TData> {
  return async () => {
    const { authToken: token, logout } = useAppState.getState()
    const r = await ky
      //.post(import.meta.env['VITE_GRAPHQL_URL'], {
      .post('/graphql', {
        json: {
          query,
          variables,
        },
        headers: {
          ...options,
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        retry: 0,
      })
      .json<GqlLikeData<TData>>()

    if (r.errors) {
      if (r.errors.some((err) => err.message === 'Unauthorized')) logout()

      throw new GqlFetchError(r.errors)
    }

    return r.data
  }
}
