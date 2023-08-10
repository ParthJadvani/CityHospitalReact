import { all } from "redux-saga/effects";
import { authsaga } from "./authSaga";

export function* rootsaga() {
    yield all([
        authsaga()
    ])
}