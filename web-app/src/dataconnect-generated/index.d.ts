import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateModuleData {
  module_insert: Module_Key;
}

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

export interface CreateQuestionData {
  question_insert: Question_Key;
}

export interface CreateQuestionVariables {
  quizId: UUIDString;
  questionText: string;
  questionType: string;
  options?: string[] | null;
  correctAnswer: string;
  explanation?: string | null;
  order: number;
}

export interface CreateQuizData {
  quiz_insert: Quiz_Key;
}

export interface CreateQuizVariables {
  title: string;
  moduleId?: UUIDString | null;
}

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

export interface GetModuleByIdVariables {
  id: UUIDString;
}

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

export interface GetQuarterModulesVariables {
  quarter: string;
}

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

export interface GetQuizByIdVariables {
  id: UUIDString;
}

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

export interface Module_Key {
  id: UUIDString;
  __typename?: 'Module_Key';
}

export interface Question_Key {
  id: UUIDString;
  __typename?: 'Question_Key';
}

export interface QuizAttempt_Key {
  id: UUIDString;
  __typename?: 'QuizAttempt_Key';
}

export interface Quiz_Key {
  id: UUIDString;
  __typename?: 'Quiz_Key';
}

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

export interface SearchModulesVariables {
  searchTerm?: string | null;
  type?: string | null;
  tags?: string[] | null;
}

export interface SubmitQuizAttemptData {
  quizAttempt_insert: QuizAttempt_Key;
}

export interface SubmitQuizAttemptVariables {
  quizId: UUIDString;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  answers: string[];
  timeSpentMinutes?: number | null;
}

export interface UpdateProgressWithQuizScoreData {
  userProgress_upsert: UserProgress_Key;
}

export interface UpdateProgressWithQuizScoreVariables {
  moduleId: UUIDString;
  score: number;
  attempts: number;
}

export interface UpdateUserProgressData {
  userProgress_upsert: UserProgress_Key;
}

export interface UpdateUserProgressVariables {
  moduleId: UUIDString;
  status: string;
  progressPercent?: number | null;
}

export interface UpdateUserSettingsData {
  userSettings_upsert: UserSettings_Key;
}

export interface UpdateUserSettingsVariables {
  preferredBibleVersion?: string | null;
  theme?: string | null;
  fontSize?: string | null;
  dailyReminderEnabled?: boolean | null;
  emailNotifications?: boolean | null;
}

export interface UpsertUserData {
  user_upsert: User_Key;
}

export interface UpsertUserVariables {
  name: string;
  email: string;
  bibleVersion?: string | null;
}

export interface UserProgress_Key {
  userId: string;
  moduleId: UUIDString;
  __typename?: 'UserProgress_Key';
}

export interface UserSettings_Key {
  id: UUIDString;
  __typename?: 'UserSettings_Key';
}

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

interface ListModulesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListModulesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListModulesData, undefined>;
  operationName: string;
}
export const listModulesRef: ListModulesRef;

export function listModules(): QueryPromise<ListModulesData, undefined>;
export function listModules(dc: DataConnect): QueryPromise<ListModulesData, undefined>;

interface GetQuarterModulesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuarterModulesVariables): QueryRef<GetQuarterModulesData, GetQuarterModulesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetQuarterModulesVariables): QueryRef<GetQuarterModulesData, GetQuarterModulesVariables>;
  operationName: string;
}
export const getQuarterModulesRef: GetQuarterModulesRef;

export function getQuarterModules(vars: GetQuarterModulesVariables): QueryPromise<GetQuarterModulesData, GetQuarterModulesVariables>;
export function getQuarterModules(dc: DataConnect, vars: GetQuarterModulesVariables): QueryPromise<GetQuarterModulesData, GetQuarterModulesVariables>;

interface GetModuleByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetModuleByIdVariables): QueryRef<GetModuleByIdData, GetModuleByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetModuleByIdVariables): QueryRef<GetModuleByIdData, GetModuleByIdVariables>;
  operationName: string;
}
export const getModuleByIdRef: GetModuleByIdRef;

export function getModuleById(vars: GetModuleByIdVariables): QueryPromise<GetModuleByIdData, GetModuleByIdVariables>;
export function getModuleById(dc: DataConnect, vars: GetModuleByIdVariables): QueryPromise<GetModuleByIdData, GetModuleByIdVariables>;

interface GetUserProgressRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserProgressData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetUserProgressData, undefined>;
  operationName: string;
}
export const getUserProgressRef: GetUserProgressRef;

export function getUserProgress(): QueryPromise<GetUserProgressData, undefined>;
export function getUserProgress(dc: DataConnect): QueryPromise<GetUserProgressData, undefined>;

interface GetUserQuizHistoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserQuizHistoryData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetUserQuizHistoryData, undefined>;
  operationName: string;
}
export const getUserQuizHistoryRef: GetUserQuizHistoryRef;

export function getUserQuizHistory(): QueryPromise<GetUserQuizHistoryData, undefined>;
export function getUserQuizHistory(dc: DataConnect): QueryPromise<GetUserQuizHistoryData, undefined>;

interface SearchModulesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: SearchModulesVariables): QueryRef<SearchModulesData, SearchModulesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: SearchModulesVariables): QueryRef<SearchModulesData, SearchModulesVariables>;
  operationName: string;
}
export const searchModulesRef: SearchModulesRef;

export function searchModules(vars?: SearchModulesVariables): QueryPromise<SearchModulesData, SearchModulesVariables>;
export function searchModules(dc: DataConnect, vars?: SearchModulesVariables): QueryPromise<SearchModulesData, SearchModulesVariables>;

