
/* global fetch */
import { all, takeLatest } from 'redux-saga/effects';

function* rootSaga() {
  yield all([

    // takeLatest(GET_USER_PREFERENCES, userPreferencesSaga),
    // takeLatest(SIGNUP_USER, userSingUpSaga),
    // takeLatest(LOGIN_USER_SOCIAL, logInWithSocialSaga)
  ]);
}

export default rootSaga;