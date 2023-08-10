import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { forgetApi, loginApi, signupApi } from '../../common/Apis/auth.api'
import * as ActionType from '../ActionTypes'
import { resetAlert, setAlert } from '../Slice/alertSlice'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* signupUser(action) {
    try {
        const user = yield call(signupApi, action.payload)
        yield put(setAlert({text: user.message, color: 'success'}))
        console.log(user);
    } catch (e) {
        yield put(setAlert({text: e.message, color: 'error'}))
        console.log(e);
    }
}

function* loginUser(action) {
    try {
        const user = yield call(loginApi, action.payload)
        yield put(setAlert({text: user.message, color: 'success'}))
        console.log(user);
    } catch (e) {
        yield put(setAlert({text: e.message, color: 'error'}))
        console.log(e);
    }
}

function* forgetUser(action) {
    try {
        const user = yield call(forgetApi, action.payload)
        yield put(setAlert({text: user.message, color: 'success'}))
        console.log(user);
    } catch (e) {
        yield put(setAlert({text: e.message, color: 'error'}))
        console.log(e);
    }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* signupSaga() {
    yield takeEvery(ActionType.SIGNUP_REQUEST, signupUser)
}

function* loginSaga() {
    yield takeEvery(ActionType.LOGIN_REQUEST, loginUser)
}

function* forgetSaga() {
    yield takeEvery(ActionType.FORGET_REQUEST, forgetUser)
}

export function* authsaga() {
    yield all([
        signupSaga(),
        loginSaga(),
        forgetSaga()
    ])
}