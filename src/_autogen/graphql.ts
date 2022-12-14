/* eslint-disable */

import { useQuery, useInfiniteQuery, useMutation, UseQueryOptions, UseInfiniteQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { kyFetcher } from 'src/http';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
};

export type App = {
  __typename?: 'App';
  version: Scalars['String'];
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
  app: App;
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
  /** All available scrapers rejected task execution. */
  Rejected = 'REJECTED',
  /** Task is being executed by a scraper. */
  Running = 'RUNNING',
  /** Task is looking for a scraper that can execute it. */
  Waiting = 'WAITING'
}

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  groups: Array<Scalars['String']>;
  name: Scalars['String'];
  scrapers: Array<Scraper>;
};

export type AppQueryVariables = Exact<{ [key: string]: never; }>;


export type AppQuery = { __typename?: 'Query', app: { __typename?: 'App', version: string } };

export type DashboardQueryVariables = Exact<{ [key: string]: never; }>;


export type DashboardQuery = { __typename?: 'Query', me: { __typename?: 'User', name: string, email: string } };

export type QuickPeekQueryVariables = Exact<{
  begin: Scalars['DateTime'];
  end: Scalars['DateTime'];
  rangeEventsGroups2?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type QuickPeekQuery = { __typename?: 'Query', me: { __typename?: 'User', name: string, email: string }, rangeEvents: Array<{ __typename?: 'ScheduledEvent', begin: string, code: string }> };

export type LoginGoogleMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type LoginGoogleMutation = { __typename?: 'Mutation', oauth2: { __typename?: 'OAuth2', google: { __typename?: 'Session', token: string } } };

export type RangeEventsQueryVariables = Exact<{
  begin: Scalars['DateTime'];
  end: Scalars['DateTime'];
  groups?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type RangeEventsQuery = { __typename?: 'Query', rangeEvents: Array<{ __typename?: 'ScheduledEvent', begin: string, end: string, title: string, code: string, hosts: Array<string>, room: string, type: EventType }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', name: string, email: string, groups: Array<string> } };

export type SetGroupsMutationVariables = Exact<{
  groups: Array<Scalars['String']> | Scalars['String'];
}>;


export type SetGroupsMutation = { __typename?: 'Mutation', setGroups: Array<string> };


export const AppDocument = `
    query App {
  app {
    version
  }
}
    `;
export const useAppQuery = <
      TData = AppQuery,
      TError = unknown
    >(
      variables?: AppQueryVariables,
      options?: UseQueryOptions<AppQuery, TError, TData>
    ) =>
    useQuery<AppQuery, TError, TData>(
      variables === undefined ? ['App'] : ['App', variables],
      kyFetcher<AppQuery, AppQueryVariables>(AppDocument, variables),
      options
    );
export const useInfiniteAppQuery = <
      TData = AppQuery,
      TError = unknown
    >(
      variables?: AppQueryVariables,
      options?: UseInfiniteQueryOptions<AppQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<AppQuery, TError, TData>(
      variables === undefined ? ['App.infinite'] : ['App.infinite', variables],
      (metaData) => kyFetcher<AppQuery, AppQueryVariables>(AppDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const DashboardDocument = `
    query Dashboard {
  me {
    name
    email
  }
}
    `;
export const useDashboardQuery = <
      TData = DashboardQuery,
      TError = unknown
    >(
      variables?: DashboardQueryVariables,
      options?: UseQueryOptions<DashboardQuery, TError, TData>
    ) =>
    useQuery<DashboardQuery, TError, TData>(
      variables === undefined ? ['Dashboard'] : ['Dashboard', variables],
      kyFetcher<DashboardQuery, DashboardQueryVariables>(DashboardDocument, variables),
      options
    );
export const useInfiniteDashboardQuery = <
      TData = DashboardQuery,
      TError = unknown
    >(
      variables?: DashboardQueryVariables,
      options?: UseInfiniteQueryOptions<DashboardQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<DashboardQuery, TError, TData>(
      variables === undefined ? ['Dashboard.infinite'] : ['Dashboard.infinite', variables],
      (metaData) => kyFetcher<DashboardQuery, DashboardQueryVariables>(DashboardDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const QuickPeekDocument = `
    query QuickPeek($begin: DateTime!, $end: DateTime!, $rangeEventsGroups2: [String!]) {
  me {
    name
    email
  }
  rangeEvents(begin: $begin, end: $end, groups: $rangeEventsGroups2) {
    begin
    code
  }
}
    `;
export const useQuickPeekQuery = <
      TData = QuickPeekQuery,
      TError = unknown
    >(
      variables: QuickPeekQueryVariables,
      options?: UseQueryOptions<QuickPeekQuery, TError, TData>
    ) =>
    useQuery<QuickPeekQuery, TError, TData>(
      ['QuickPeek', variables],
      kyFetcher<QuickPeekQuery, QuickPeekQueryVariables>(QuickPeekDocument, variables),
      options
    );
export const useInfiniteQuickPeekQuery = <
      TData = QuickPeekQuery,
      TError = unknown
    >(
      variables: QuickPeekQueryVariables,
      options?: UseInfiniteQueryOptions<QuickPeekQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<QuickPeekQuery, TError, TData>(
      ['QuickPeek.infinite', variables],
      (metaData) => kyFetcher<QuickPeekQuery, QuickPeekQueryVariables>(QuickPeekDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

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
      (variables?: LoginGoogleMutationVariables) => kyFetcher<LoginGoogleMutation, LoginGoogleMutationVariables>(LoginGoogleDocument, variables)(),
      options
    );
export const RangeEventsDocument = `
    query RangeEvents($begin: DateTime!, $end: DateTime!, $groups: [String!]) {
  rangeEvents(begin: $begin, end: $end, groups: $groups) {
    begin
    end
    title
    code
    hosts
    room
    type
  }
}
    `;
export const useRangeEventsQuery = <
      TData = RangeEventsQuery,
      TError = unknown
    >(
      variables: RangeEventsQueryVariables,
      options?: UseQueryOptions<RangeEventsQuery, TError, TData>
    ) =>
    useQuery<RangeEventsQuery, TError, TData>(
      ['RangeEvents', variables],
      kyFetcher<RangeEventsQuery, RangeEventsQueryVariables>(RangeEventsDocument, variables),
      options
    );
export const useInfiniteRangeEventsQuery = <
      TData = RangeEventsQuery,
      TError = unknown
    >(
      variables: RangeEventsQueryVariables,
      options?: UseInfiniteQueryOptions<RangeEventsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<RangeEventsQuery, TError, TData>(
      ['RangeEvents.infinite', variables],
      (metaData) => kyFetcher<RangeEventsQuery, RangeEventsQueryVariables>(RangeEventsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

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
      kyFetcher<MeQuery, MeQueryVariables>(MeDocument, variables),
      options
    );
export const useInfiniteMeQuery = <
      TData = MeQuery,
      TError = unknown
    >(
      variables?: MeQueryVariables,
      options?: UseInfiniteQueryOptions<MeQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<MeQuery, TError, TData>(
      variables === undefined ? ['Me.infinite'] : ['Me.infinite', variables],
      (metaData) => kyFetcher<MeQuery, MeQueryVariables>(MeDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

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
      (variables?: SetGroupsMutationVariables) => kyFetcher<SetGroupsMutation, SetGroupsMutationVariables>(SetGroupsDocument, variables)(),
      options
    );