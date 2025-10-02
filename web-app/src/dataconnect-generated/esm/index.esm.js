import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'sabbaththeologylink',
  location: 'us-east4'
};

export const upsertUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertUser', inputVars);
}
upsertUserRef.operationName = 'UpsertUser';

export function upsertUser(dcOrVars, vars) {
  return executeMutation(upsertUserRef(dcOrVars, vars));
}

export const createModuleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateModule', inputVars);
}
createModuleRef.operationName = 'CreateModule';

export function createModule(dcOrVars, vars) {
  return executeMutation(createModuleRef(dcOrVars, vars));
}

export const updateUserProgressRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUserProgress', inputVars);
}
updateUserProgressRef.operationName = 'UpdateUserProgress';

export function updateUserProgress(dcOrVars, vars) {
  return executeMutation(updateUserProgressRef(dcOrVars, vars));
}

export const submitQuizAttemptRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SubmitQuizAttempt', inputVars);
}
submitQuizAttemptRef.operationName = 'SubmitQuizAttempt';

export function submitQuizAttempt(dcOrVars, vars) {
  return executeMutation(submitQuizAttemptRef(dcOrVars, vars));
}

export const updateProgressWithQuizScoreRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProgressWithQuizScore', inputVars);
}
updateProgressWithQuizScoreRef.operationName = 'UpdateProgressWithQuizScore';

export function updateProgressWithQuizScore(dcOrVars, vars) {
  return executeMutation(updateProgressWithQuizScoreRef(dcOrVars, vars));
}

export const updateUserSettingsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUserSettings', inputVars);
}
updateUserSettingsRef.operationName = 'UpdateUserSettings';

export function updateUserSettings(dcOrVars, vars) {
  return executeMutation(updateUserSettingsRef(dcOrVars, vars));
}

export const createQuizRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateQuiz', inputVars);
}
createQuizRef.operationName = 'CreateQuiz';

export function createQuiz(dcOrVars, vars) {
  return executeMutation(createQuizRef(dcOrVars, vars));
}

export const createQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateQuestion', inputVars);
}
createQuestionRef.operationName = 'CreateQuestion';

export function createQuestion(dcOrVars, vars) {
  return executeMutation(createQuestionRef(dcOrVars, vars));
}

export const listModulesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListModules');
}
listModulesRef.operationName = 'ListModules';

export function listModules(dc) {
  return executeQuery(listModulesRef(dc));
}

export const getQuarterModulesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetQuarterModules', inputVars);
}
getQuarterModulesRef.operationName = 'GetQuarterModules';

export function getQuarterModules(dcOrVars, vars) {
  return executeQuery(getQuarterModulesRef(dcOrVars, vars));
}

export const getModuleByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetModuleById', inputVars);
}
getModuleByIdRef.operationName = 'GetModuleById';

export function getModuleById(dcOrVars, vars) {
  return executeQuery(getModuleByIdRef(dcOrVars, vars));
}

export const getUserProgressRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserProgress');
}
getUserProgressRef.operationName = 'GetUserProgress';

export function getUserProgress(dc) {
  return executeQuery(getUserProgressRef(dc));
}

export const getUserQuizHistoryRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserQuizHistory');
}
getUserQuizHistoryRef.operationName = 'GetUserQuizHistory';

export function getUserQuizHistory(dc) {
  return executeQuery(getUserQuizHistoryRef(dc));
}

export const searchModulesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'SearchModules', inputVars);
}
searchModulesRef.operationName = 'SearchModules';

export function searchModules(dcOrVars, vars) {
  return executeQuery(searchModulesRef(dcOrVars, vars));
}

export const listQuizzesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListQuizzes');
}
listQuizzesRef.operationName = 'ListQuizzes';

export function listQuizzes(dc) {
  return executeQuery(listQuizzesRef(dc));
}

export const getQuizByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetQuizById', inputVars);
}
getQuizByIdRef.operationName = 'GetQuizById';

export function getQuizById(dcOrVars, vars) {
  return executeQuery(getQuizByIdRef(dcOrVars, vars));
}

