import { ListModulesData, GetQuarterModulesData, GetQuarterModulesVariables, GetModuleByIdData, GetModuleByIdVariables, GetUserProgressData, GetUserQuizHistoryData, SearchModulesData, SearchModulesVariables, ListQuizzesData, GetQuizByIdData, GetQuizByIdVariables, UpsertUserData, UpsertUserVariables, CreateModuleData, CreateModuleVariables, UpdateUserProgressData, UpdateUserProgressVariables, SubmitQuizAttemptData, SubmitQuizAttemptVariables, UpdateProgressWithQuizScoreData, UpdateProgressWithQuizScoreVariables, UpdateUserSettingsData, UpdateUserSettingsVariables, CreateQuizData, CreateQuizVariables, CreateQuestionData, CreateQuestionVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useListModules(options?: useDataConnectQueryOptions<ListModulesData>): UseDataConnectQueryResult<ListModulesData, undefined>;
export function useListModules(dc: DataConnect, options?: useDataConnectQueryOptions<ListModulesData>): UseDataConnectQueryResult<ListModulesData, undefined>;

export function useGetQuarterModules(vars: GetQuarterModulesVariables, options?: useDataConnectQueryOptions<GetQuarterModulesData>): UseDataConnectQueryResult<GetQuarterModulesData, GetQuarterModulesVariables>;
export function useGetQuarterModules(dc: DataConnect, vars: GetQuarterModulesVariables, options?: useDataConnectQueryOptions<GetQuarterModulesData>): UseDataConnectQueryResult<GetQuarterModulesData, GetQuarterModulesVariables>;

export function useGetModuleById(vars: GetModuleByIdVariables, options?: useDataConnectQueryOptions<GetModuleByIdData>): UseDataConnectQueryResult<GetModuleByIdData, GetModuleByIdVariables>;
export function useGetModuleById(dc: DataConnect, vars: GetModuleByIdVariables, options?: useDataConnectQueryOptions<GetModuleByIdData>): UseDataConnectQueryResult<GetModuleByIdData, GetModuleByIdVariables>;

export function useGetUserProgress(options?: useDataConnectQueryOptions<GetUserProgressData>): UseDataConnectQueryResult<GetUserProgressData, undefined>;
export function useGetUserProgress(dc: DataConnect, options?: useDataConnectQueryOptions<GetUserProgressData>): UseDataConnectQueryResult<GetUserProgressData, undefined>;

export function useGetUserQuizHistory(options?: useDataConnectQueryOptions<GetUserQuizHistoryData>): UseDataConnectQueryResult<GetUserQuizHistoryData, undefined>;
export function useGetUserQuizHistory(dc: DataConnect, options?: useDataConnectQueryOptions<GetUserQuizHistoryData>): UseDataConnectQueryResult<GetUserQuizHistoryData, undefined>;

export function useSearchModules(vars?: SearchModulesVariables, options?: useDataConnectQueryOptions<SearchModulesData>): UseDataConnectQueryResult<SearchModulesData, SearchModulesVariables>;
export function useSearchModules(dc: DataConnect, vars?: SearchModulesVariables, options?: useDataConnectQueryOptions<SearchModulesData>): UseDataConnectQueryResult<SearchModulesData, SearchModulesVariables>;

export function useListQuizzes(options?: useDataConnectQueryOptions<ListQuizzesData>): UseDataConnectQueryResult<ListQuizzesData, undefined>;
export function useListQuizzes(dc: DataConnect, options?: useDataConnectQueryOptions<ListQuizzesData>): UseDataConnectQueryResult<ListQuizzesData, undefined>;

export function useGetQuizById(vars: GetQuizByIdVariables, options?: useDataConnectQueryOptions<GetQuizByIdData>): UseDataConnectQueryResult<GetQuizByIdData, GetQuizByIdVariables>;
export function useGetQuizById(dc: DataConnect, vars: GetQuizByIdVariables, options?: useDataConnectQueryOptions<GetQuizByIdData>): UseDataConnectQueryResult<GetQuizByIdData, GetQuizByIdVariables>;

export function useUpsertUser(options?: useDataConnectMutationOptions<UpsertUserData, FirebaseError, UpsertUserVariables>): UseDataConnectMutationResult<UpsertUserData, UpsertUserVariables>;
export function useUpsertUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertUserData, FirebaseError, UpsertUserVariables>): UseDataConnectMutationResult<UpsertUserData, UpsertUserVariables>;

