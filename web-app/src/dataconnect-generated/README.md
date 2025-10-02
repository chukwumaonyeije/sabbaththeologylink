# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListModules*](#listmodules)
  - [*GetQuarterModules*](#getquartermodules)
  - [*GetModuleById*](#getmodulebyid)
  - [*GetUserProgress*](#getuserprogress)
  - [*GetUserQuizHistory*](#getuserquizhistory)
  - [*SearchModules*](#searchmodules)
  - [*ListQuizzes*](#listquizzes)
  - [*GetQuizById*](#getquizbyid)
- [**Mutations**](#mutations)
  - [*UpsertUser*](#upsertuser)
  - [*CreateModule*](#createmodule)
  - [*UpdateUserProgress*](#updateuserprogress)
  - [*SubmitQuizAttempt*](#submitquizattempt)
  - [*UpdateProgressWithQuizScore*](#updateprogresswithquizscore)
  - [*UpdateUserSettings*](#updateusersettings)
  - [*CreateQuiz*](#createquiz)
  - [*CreateQuestion*](#createquestion)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListModules
You can execute the `ListModules` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listModules(): QueryPromise<ListModulesData, undefined>;

interface ListModulesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListModulesData, undefined>;
}
export const listModulesRef: ListModulesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listModules(dc: DataConnect): QueryPromise<ListModulesData, undefined>;

interface ListModulesRef {
  ...
  (dc: DataConnect): QueryRef<ListModulesData, undefined>;
}
export const listModulesRef: ListModulesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listModulesRef:
```typescript
const name = listModulesRef.operationName;
console.log(name);
```

### Variables
The `ListModules` query has no variables.
### Return Type
Recall that executing the `ListModules` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListModulesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListModulesData {
  modules: ({
    id: UUIDString;
    title: string;
    type: string;
    quarter?: string | null;
    week?: number | null;
    day?: string | null;
    memoryText?: string | null;
    summary?: string | null;
    theologyTags: string[];
    difficulty?: string | null;
    estimatedReadTime?: number | null;
    author?: string | null;
    createdAt: DateString;
  } & Module_Key)[];
}
```
### Using `ListModules`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listModules } from '@dataconnect/generated';


// Call the `listModules()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listModules();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listModules(dataConnect);

console.log(data.modules);

// Or, you can use the `Promise` API.
listModules().then((response) => {
  const data = response.data;
  console.log(data.modules);
});
```

### Using `ListModules`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listModulesRef } from '@dataconnect/generated';


// Call the `listModulesRef()` function to get a reference to the query.
const ref = listModulesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listModulesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.modules);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.modules);
});
```

## GetQuarterModules
You can execute the `GetQuarterModules` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getQuarterModules(vars: GetQuarterModulesVariables): QueryPromise<GetQuarterModulesData, GetQuarterModulesVariables>;

interface GetQuarterModulesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuarterModulesVariables): QueryRef<GetQuarterModulesData, GetQuarterModulesVariables>;
}
export const getQuarterModulesRef: GetQuarterModulesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getQuarterModules(dc: DataConnect, vars: GetQuarterModulesVariables): QueryPromise<GetQuarterModulesData, GetQuarterModulesVariables>;

interface GetQuarterModulesRef {
  ...
  (dc: DataConnect, vars: GetQuarterModulesVariables): QueryRef<GetQuarterModulesData, GetQuarterModulesVariables>;
}
export const getQuarterModulesRef: GetQuarterModulesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getQuarterModulesRef:
```typescript
const name = getQuarterModulesRef.operationName;
console.log(name);
```

### Variables
The `GetQuarterModules` query requires an argument of type `GetQuarterModulesVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetQuarterModulesVariables {
  quarter: string;
}
```
### Return Type
Recall that executing the `GetQuarterModules` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetQuarterModulesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetQuarterModulesData {
  modules: ({
    id: UUIDString;
    title: string;
    week?: number | null;
    day?: string | null;
    memoryText?: string | null;
    summary?: string | null;
    theologyTags: string[];
    estimatedReadTime?: number | null;
    createdAt: DateString;
  } & Module_Key)[];
}
```
### Using `GetQuarterModules`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getQuarterModules, GetQuarterModulesVariables } from '@dataconnect/generated';

// The `GetQuarterModules` query requires an argument of type `GetQuarterModulesVariables`:
const getQuarterModulesVars: GetQuarterModulesVariables = {
  quarter: ..., 
};

// Call the `getQuarterModules()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getQuarterModules(getQuarterModulesVars);
// Variables can be defined inline as well.
const { data } = await getQuarterModules({ quarter: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getQuarterModules(dataConnect, getQuarterModulesVars);

console.log(data.modules);

// Or, you can use the `Promise` API.
getQuarterModules(getQuarterModulesVars).then((response) => {
  const data = response.data;
  console.log(data.modules);
});
```

### Using `GetQuarterModules`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getQuarterModulesRef, GetQuarterModulesVariables } from '@dataconnect/generated';

// The `GetQuarterModules` query requires an argument of type `GetQuarterModulesVariables`:
const getQuarterModulesVars: GetQuarterModulesVariables = {
  quarter: ..., 
};

// Call the `getQuarterModulesRef()` function to get a reference to the query.
const ref = getQuarterModulesRef(getQuarterModulesVars);
// Variables can be defined inline as well.
const ref = getQuarterModulesRef({ quarter: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getQuarterModulesRef(dataConnect, getQuarterModulesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.modules);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.modules);
});
```

## GetModuleById
You can execute the `GetModuleById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getModuleById(vars: GetModuleByIdVariables): QueryPromise<GetModuleByIdData, GetModuleByIdVariables>;

interface GetModuleByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetModuleByIdVariables): QueryRef<GetModuleByIdData, GetModuleByIdVariables>;
}
export const getModuleByIdRef: GetModuleByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getModuleById(dc: DataConnect, vars: GetModuleByIdVariables): QueryPromise<GetModuleByIdData, GetModuleByIdVariables>;

interface GetModuleByIdRef {
  ...
  (dc: DataConnect, vars: GetModuleByIdVariables): QueryRef<GetModuleByIdData, GetModuleByIdVariables>;
}
export const getModuleByIdRef: GetModuleByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getModuleByIdRef:
```typescript
const name = getModuleByIdRef.operationName;
console.log(name);
```

### Variables
The `GetModuleById` query requires an argument of type `GetModuleByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetModuleByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetModuleById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetModuleByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetModuleByIdData {
  module?: {
    id: UUIDString;
    title: string;
    type: string;
    perspective: string;
    quarter?: string | null;
    week?: number | null;
    day?: string | null;
    memoryText?: string | null;
    contentHtml: string;
    summary?: string | null;
    theologyTags: string[];
    difficulty?: string | null;
    estimatedReadTime?: number | null;
    sourceUrl?: string | null;
    author?: string | null;
    createdAt: DateString;
    quizzes: ({
      id: UUIDString;
      title: string;
      questions: ({
        id: UUIDString;
        questionText: string;
        questionType: string;
        options?: string[] | null;
        explanation?: string | null;
        order: number;
      } & Question_Key)[];
    } & Quiz_Key)[];
  } & Module_Key;
}
```
### Using `GetModuleById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getModuleById, GetModuleByIdVariables } from '@dataconnect/generated';

// The `GetModuleById` query requires an argument of type `GetModuleByIdVariables`:
const getModuleByIdVars: GetModuleByIdVariables = {
  id: ..., 
};

// Call the `getModuleById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getModuleById(getModuleByIdVars);
// Variables can be defined inline as well.
const { data } = await getModuleById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getModuleById(dataConnect, getModuleByIdVars);

console.log(data.module);

// Or, you can use the `Promise` API.
getModuleById(getModuleByIdVars).then((response) => {
  const data = response.data;
  console.log(data.module);
});
```

### Using `GetModuleById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getModuleByIdRef, GetModuleByIdVariables } from '@dataconnect/generated';

// The `GetModuleById` query requires an argument of type `GetModuleByIdVariables`:
const getModuleByIdVars: GetModuleByIdVariables = {
  id: ..., 
};

// Call the `getModuleByIdRef()` function to get a reference to the query.
const ref = getModuleByIdRef(getModuleByIdVars);
// Variables can be defined inline as well.
const ref = getModuleByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getModuleByIdRef(dataConnect, getModuleByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.module);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.module);
});
```

## GetUserProgress
You can execute the `GetUserProgress` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserProgress(): QueryPromise<GetUserProgressData, undefined>;

interface GetUserProgressRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserProgressData, undefined>;
}
export const getUserProgressRef: GetUserProgressRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserProgress(dc: DataConnect): QueryPromise<GetUserProgressData, undefined>;

interface GetUserProgressRef {
  ...
  (dc: DataConnect): QueryRef<GetUserProgressData, undefined>;
}
export const getUserProgressRef: GetUserProgressRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserProgressRef:
```typescript
const name = getUserProgressRef.operationName;
console.log(name);
```

### Variables
The `GetUserProgress` query has no variables.
### Return Type
Recall that executing the `GetUserProgress` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserProgressData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserProgressData {
  user?: {
    id: string;
    name: string;
    bibleVersion?: string | null;
    progress: ({
      status: string;
      progressPercent?: number | null;
      bestScore?: number | null;
      lastScore?: number | null;
      quizAttempts?: number | null;
      completedAt?: DateString | null;
      lastAccessedAt?: DateString | null;
      module: {
        id: UUIDString;
        title: string;
        type: string;
        quarter?: string | null;
        week?: number | null;
        day?: string | null;
      } & Module_Key;
    })[];
  } & User_Key;
}
```
### Using `GetUserProgress`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserProgress } from '@dataconnect/generated';


// Call the `getUserProgress()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserProgress();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserProgress(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getUserProgress().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUserProgress`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserProgressRef } from '@dataconnect/generated';


// Call the `getUserProgressRef()` function to get a reference to the query.
const ref = getUserProgressRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserProgressRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## GetUserQuizHistory
You can execute the `GetUserQuizHistory` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserQuizHistory(): QueryPromise<GetUserQuizHistoryData, undefined>;

interface GetUserQuizHistoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserQuizHistoryData, undefined>;
}
export const getUserQuizHistoryRef: GetUserQuizHistoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserQuizHistory(dc: DataConnect): QueryPromise<GetUserQuizHistoryData, undefined>;

interface GetUserQuizHistoryRef {
  ...
  (dc: DataConnect): QueryRef<GetUserQuizHistoryData, undefined>;
}
export const getUserQuizHistoryRef: GetUserQuizHistoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserQuizHistoryRef:
```typescript
const name = getUserQuizHistoryRef.operationName;
console.log(name);
```

### Variables
The `GetUserQuizHistory` query has no variables.
### Return Type
Recall that executing the `GetUserQuizHistory` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserQuizHistoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserQuizHistoryData {
  quizAttempts: ({
    id: UUIDString;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    completedAt?: DateString | null;
    timeSpentMinutes?: number | null;
    quiz: {
      title: string;
      module?: {
        title: string;
        type: string;
      };
    };
  } & QuizAttempt_Key)[];
}
```
### Using `GetUserQuizHistory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserQuizHistory } from '@dataconnect/generated';


// Call the `getUserQuizHistory()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserQuizHistory();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserQuizHistory(dataConnect);

console.log(data.quizAttempts);

// Or, you can use the `Promise` API.
getUserQuizHistory().then((response) => {
  const data = response.data;
  console.log(data.quizAttempts);
});
```

### Using `GetUserQuizHistory`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserQuizHistoryRef } from '@dataconnect/generated';


// Call the `getUserQuizHistoryRef()` function to get a reference to the query.
const ref = getUserQuizHistoryRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserQuizHistoryRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.quizAttempts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.quizAttempts);
});
```

## SearchModules
You can execute the `SearchModules` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
searchModules(vars?: SearchModulesVariables): QueryPromise<SearchModulesData, SearchModulesVariables>;

interface SearchModulesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: SearchModulesVariables): QueryRef<SearchModulesData, SearchModulesVariables>;
}
export const searchModulesRef: SearchModulesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
searchModules(dc: DataConnect, vars?: SearchModulesVariables): QueryPromise<SearchModulesData, SearchModulesVariables>;

interface SearchModulesRef {
  ...
  (dc: DataConnect, vars?: SearchModulesVariables): QueryRef<SearchModulesData, SearchModulesVariables>;
}
export const searchModulesRef: SearchModulesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the searchModulesRef:
```typescript
const name = searchModulesRef.operationName;
console.log(name);
```

### Variables
The `SearchModules` query has an optional argument of type `SearchModulesVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SearchModulesVariables {
  searchTerm?: string | null;
  type?: string | null;
  tags?: string[] | null;
}
```
### Return Type
Recall that executing the `SearchModules` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SearchModulesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SearchModulesData {
  modules: ({
    id: UUIDString;
    title: string;
    type: string;
    summary?: string | null;
    theologyTags: string[];
    quarter?: string | null;
    week?: number | null;
    day?: string | null;
    author?: string | null;
    createdAt: DateString;
  } & Module_Key)[];
}
```
### Using `SearchModules`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, searchModules, SearchModulesVariables } from '@dataconnect/generated';

// The `SearchModules` query has an optional argument of type `SearchModulesVariables`:
const searchModulesVars: SearchModulesVariables = {
  searchTerm: ..., // optional
  type: ..., // optional
  tags: ..., // optional
};

// Call the `searchModules()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await searchModules(searchModulesVars);
// Variables can be defined inline as well.
const { data } = await searchModules({ searchTerm: ..., type: ..., tags: ..., });
// Since all variables are optional for this query, you can omit the `SearchModulesVariables` argument.
const { data } = await searchModules();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await searchModules(dataConnect, searchModulesVars);

console.log(data.modules);

// Or, you can use the `Promise` API.
searchModules(searchModulesVars).then((response) => {
  const data = response.data;
  console.log(data.modules);
});
```

### Using `SearchModules`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, searchModulesRef, SearchModulesVariables } from '@dataconnect/generated';

// The `SearchModules` query has an optional argument of type `SearchModulesVariables`:
const searchModulesVars: SearchModulesVariables = {
  searchTerm: ..., // optional
  type: ..., // optional
  tags: ..., // optional
};

// Call the `searchModulesRef()` function to get a reference to the query.
const ref = searchModulesRef(searchModulesVars);
// Variables can be defined inline as well.
const ref = searchModulesRef({ searchTerm: ..., type: ..., tags: ..., });
// Since all variables are optional for this query, you can omit the `SearchModulesVariables` argument.
const ref = searchModulesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = searchModulesRef(dataConnect, searchModulesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.modules);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.modules);
});
```

## ListQuizzes
You can execute the `ListQuizzes` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listQuizzes(): QueryPromise<ListQuizzesData, undefined>;

interface ListQuizzesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListQuizzesData, undefined>;
}
export const listQuizzesRef: ListQuizzesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listQuizzes(dc: DataConnect): QueryPromise<ListQuizzesData, undefined>;

interface ListQuizzesRef {
  ...
  (dc: DataConnect): QueryRef<ListQuizzesData, undefined>;
}
export const listQuizzesRef: ListQuizzesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listQuizzesRef:
```typescript
const name = listQuizzesRef.operationName;
console.log(name);
```

### Variables
The `ListQuizzes` query has no variables.
### Return Type
Recall that executing the `ListQuizzes` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListQuizzesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListQuizzesData {
  quizzes: ({
    id: UUIDString;
    title: string;
    createdAt: DateString;
    module?: {
      id: UUIDString;
      title: string;
      type: string;
      difficulty?: string | null;
      theologyTags: string[];
    } & Module_Key;
      questions: ({
        id: UUIDString;
        questionText: string;
        questionType: string;
        options?: string[] | null;
        explanation?: string | null;
        order: number;
      } & Question_Key)[];
  } & Quiz_Key)[];
}
```
### Using `ListQuizzes`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listQuizzes } from '@dataconnect/generated';


// Call the `listQuizzes()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listQuizzes();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listQuizzes(dataConnect);

console.log(data.quizzes);

// Or, you can use the `Promise` API.
listQuizzes().then((response) => {
  const data = response.data;
  console.log(data.quizzes);
});
```

### Using `ListQuizzes`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listQuizzesRef } from '@dataconnect/generated';


// Call the `listQuizzesRef()` function to get a reference to the query.
const ref = listQuizzesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listQuizzesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.quizzes);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.quizzes);
});
```

## GetQuizById
You can execute the `GetQuizById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getQuizById(vars: GetQuizByIdVariables): QueryPromise<GetQuizByIdData, GetQuizByIdVariables>;

interface GetQuizByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuizByIdVariables): QueryRef<GetQuizByIdData, GetQuizByIdVariables>;
}
export const getQuizByIdRef: GetQuizByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getQuizById(dc: DataConnect, vars: GetQuizByIdVariables): QueryPromise<GetQuizByIdData, GetQuizByIdVariables>;

interface GetQuizByIdRef {
  ...
  (dc: DataConnect, vars: GetQuizByIdVariables): QueryRef<GetQuizByIdData, GetQuizByIdVariables>;
}
export const getQuizByIdRef: GetQuizByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getQuizByIdRef:
```typescript
const name = getQuizByIdRef.operationName;
console.log(name);
```

### Variables
The `GetQuizById` query requires an argument of type `GetQuizByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetQuizByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetQuizById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetQuizByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetQuizByIdData {
  quiz?: {
    id: UUIDString;
    title: string;
    createdAt: DateString;
    module?: {
      id: UUIDString;
      title: string;
      type: string;
      difficulty?: string | null;
      theologyTags: string[];
    } & Module_Key;
      questions: ({
        id: UUIDString;
        questionText: string;
        questionType: string;
        options?: string[] | null;
        correctAnswer: string;
        explanation?: string | null;
        order: number;
      } & Question_Key)[];
  } & Quiz_Key;
}
```
### Using `GetQuizById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getQuizById, GetQuizByIdVariables } from '@dataconnect/generated';

// The `GetQuizById` query requires an argument of type `GetQuizByIdVariables`:
const getQuizByIdVars: GetQuizByIdVariables = {
  id: ..., 
};

// Call the `getQuizById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getQuizById(getQuizByIdVars);
// Variables can be defined inline as well.
const { data } = await getQuizById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getQuizById(dataConnect, getQuizByIdVars);

console.log(data.quiz);

// Or, you can use the `Promise` API.
getQuizById(getQuizByIdVars).then((response) => {
  const data = response.data;
  console.log(data.quiz);
});
```

### Using `GetQuizById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getQuizByIdRef, GetQuizByIdVariables } from '@dataconnect/generated';

// The `GetQuizById` query requires an argument of type `GetQuizByIdVariables`:
const getQuizByIdVars: GetQuizByIdVariables = {
  id: ..., 
};

// Call the `getQuizByIdRef()` function to get a reference to the query.
const ref = getQuizByIdRef(getQuizByIdVars);
// Variables can be defined inline as well.
const ref = getQuizByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getQuizByIdRef(dataConnect, getQuizByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.quiz);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.quiz);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## UpsertUser
You can execute the `UpsertUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
upsertUser(vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface UpsertUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
}
export const upsertUserRef: UpsertUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertUser(dc: DataConnect, vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface UpsertUserRef {
  ...
  (dc: DataConnect, vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
}
export const upsertUserRef: UpsertUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertUserRef:
```typescript
const name = upsertUserRef.operationName;
console.log(name);
```

### Variables
The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertUserVariables {
  name: string;
  email: string;
  bibleVersion?: string | null;
}
```
### Return Type
Recall that executing the `UpsertUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertUserData {
  user_upsert: User_Key;
}
```
### Using `UpsertUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertUser, UpsertUserVariables } from '@dataconnect/generated';

// The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`:
const upsertUserVars: UpsertUserVariables = {
  name: ..., 
  email: ..., 
  bibleVersion: ..., // optional
};

// Call the `upsertUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertUser(upsertUserVars);
// Variables can be defined inline as well.
const { data } = await upsertUser({ name: ..., email: ..., bibleVersion: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertUser(dataConnect, upsertUserVars);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
upsertUser(upsertUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

### Using `UpsertUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertUserRef, UpsertUserVariables } from '@dataconnect/generated';

// The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`:
const upsertUserVars: UpsertUserVariables = {
  name: ..., 
  email: ..., 
  bibleVersion: ..., // optional
};

// Call the `upsertUserRef()` function to get a reference to the mutation.
const ref = upsertUserRef(upsertUserVars);
// Variables can be defined inline as well.
const ref = upsertUserRef({ name: ..., email: ..., bibleVersion: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertUserRef(dataConnect, upsertUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

## CreateModule
You can execute the `CreateModule` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createModule(vars: CreateModuleVariables): MutationPromise<CreateModuleData, CreateModuleVariables>;

interface CreateModuleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateModuleVariables): MutationRef<CreateModuleData, CreateModuleVariables>;
}
export const createModuleRef: CreateModuleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createModule(dc: DataConnect, vars: CreateModuleVariables): MutationPromise<CreateModuleData, CreateModuleVariables>;

interface CreateModuleRef {
  ...
  (dc: DataConnect, vars: CreateModuleVariables): MutationRef<CreateModuleData, CreateModuleVariables>;
}
export const createModuleRef: CreateModuleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createModuleRef:
```typescript
const name = createModuleRef.operationName;
console.log(name);
```

### Variables
The `CreateModule` mutation requires an argument of type `CreateModuleVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateModuleVariables {
  title: string;
  type: string;
  contentHtml: string;
  summary?: string | null;
  memoryText?: string | null;
  theologyTags: string[];
  quarter?: string | null;
  week?: number | null;
  day?: string | null;
  author?: string | null;
  sourceUrl?: string | null;
  difficulty?: string | null;
  estimatedReadTime?: number | null;
}
```
### Return Type
Recall that executing the `CreateModule` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateModuleData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateModuleData {
  module_insert: Module_Key;
}
```
### Using `CreateModule`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createModule, CreateModuleVariables } from '@dataconnect/generated';

// The `CreateModule` mutation requires an argument of type `CreateModuleVariables`:
const createModuleVars: CreateModuleVariables = {
  title: ..., 
  type: ..., 
  contentHtml: ..., 
  summary: ..., // optional
  memoryText: ..., // optional
  theologyTags: ..., 
  quarter: ..., // optional
  week: ..., // optional
  day: ..., // optional
  author: ..., // optional
  sourceUrl: ..., // optional
  difficulty: ..., // optional
  estimatedReadTime: ..., // optional
};

// Call the `createModule()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createModule(createModuleVars);
// Variables can be defined inline as well.
const { data } = await createModule({ title: ..., type: ..., contentHtml: ..., summary: ..., memoryText: ..., theologyTags: ..., quarter: ..., week: ..., day: ..., author: ..., sourceUrl: ..., difficulty: ..., estimatedReadTime: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createModule(dataConnect, createModuleVars);

console.log(data.module_insert);

// Or, you can use the `Promise` API.
createModule(createModuleVars).then((response) => {
  const data = response.data;
  console.log(data.module_insert);
});
```

### Using `CreateModule`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createModuleRef, CreateModuleVariables } from '@dataconnect/generated';

// The `CreateModule` mutation requires an argument of type `CreateModuleVariables`:
const createModuleVars: CreateModuleVariables = {
  title: ..., 
  type: ..., 
  contentHtml: ..., 
  summary: ..., // optional
  memoryText: ..., // optional
  theologyTags: ..., 
  quarter: ..., // optional
  week: ..., // optional
  day: ..., // optional
  author: ..., // optional
  sourceUrl: ..., // optional
  difficulty: ..., // optional
  estimatedReadTime: ..., // optional
};

// Call the `createModuleRef()` function to get a reference to the mutation.
const ref = createModuleRef(createModuleVars);
// Variables can be defined inline as well.
const ref = createModuleRef({ title: ..., type: ..., contentHtml: ..., summary: ..., memoryText: ..., theologyTags: ..., quarter: ..., week: ..., day: ..., author: ..., sourceUrl: ..., difficulty: ..., estimatedReadTime: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createModuleRef(dataConnect, createModuleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.module_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.module_insert);
});
```

## UpdateUserProgress
You can execute the `UpdateUserProgress` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUserProgress(vars: UpdateUserProgressVariables): MutationPromise<UpdateUserProgressData, UpdateUserProgressVariables>;

interface UpdateUserProgressRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserProgressVariables): MutationRef<UpdateUserProgressData, UpdateUserProgressVariables>;
}
export const updateUserProgressRef: UpdateUserProgressRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUserProgress(dc: DataConnect, vars: UpdateUserProgressVariables): MutationPromise<UpdateUserProgressData, UpdateUserProgressVariables>;

interface UpdateUserProgressRef {
  ...
  (dc: DataConnect, vars: UpdateUserProgressVariables): MutationRef<UpdateUserProgressData, UpdateUserProgressVariables>;
}
export const updateUserProgressRef: UpdateUserProgressRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserProgressRef:
```typescript
const name = updateUserProgressRef.operationName;
console.log(name);
```

### Variables
The `UpdateUserProgress` mutation requires an argument of type `UpdateUserProgressVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserProgressVariables {
  moduleId: UUIDString;
  status: string;
  progressPercent?: number | null;
}
```
### Return Type
Recall that executing the `UpdateUserProgress` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserProgressData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserProgressData {
  userProgress_upsert: UserProgress_Key;
}
```
### Using `UpdateUserProgress`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUserProgress, UpdateUserProgressVariables } from '@dataconnect/generated';

// The `UpdateUserProgress` mutation requires an argument of type `UpdateUserProgressVariables`:
const updateUserProgressVars: UpdateUserProgressVariables = {
  moduleId: ..., 
  status: ..., 
  progressPercent: ..., // optional
};

// Call the `updateUserProgress()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUserProgress(updateUserProgressVars);
// Variables can be defined inline as well.
const { data } = await updateUserProgress({ moduleId: ..., status: ..., progressPercent: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUserProgress(dataConnect, updateUserProgressVars);

console.log(data.userProgress_upsert);

// Or, you can use the `Promise` API.
updateUserProgress(updateUserProgressVars).then((response) => {
  const data = response.data;
  console.log(data.userProgress_upsert);
});
```

### Using `UpdateUserProgress`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserProgressRef, UpdateUserProgressVariables } from '@dataconnect/generated';

// The `UpdateUserProgress` mutation requires an argument of type `UpdateUserProgressVariables`:
const updateUserProgressVars: UpdateUserProgressVariables = {
  moduleId: ..., 
  status: ..., 
  progressPercent: ..., // optional
};

// Call the `updateUserProgressRef()` function to get a reference to the mutation.
const ref = updateUserProgressRef(updateUserProgressVars);
// Variables can be defined inline as well.
const ref = updateUserProgressRef({ moduleId: ..., status: ..., progressPercent: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserProgressRef(dataConnect, updateUserProgressVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userProgress_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userProgress_upsert);
});
```

## SubmitQuizAttempt
You can execute the `SubmitQuizAttempt` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
submitQuizAttempt(vars: SubmitQuizAttemptVariables): MutationPromise<SubmitQuizAttemptData, SubmitQuizAttemptVariables>;

interface SubmitQuizAttemptRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SubmitQuizAttemptVariables): MutationRef<SubmitQuizAttemptData, SubmitQuizAttemptVariables>;
}
export const submitQuizAttemptRef: SubmitQuizAttemptRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
submitQuizAttempt(dc: DataConnect, vars: SubmitQuizAttemptVariables): MutationPromise<SubmitQuizAttemptData, SubmitQuizAttemptVariables>;

interface SubmitQuizAttemptRef {
  ...
  (dc: DataConnect, vars: SubmitQuizAttemptVariables): MutationRef<SubmitQuizAttemptData, SubmitQuizAttemptVariables>;
}
export const submitQuizAttemptRef: SubmitQuizAttemptRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the submitQuizAttemptRef:
```typescript
const name = submitQuizAttemptRef.operationName;
console.log(name);
```

### Variables
The `SubmitQuizAttempt` mutation requires an argument of type `SubmitQuizAttemptVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SubmitQuizAttemptVariables {
  quizId: UUIDString;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  answers: string[];
  timeSpentMinutes?: number | null;
}
```
### Return Type
Recall that executing the `SubmitQuizAttempt` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SubmitQuizAttemptData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SubmitQuizAttemptData {
  quizAttempt_insert: QuizAttempt_Key;
}
```
### Using `SubmitQuizAttempt`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, submitQuizAttempt, SubmitQuizAttemptVariables } from '@dataconnect/generated';

// The `SubmitQuizAttempt` mutation requires an argument of type `SubmitQuizAttemptVariables`:
const submitQuizAttemptVars: SubmitQuizAttemptVariables = {
  quizId: ..., 
  score: ..., 
  totalQuestions: ..., 
  correctAnswers: ..., 
  answers: ..., 
  timeSpentMinutes: ..., // optional
};

// Call the `submitQuizAttempt()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await submitQuizAttempt(submitQuizAttemptVars);
// Variables can be defined inline as well.
const { data } = await submitQuizAttempt({ quizId: ..., score: ..., totalQuestions: ..., correctAnswers: ..., answers: ..., timeSpentMinutes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await submitQuizAttempt(dataConnect, submitQuizAttemptVars);

console.log(data.quizAttempt_insert);

// Or, you can use the `Promise` API.
submitQuizAttempt(submitQuizAttemptVars).then((response) => {
  const data = response.data;
  console.log(data.quizAttempt_insert);
});
```

### Using `SubmitQuizAttempt`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, submitQuizAttemptRef, SubmitQuizAttemptVariables } from '@dataconnect/generated';

// The `SubmitQuizAttempt` mutation requires an argument of type `SubmitQuizAttemptVariables`:
const submitQuizAttemptVars: SubmitQuizAttemptVariables = {
  quizId: ..., 
  score: ..., 
  totalQuestions: ..., 
  correctAnswers: ..., 
  answers: ..., 
  timeSpentMinutes: ..., // optional
};

// Call the `submitQuizAttemptRef()` function to get a reference to the mutation.
const ref = submitQuizAttemptRef(submitQuizAttemptVars);
// Variables can be defined inline as well.
const ref = submitQuizAttemptRef({ quizId: ..., score: ..., totalQuestions: ..., correctAnswers: ..., answers: ..., timeSpentMinutes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = submitQuizAttemptRef(dataConnect, submitQuizAttemptVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quizAttempt_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quizAttempt_insert);
});
```

## UpdateProgressWithQuizScore
You can execute the `UpdateProgressWithQuizScore` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateProgressWithQuizScore(vars: UpdateProgressWithQuizScoreVariables): MutationPromise<UpdateProgressWithQuizScoreData, UpdateProgressWithQuizScoreVariables>;

interface UpdateProgressWithQuizScoreRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProgressWithQuizScoreVariables): MutationRef<UpdateProgressWithQuizScoreData, UpdateProgressWithQuizScoreVariables>;
}
export const updateProgressWithQuizScoreRef: UpdateProgressWithQuizScoreRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateProgressWithQuizScore(dc: DataConnect, vars: UpdateProgressWithQuizScoreVariables): MutationPromise<UpdateProgressWithQuizScoreData, UpdateProgressWithQuizScoreVariables>;

interface UpdateProgressWithQuizScoreRef {
  ...
  (dc: DataConnect, vars: UpdateProgressWithQuizScoreVariables): MutationRef<UpdateProgressWithQuizScoreData, UpdateProgressWithQuizScoreVariables>;
}
export const updateProgressWithQuizScoreRef: UpdateProgressWithQuizScoreRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateProgressWithQuizScoreRef:
```typescript
const name = updateProgressWithQuizScoreRef.operationName;
console.log(name);
```

### Variables
The `UpdateProgressWithQuizScore` mutation requires an argument of type `UpdateProgressWithQuizScoreVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateProgressWithQuizScoreVariables {
  moduleId: UUIDString;
  score: number;
  attempts: number;
}
```
### Return Type
Recall that executing the `UpdateProgressWithQuizScore` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateProgressWithQuizScoreData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateProgressWithQuizScoreData {
  userProgress_upsert: UserProgress_Key;
}
```
### Using `UpdateProgressWithQuizScore`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateProgressWithQuizScore, UpdateProgressWithQuizScoreVariables } from '@dataconnect/generated';

// The `UpdateProgressWithQuizScore` mutation requires an argument of type `UpdateProgressWithQuizScoreVariables`:
const updateProgressWithQuizScoreVars: UpdateProgressWithQuizScoreVariables = {
  moduleId: ..., 
  score: ..., 
  attempts: ..., 
};

// Call the `updateProgressWithQuizScore()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateProgressWithQuizScore(updateProgressWithQuizScoreVars);
// Variables can be defined inline as well.
const { data } = await updateProgressWithQuizScore({ moduleId: ..., score: ..., attempts: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateProgressWithQuizScore(dataConnect, updateProgressWithQuizScoreVars);

console.log(data.userProgress_upsert);

// Or, you can use the `Promise` API.
updateProgressWithQuizScore(updateProgressWithQuizScoreVars).then((response) => {
  const data = response.data;
  console.log(data.userProgress_upsert);
});
```

### Using `UpdateProgressWithQuizScore`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateProgressWithQuizScoreRef, UpdateProgressWithQuizScoreVariables } from '@dataconnect/generated';

// The `UpdateProgressWithQuizScore` mutation requires an argument of type `UpdateProgressWithQuizScoreVariables`:
const updateProgressWithQuizScoreVars: UpdateProgressWithQuizScoreVariables = {
  moduleId: ..., 
  score: ..., 
  attempts: ..., 
};

// Call the `updateProgressWithQuizScoreRef()` function to get a reference to the mutation.
const ref = updateProgressWithQuizScoreRef(updateProgressWithQuizScoreVars);
// Variables can be defined inline as well.
const ref = updateProgressWithQuizScoreRef({ moduleId: ..., score: ..., attempts: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateProgressWithQuizScoreRef(dataConnect, updateProgressWithQuizScoreVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userProgress_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userProgress_upsert);
});
```

## UpdateUserSettings
You can execute the `UpdateUserSettings` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUserSettings(vars?: UpdateUserSettingsVariables): MutationPromise<UpdateUserSettingsData, UpdateUserSettingsVariables>;

interface UpdateUserSettingsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateUserSettingsVariables): MutationRef<UpdateUserSettingsData, UpdateUserSettingsVariables>;
}
export const updateUserSettingsRef: UpdateUserSettingsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUserSettings(dc: DataConnect, vars?: UpdateUserSettingsVariables): MutationPromise<UpdateUserSettingsData, UpdateUserSettingsVariables>;

interface UpdateUserSettingsRef {
  ...
  (dc: DataConnect, vars?: UpdateUserSettingsVariables): MutationRef<UpdateUserSettingsData, UpdateUserSettingsVariables>;
}
export const updateUserSettingsRef: UpdateUserSettingsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserSettingsRef:
```typescript
const name = updateUserSettingsRef.operationName;
console.log(name);
```

### Variables
The `UpdateUserSettings` mutation has an optional argument of type `UpdateUserSettingsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserSettingsVariables {
  preferredBibleVersion?: string | null;
  theme?: string | null;
  fontSize?: string | null;
  dailyReminderEnabled?: boolean | null;
  emailNotifications?: boolean | null;
}
```
### Return Type
Recall that executing the `UpdateUserSettings` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserSettingsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserSettingsData {
  userSettings_upsert: UserSettings_Key;
}
```
### Using `UpdateUserSettings`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUserSettings, UpdateUserSettingsVariables } from '@dataconnect/generated';

// The `UpdateUserSettings` mutation has an optional argument of type `UpdateUserSettingsVariables`:
const updateUserSettingsVars: UpdateUserSettingsVariables = {
  preferredBibleVersion: ..., // optional
  theme: ..., // optional
  fontSize: ..., // optional
  dailyReminderEnabled: ..., // optional
  emailNotifications: ..., // optional
};

// Call the `updateUserSettings()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUserSettings(updateUserSettingsVars);
// Variables can be defined inline as well.
const { data } = await updateUserSettings({ preferredBibleVersion: ..., theme: ..., fontSize: ..., dailyReminderEnabled: ..., emailNotifications: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateUserSettingsVariables` argument.
const { data } = await updateUserSettings();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUserSettings(dataConnect, updateUserSettingsVars);

console.log(data.userSettings_upsert);

// Or, you can use the `Promise` API.
updateUserSettings(updateUserSettingsVars).then((response) => {
  const data = response.data;
  console.log(data.userSettings_upsert);
});
```

### Using `UpdateUserSettings`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserSettingsRef, UpdateUserSettingsVariables } from '@dataconnect/generated';

// The `UpdateUserSettings` mutation has an optional argument of type `UpdateUserSettingsVariables`:
const updateUserSettingsVars: UpdateUserSettingsVariables = {
  preferredBibleVersion: ..., // optional
  theme: ..., // optional
  fontSize: ..., // optional
  dailyReminderEnabled: ..., // optional
  emailNotifications: ..., // optional
};

// Call the `updateUserSettingsRef()` function to get a reference to the mutation.
const ref = updateUserSettingsRef(updateUserSettingsVars);
// Variables can be defined inline as well.
const ref = updateUserSettingsRef({ preferredBibleVersion: ..., theme: ..., fontSize: ..., dailyReminderEnabled: ..., emailNotifications: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateUserSettingsVariables` argument.
const ref = updateUserSettingsRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserSettingsRef(dataConnect, updateUserSettingsVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userSettings_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userSettings_upsert);
});
```

## CreateQuiz
You can execute the `CreateQuiz` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createQuiz(vars: CreateQuizVariables): MutationPromise<CreateQuizData, CreateQuizVariables>;

interface CreateQuizRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuizVariables): MutationRef<CreateQuizData, CreateQuizVariables>;
}
export const createQuizRef: CreateQuizRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createQuiz(dc: DataConnect, vars: CreateQuizVariables): MutationPromise<CreateQuizData, CreateQuizVariables>;

interface CreateQuizRef {
  ...
  (dc: DataConnect, vars: CreateQuizVariables): MutationRef<CreateQuizData, CreateQuizVariables>;
}
export const createQuizRef: CreateQuizRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createQuizRef:
```typescript
const name = createQuizRef.operationName;
console.log(name);
```

### Variables
The `CreateQuiz` mutation requires an argument of type `CreateQuizVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateQuizVariables {
  title: string;
  moduleId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `CreateQuiz` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateQuizData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateQuizData {
  quiz_insert: Quiz_Key;
}
```
### Using `CreateQuiz`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createQuiz, CreateQuizVariables } from '@dataconnect/generated';

// The `CreateQuiz` mutation requires an argument of type `CreateQuizVariables`:
const createQuizVars: CreateQuizVariables = {
  title: ..., 
  moduleId: ..., // optional
};

// Call the `createQuiz()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createQuiz(createQuizVars);
// Variables can be defined inline as well.
const { data } = await createQuiz({ title: ..., moduleId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createQuiz(dataConnect, createQuizVars);

console.log(data.quiz_insert);

// Or, you can use the `Promise` API.
createQuiz(createQuizVars).then((response) => {
  const data = response.data;
  console.log(data.quiz_insert);
});
```

### Using `CreateQuiz`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createQuizRef, CreateQuizVariables } from '@dataconnect/generated';

// The `CreateQuiz` mutation requires an argument of type `CreateQuizVariables`:
const createQuizVars: CreateQuizVariables = {
  title: ..., 
  moduleId: ..., // optional
};

// Call the `createQuizRef()` function to get a reference to the mutation.
const ref = createQuizRef(createQuizVars);
// Variables can be defined inline as well.
const ref = createQuizRef({ title: ..., moduleId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createQuizRef(dataConnect, createQuizVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quiz_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quiz_insert);
});
```

## CreateQuestion
You can execute the `CreateQuestion` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createQuestion(vars: CreateQuestionVariables): MutationPromise<CreateQuestionData, CreateQuestionVariables>;

interface CreateQuestionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuestionVariables): MutationRef<CreateQuestionData, CreateQuestionVariables>;
}
export const createQuestionRef: CreateQuestionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createQuestion(dc: DataConnect, vars: CreateQuestionVariables): MutationPromise<CreateQuestionData, CreateQuestionVariables>;

interface CreateQuestionRef {
  ...
  (dc: DataConnect, vars: CreateQuestionVariables): MutationRef<CreateQuestionData, CreateQuestionVariables>;
}
export const createQuestionRef: CreateQuestionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createQuestionRef:
```typescript
const name = createQuestionRef.operationName;
console.log(name);
```

### Variables
The `CreateQuestion` mutation requires an argument of type `CreateQuestionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateQuestionVariables {
  quizId: UUIDString;
  questionText: string;
  questionType: string;
  options?: string[] | null;
  correctAnswer: string;
  explanation?: string | null;
  order: number;
}
```
### Return Type
Recall that executing the `CreateQuestion` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateQuestionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateQuestionData {
  question_insert: Question_Key;
}
```
### Using `CreateQuestion`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createQuestion, CreateQuestionVariables } from '@dataconnect/generated';

// The `CreateQuestion` mutation requires an argument of type `CreateQuestionVariables`:
const createQuestionVars: CreateQuestionVariables = {
  quizId: ..., 
  questionText: ..., 
  questionType: ..., 
  options: ..., // optional
  correctAnswer: ..., 
  explanation: ..., // optional
  order: ..., 
};

// Call the `createQuestion()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createQuestion(createQuestionVars);
// Variables can be defined inline as well.
const { data } = await createQuestion({ quizId: ..., questionText: ..., questionType: ..., options: ..., correctAnswer: ..., explanation: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createQuestion(dataConnect, createQuestionVars);

console.log(data.question_insert);

// Or, you can use the `Promise` API.
createQuestion(createQuestionVars).then((response) => {
  const data = response.data;
  console.log(data.question_insert);
});
```

### Using `CreateQuestion`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createQuestionRef, CreateQuestionVariables } from '@dataconnect/generated';

// The `CreateQuestion` mutation requires an argument of type `CreateQuestionVariables`:
const createQuestionVars: CreateQuestionVariables = {
  quizId: ..., 
  questionText: ..., 
  questionType: ..., 
  options: ..., // optional
  correctAnswer: ..., 
  explanation: ..., // optional
  order: ..., 
};

// Call the `createQuestionRef()` function to get a reference to the mutation.
const ref = createQuestionRef(createQuestionVars);
// Variables can be defined inline as well.
const ref = createQuestionRef({ quizId: ..., questionText: ..., questionType: ..., options: ..., correctAnswer: ..., explanation: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createQuestionRef(dataConnect, createQuestionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.question_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.question_insert);
});
```

