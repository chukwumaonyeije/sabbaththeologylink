const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'sabbaththeologylink',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const upsertUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertUser', inputVars);
}
upsertUserRef.operationName = 'UpsertUser';
exports.upsertUserRef = upsertUserRef;

exports.upsertUser = function upsertUser(dcOrVars, vars) {
  return executeMutation(upsertUserRef(dcOrVars, vars));
};

const createModuleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateModule', inputVars);
}
createModuleRef.operationName = 'CreateModule';
exports.createModuleRef = createModuleRef;

exports.createModule = function createModule(dcOrVars, vars) {
  return executeMutation(createModuleRef(dcOrVars, vars));
};

const updateUserProgressRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUserProgress', inputVars);
}
updateUserProgressRef.operationName = 'UpdateUserProgress';
exports.updateUserProgressRef = updateUserProgressRef;

exports.updateUserProgress = function updateUserProgress(dcOrVars, vars) {
  return executeMutation(updateUserProgressRef(dcOrVars, vars));
};

const submitQuizAttemptRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SubmitQuizAttempt', inputVars);
}
submitQuizAttemptRef.operationName = 'SubmitQuizAttempt';
exports.submitQuizAttemptRef = submitQuizAttemptRef;

exports.submitQuizAttempt = function submitQuizAttempt(dcOrVars, vars) {
  return executeMutation(submitQuizAttemptRef(dcOrVars, vars));
};

const updateProgressWithQuizScoreRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProgressWithQuizScore', inputVars);
}
updateProgressWithQuizScoreRef.operationName = 'UpdateProgressWithQuizScore';
exports.updateProgressWithQuizScoreRef = updateProgressWithQuizScoreRef;

exports.updateProgressWithQuizScore = function updateProgressWithQuizScore(dcOrVars, vars) {
  return executeMutation(updateProgressWithQuizScoreRef(dcOrVars, vars));
};

const updateUserSettingsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUserSettings', inputVars);
}
updateUserSettingsRef.operationName = 'UpdateUserSettings';
exports.updateUserSettingsRef = updateUserSettingsRef;

exports.updateUserSettings = function updateUserSettings(dcOrVars, vars) {
  return executeMutation(updateUserSettingsRef(dcOrVars, vars));
};

const createQuizRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateQuiz', inputVars);
}
createQuizRef.operationName = 'CreateQuiz';
exports.createQuizRef = createQuizRef;

exports.createQuiz = function createQuiz(dcOrVars, vars) {
  return executeMutation(createQuizRef(dcOrVars, vars));
};

const createQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateQuestion', inputVars);
}
createQuestionRef.operationName = 'CreateQuestion';
exports.createQuestionRef = createQuestionRef;

exports.createQuestion = function createQuestion(dcOrVars, vars) {
  return executeMutation(createQuestionRef(dcOrVars, vars));
};

const listModulesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListModules');
}
listModulesRef.operationName = 'ListModules';
exports.listModulesRef = listModulesRef;

exports.listModules = function listModules(dc) {
  return executeQuery(listModulesRef(dc));
};

const getQuarterModulesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetQuarterModules', inputVars);
}
getQuarterModulesRef.operationName = 'GetQuarterModules';
exports.getQuarterModulesRef = getQuarterModulesRef;

exports.getQuarterModules = function getQuarterModules(dcOrVars, vars) {
  return executeQuery(getQuarterModulesRef(dcOrVars, vars));
};

const getModuleByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetModuleById', inputVars);
}
getModuleByIdRef.operationName = 'GetModuleById';
exports.getModuleByIdRef = getModuleByIdRef;

exports.getModuleById = function getModuleById(dcOrVars, vars) {
  return executeQuery(getModuleByIdRef(dcOrVars, vars));
};

const getUserProgressRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserProgress');
}
getUserProgressRef.operationName = 'GetUserProgress';
exports.getUserProgressRef = getUserProgressRef;

exports.getUserProgress = function getUserProgress(dc) {
  return executeQuery(getUserProgressRef(dc));
};

const getUserQuizHistoryRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserQuizHistory');
}
getUserQuizHistoryRef.operationName = 'GetUserQuizHistory';
exports.getUserQuizHistoryRef = getUserQuizHistoryRef;

exports.getUserQuizHistory = function getUserQuizHistory(dc) {
  return executeQuery(getUserQuizHistoryRef(dc));
};

const searchModulesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'SearchModules', inputVars);
}
searchModulesRef.operationName = 'SearchModules';
exports.searchModulesRef = searchModulesRef;

exports.searchModules = function searchModules(dcOrVars, vars) {
  return executeQuery(searchModulesRef(dcOrVars, vars));
};

const listQuizzesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListQuizzes');
}
listQuizzesRef.operationName = 'ListQuizzes';
exports.listQuizzesRef = listQuizzesRef;

exports.listQuizzes = function listQuizzes(dc) {
  return executeQuery(listQuizzesRef(dc));
};

const getQuizByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetQuizById', inputVars);
}
getQuizByIdRef.operationName = 'GetQuizById';
exports.getQuizByIdRef = getQuizByIdRef;

exports.getQuizById = function getQuizById(dcOrVars, vars) {
  return executeQuery(getQuizByIdRef(dcOrVars, vars));
};
