import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("https://puppy.kpostek.dev/graphql", {
    method: "POST",
    ...({"headers":{"Content-Type":"application/json; charset=utf-8"}}),
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export enum EventType {
  Exam = 'exam',
  Lecture = 'lecture',
  Other = 'other',
  Reservation = 'reservation',
  Workshop = 'workshop'
}

export type Mutation = {
  __typename?: 'Mutation';
  createPuppy?: Maybe<Puppy>;
  createScraper: ScraperToken;
  oauth2: OAuth2;
  processFragment: ScheduledEvent;
  setGroups: Array<Scalars['String']>;
  triggerTask: Scalars['String'];
  updateOwnState: Scalars['String'];
  updateTaskState: Scalars['String'];
};


export type MutationCreatePuppyArgs = {
  age: Scalars['Int'];
  name: Scalars['String'];
};


export type MutationCreateScraperArgs = {
  alias?: InputMaybe<Scalars['String']>;
};


export type MutationProcessFragmentArgs = {
  html: Scalars['String'];
};


export type MutationSetGroupsArgs = {
  groups: Array<Scalars['String']>;
};


export type MutationTriggerTaskArgs = {
  taskId: Scalars['ID'];
};


export type MutationUpdateOwnStateArgs = {
  scraperId: Scalars['ID'];
  state: Scalars['String'];
};


export type MutationUpdateTaskStateArgs = {
  state: Scalars['String'];
  taskId: Scalars['ID'];
};

export type OAuth2 = {
  __typename?: 'OAuth2';
  google: Session;
};


export type OAuth2GoogleArgs = {
  code: Scalars['String'];
};

export type Puppy = {
  __typename?: 'Puppy';
  age: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allEvents: Array<ScheduledEvent>;
  allPuppies: Array<Puppy>;
  availableGroups: Array<Scalars['String']>;
  availableHosts: Array<Scalars['String']>;
  me: User;
  puppies: Array<Puppy>;
  puppy?: Maybe<Puppy>;
  rangeEvents: Array<ScheduledEvent>;
};


export type QueryAllEventsArgs = {
  groups?: InputMaybe<Array<Scalars['String']>>;
  hosts?: InputMaybe<Array<Scalars['String']>>;
  type?: InputMaybe<EventType>;
};


export type QueryPuppiesArgs = {
  id: Array<Scalars['ID']>;
};


export type QueryPuppyArgs = {
  id: Scalars['ID'];
};


export type QueryRangeEventsArgs = {
  begin: Scalars['DateTime'];
  end: Scalars['DateTime'];
  groups?: InputMaybe<Array<Scalars['String']>>;
  hosts?: InputMaybe<Array<Scalars['String']>>;
  type?: InputMaybe<EventType>;
};

export type ScheduledEvent = {
  __typename?: 'ScheduledEvent';
  begin: Scalars['DateTime'];
  code: Scalars['String'];
  end: Scalars['DateTime'];
  groups: Array<Scalars['String']>;
  hosts: Array<Scalars['String']>;
  id: Scalars['ID'];
  room: Scalars['String'];
  title: Scalars['String'];
  type: EventType;
};

/** Arguments required to start scrapping. */
export type ScrapTask = {
  __typename?: 'ScrapTask';
  id: Scalars['ID'];
  name: Scalars['String'];
  /** First day to scrap */
  since: Scalars['DateTime'];
  /** State of task */
  state: TaskState;
  /** Last day to scrap */
  until: Scalars['DateTime'];
};

export type Scraper = {
  __typename?: 'Scraper';
  alias?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

export type ScraperToken = {
  __typename?: 'ScraperToken';
  token: Scalars['String'];
};

export type Session = {
  __typename?: 'Session';
  expiresAfter: Scalars['DateTime'];
  token: Scalars['String'];
  userId: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  tasksDispositions?: Maybe<ScrapTask>;
};

export enum TaskState {
  /** Task execution finished. */
  Done = 'DONE',
  /** All available scrappers rejected task execution. */
  Rejected = 'REJECTED',
  /** Task is being executed by a scrapper. */
  Running = 'RUNNING',
  /** Task is looking for a scrapper that can execute it. */
  Waiting = 'WAITING'
}

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  groups: Array<Scalars['String']>;
  name: Scalars['String'];
  scrapers: Array<Scraper>;
};

export type LoginGoogleMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type LoginGoogleMutation = { __typename?: 'Mutation', oauth2: { __typename?: 'OAuth2', google: { __typename?: 'Session', token: string } } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', name: string, email: string, groups: Array<string> } };

export type SetGroupsMutationVariables = Exact<{
  groups: Array<Scalars['String']> | Scalars['String'];
}>;


export type SetGroupsMutation = { __typename?: 'Mutation', setGroups: Array<string> };


export const LoginGoogleDocument = `
    mutation LoginGoogle($code: String!) {
  oauth2 {
    google(code: $code) {
      token
    }
  }
}
    `;
export const useLoginGoogleMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<LoginGoogleMutation, TError, LoginGoogleMutationVariables, TContext>) =>
    useMutation<LoginGoogleMutation, TError, LoginGoogleMutationVariables, TContext>(
      ['LoginGoogle'],
      (variables?: LoginGoogleMutationVariables) => fetcher<LoginGoogleMutation, LoginGoogleMutationVariables>(LoginGoogleDocument, variables)(),
      options
    );
export const MeDocument = `
    query Me {
  me {
    name
    email
    groups
  }
}
    `;
export const useMeQuery = <
      TData = MeQuery,
      TError = unknown
    >(
      variables?: MeQueryVariables,
      options?: UseQueryOptions<MeQuery, TError, TData>
    ) =>
    useQuery<MeQuery, TError, TData>(
      variables === undefined ? ['Me'] : ['Me', variables],
      fetcher<MeQuery, MeQueryVariables>(MeDocument, variables),
      options
    );
export const SetGroupsDocument = `
    mutation SetGroups($groups: [String!]!) {
  setGroups(groups: $groups)
}
    `;
export const useSetGroupsMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SetGroupsMutation, TError, SetGroupsMutationVariables, TContext>) =>
    useMutation<SetGroupsMutation, TError, SetGroupsMutationVariables, TContext>(
      ['SetGroups'],
      (variables?: SetGroupsMutationVariables) => fetcher<SetGroupsMutation, SetGroupsMutationVariables>(SetGroupsDocument, variables)(),
      options
    );