interface ListQuizzesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListQuizzesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListQuizzesData, undefined>;
  operationName: string;
}
export const listQuizzesRef: ListQuizzesRef;

export function listQuizzes(): QueryPromise<ListQuizzesData, undefined>;
export function listQuizzes(dc: DataConnect): QueryPromise<ListQuizzesData, undefined>;

interface GetQuizByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuizByIdVariables): QueryRef<GetQuizByIdData, GetQuizByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetQuizByIdVariables): QueryRef<GetQuizByIdData, GetQuizByIdVariables>;
  operationName: string;
}
export const getQuizByIdRef: GetQuizByIdRef;

export function getQuizById(vars: GetQuizByIdVariables): QueryPromise<GetQuizByIdData, GetQuizByIdVariables>;
export function getQuizById(dc: DataConnect, vars: GetQuizByIdVariables): QueryPromise<GetQuizByIdData, GetQuizByIdVariables>;

interface UpsertUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
  operationName: string;
}
export const upsertUserRef: UpsertUserRef;

export function upsertUser(vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;
export function upsertUser(dc: DataConnect, vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface CreateModuleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateModuleVariables): MutationRef<CreateModuleData, CreateModuleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateModuleVariables): MutationRef<CreateModuleData, CreateModuleVariables>;
  operationName: string;
}
export const createModuleRef: CreateModuleRef;

export function createModule(vars: CreateModuleVariables): MutationPromise<CreateModuleData, CreateModuleVariables>;
export function createModule(dc: DataConnect, vars: CreateModuleVariables): MutationPromise<CreateModuleData, CreateModuleVariables>;

interface UpdateUserProgressRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserProgressVariables): MutationRef<UpdateUserProgressData, UpdateUserProgressVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateUserProgressVariables): MutationRef<UpdateUserProgressData, UpdateUserProgressVariables>;
  operationName: string;
}
export const updateUserProgressRef: UpdateUserProgressRef;

export function updateUserProgress(vars: UpdateUserProgressVariables): MutationPromise<UpdateUserProgressData, UpdateUserProgressVariables>;
export function updateUserProgress(dc: DataConnect, vars: UpdateUserProgressVariables): MutationPromise<UpdateUserProgressData, UpdateUserProgressVariables>;

interface SubmitQuizAttemptRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SubmitQuizAttemptVariables): MutationRef<SubmitQuizAttemptData, SubmitQuizAttemptVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SubmitQuizAttemptVariables): MutationRef<SubmitQuizAttemptData, SubmitQuizAttemptVariables>;
  operationName: string;
}
export const submitQuizAttemptRef: SubmitQuizAttemptRef;

export function submitQuizAttempt(vars: SubmitQuizAttemptVariables): MutationPromise<SubmitQuizAttemptData, SubmitQuizAttemptVariables>;
export function submitQuizAttempt(dc: DataConnect, vars: SubmitQuizAttemptVariables): MutationPromise<SubmitQuizAttemptData, SubmitQuizAttemptVariables>;

interface UpdateProgressWithQuizScoreRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProgressWithQuizScoreVariables): MutationRef<UpdateProgressWithQuizScoreData, UpdateProgressWithQuizScoreVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProgressWithQuizScoreVariables): MutationRef<UpdateProgressWithQuizScoreData, UpdateProgressWithQuizScoreVariables>;
  operationName: string;
}
export const updateProgressWithQuizScoreRef: UpdateProgressWithQuizScoreRef;

export function updateProgressWithQuizScore(vars: UpdateProgressWithQuizScoreVariables): MutationPromise<UpdateProgressWithQuizScoreData, UpdateProgressWithQuizScoreVariables>;
export function updateProgressWithQuizScore(dc: DataConnect, vars: UpdateProgressWithQuizScoreVariables): MutationPromise<UpdateProgressWithQuizScoreData, UpdateProgressWithQuizScoreVariables>;

interface UpdateUserSettingsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateUserSettingsVariables): MutationRef<UpdateUserSettingsData, UpdateUserSettingsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: UpdateUserSettingsVariables): MutationRef<UpdateUserSettingsData, UpdateUserSettingsVariables>;
  operationName: string;
}
export const updateUserSettingsRef: UpdateUserSettingsRef;

export function updateUserSettings(vars?: UpdateUserSettingsVariables): MutationPromise<UpdateUserSettingsData, UpdateUserSettingsVariables>;
export function updateUserSettings(dc: DataConnect, vars?: UpdateUserSettingsVariables): MutationPromise<UpdateUserSettingsData, UpdateUserSettingsVariables>;

interface CreateQuizRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuizVariables): MutationRef<CreateQuizData, CreateQuizVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateQuizVariables): MutationRef<CreateQuizData, CreateQuizVariables>;
  operationName: string;
}
export const createQuizRef: CreateQuizRef;

export function createQuiz(vars: CreateQuizVariables): MutationPromise<CreateQuizData, CreateQuizVariables>;
export function createQuiz(dc: DataConnect, vars: CreateQuizVariables): MutationPromise<CreateQuizData, CreateQuizVariables>;

interface CreateQuestionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuestionVariables): MutationRef<CreateQuestionData, CreateQuestionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateQuestionVariables): MutationRef<CreateQuestionData, CreateQuestionVariables>;
  operationName: string;
}
export const createQuestionRef: CreateQuestionRef;

export function createQuestion(vars: CreateQuestionVariables): MutationPromise<CreateQuestionData, CreateQuestionVariables>;
export function createQuestion(dc: DataConnect, vars: CreateQuestionVariables): MutationPromise<CreateQuestionData, CreateQuestionVariables>;