export function useCreateModule(options?: useDataConnectMutationOptions<CreateModuleData, FirebaseError, CreateModuleVariables>): UseDataConnectMutationResult<CreateModuleData, CreateModuleVariables>;
export function useCreateModule(dc: DataConnect, options?: useDataConnectMutationOptions<CreateModuleData, FirebaseError, CreateModuleVariables>): UseDataConnectMutationResult<CreateModuleData, CreateModuleVariables>;

export function useUpdateUserProgress(options?: useDataConnectMutationOptions<UpdateUserProgressData, FirebaseError, UpdateUserProgressVariables>): UseDataConnectMutationResult<UpdateUserProgressData, UpdateUserProgressVariables>;
export function useUpdateUserProgress(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserProgressData, FirebaseError, UpdateUserProgressVariables>): UseDataConnectMutationResult<UpdateUserProgressData, UpdateUserProgressVariables>;

export function useSubmitQuizAttempt(options?: useDataConnectMutationOptions<SubmitQuizAttemptData, FirebaseError, SubmitQuizAttemptVariables>): UseDataConnectMutationResult<SubmitQuizAttemptData, SubmitQuizAttemptVariables>;
export function useSubmitQuizAttempt(dc: DataConnect, options?: useDataConnectMutationOptions<SubmitQuizAttemptData, FirebaseError, SubmitQuizAttemptVariables>): UseDataConnectMutationResult<SubmitQuizAttemptData, SubmitQuizAttemptVariables>;

export function useUpdateProgressWithQuizScore(options?: useDataConnectMutationOptions<UpdateProgressWithQuizScoreData, FirebaseError, UpdateProgressWithQuizScoreVariables>): UseDataConnectMutationResult<UpdateProgressWithQuizScoreData, UpdateProgressWithQuizScoreVariables>;
export function useUpdateProgressWithQuizScore(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateProgressWithQuizScoreData, FirebaseError, UpdateProgressWithQuizScoreVariables>): UseDataConnectMutationResult<UpdateProgressWithQuizScoreData, UpdateProgressWithQuizScoreVariables>;

export function useUpdateUserSettings(options?: useDataConnectMutationOptions<UpdateUserSettingsData, FirebaseError, UpdateUserSettingsVariables | void>): UseDataConnectMutationResult<UpdateUserSettingsData, UpdateUserSettingsVariables>;
export function useUpdateUserSettings(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserSettingsData, FirebaseError, UpdateUserSettingsVariables | void>): UseDataConnectMutationResult<UpdateUserSettingsData, UpdateUserSettingsVariables>;

export function useCreateQuiz(options?: useDataConnectMutationOptions<CreateQuizData, FirebaseError, CreateQuizVariables>): UseDataConnectMutationResult<CreateQuizData, CreateQuizVariables>;
export function useCreateQuiz(dc: DataConnect, options?: useDataConnectMutationOptions<CreateQuizData, FirebaseError, CreateQuizVariables>): UseDataConnectMutationResult<CreateQuizData, CreateQuizVariables>;

export function useCreateQuestion(options?: useDataConnectMutationOptions<CreateQuestionData, FirebaseError, CreateQuestionVariables>): UseDataConnectMutationResult<CreateQuestionData, CreateQuestionVariables>;
export function useCreateQuestion(dc: DataConnect, options?: useDataConnectMutationOptions<CreateQuestionData, FirebaseError, CreateQuestionVariables>): UseDataConnectMutationResult<CreateQuestionData, CreateQuestionVariables>;
