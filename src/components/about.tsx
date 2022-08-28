import { useAppQuery } from '@codegen/graphql'
import { version } from 'package.json'

export function AboutApp() {
  const aboutApp = useAppQuery()

  if (!aboutApp.data) return null
  return (
    <span className="text-sm">
      api v{aboutApp.data.app.version}, app v{version}
    </span>
  )
}
