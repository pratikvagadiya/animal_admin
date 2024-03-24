import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  SIGNIN_USER,
  SIGNOUT_USER
} from "constants/ActionTypes";
import { showAuthMessage, userSignInSuccess, userSignOutSuccess } from "../../appRedux/actions/Auth";
import jwt from 'jsonwebtoken';
import {
  auth,
} from "../../firebase/firebase";

const signInUserWithEmailPasswordRequest = async (email, password) =>
  await  auth.signInWithEmailAndPassword(email, password)
    .then(authUser => authUser)
    .catch(error => error);


export const GetCurrentLoggedUserDetails = () => {
  const userAccessToken = sessionStorage.getItem('user_token');
  if (userAccessToken) {
    let data = jwt.decode(userAccessToken.replace('Bearer ', ''));
    return data
  }
  return null;
}


export const profileRequest = async () =>
  await fetch('http://localhost:4000/api/user', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'Authorization': sessionStorage.getItem('token')
    },
    body: JSON.stringify({
      email: sessionStorage.getItem('currentUser')
    })
  })
    .then(res => res.json())
    .then(data => data)

export const conatctsRequest = async () =>
  await fetch('http://localhost:4000/api/contact/receive', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'Authorization': sessionStorage.getItem('token')
    }
  })
    .then(res => res.json())
    .then(data => data)

export const mainActivitiesRequest = async () =>
  await fetch('http://localhost:4000/api/mainactivity/receive', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'Authorization': sessionStorage.getItem('token')
    }
  })
    .then(res => res.json())
    .then(data => data)

export const subActivitiesRequest = async () =>
  await fetch('http://localhost:4000/api/subactivity/receive', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'Authorization': sessionStorage.getItem('token')
    }
  })
    .then(res => res.json())
    .then(data => data)

export const addMainActivityRequest = async (data) =>
  await fetch('http://localhost:4000/api/mainactivity/create', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'Authorization': sessionStorage.getItem('token')
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => data)

export const addSubActivityRequest = async (data) =>
  await fetch('http://localhost:4000/api/subactivity/create', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'Authorization': sessionStorage.getItem('token')
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => data)

export const editMainActivityRequest = async (data) =>
  await fetch('http://localhost:4000/api/mainactivity/update', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'Authorization': sessionStorage.getItem('token')
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => data)

export const editSubActivityRequest = async (data) =>
  await fetch('http://localhost:4000/api/subactivity/update', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'Authorization': sessionStorage.getItem('token')
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => data)

export const deleteRequest = async (email) =>
  await fetch('http://localhost:4000/api/contact/delete', {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'Authorization': sessionStorage.getItem('token')
    },
    body: JSON.stringify({
      email: email
    })
  })
    .then(res => res.json())
    .then(data => data)

export const mainActivitydeleteRequest = async (name) =>
  await fetch('http://localhost:4000/api/mainactivity/delete', {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'Authorization': sessionStorage.getItem('token')
    },
    body: JSON.stringify({
      name: name
    })
  })
    .then(res => res.json())
    .then(data => data)

export const subActivitydeleteRequest = async (name) =>
  await fetch('http://localhost:4000/api/subactivity/delete', {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'Authorization': sessionStorage.getItem('token')
    },
    body: JSON.stringify({
      name: name
    })
  })
    .then(res => res.json())
    .then(data => data)

export const namebyIdRequest = async (id) =>
  await fetch('http://localhost:4000/api/subactivity/getnamebyid', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'Authorization': sessionStorage.getItem('token')
    },
    body: JSON.stringify({
      _id: id
    })
  })
    .then(res => res.json())
    .then(data => data)

export const stepsbyNameRequest = async (name) =>
  await fetch('http://localhost:4000/api/subactivity/getstepsbyname', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'Authorization': sessionStorage.getItem('token')
    },
    body: JSON.stringify({
      name: name
    })
  })
    .then(res => res.json())
    .then(data => data)

function* signInUserWithEmailPassword({ payload }) {
  const { email, password } = payload;
  try {
    const signInUser = yield call(signInUserWithEmailPasswordRequest, email, password);
    if (signInUser.message) {
      yield put(showAuthMessage(signInUser.message));
    } else {
      localStorage.setItem('user_id', signInUser.user.uid);
      yield put(userSignInSuccess(signInUser.user.uid));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

const signOutRequest = async () =>
  await auth.signOut()
    .then(authUser => authUser)
    .catch(error => error);

function* signOut() {
  try {
    const signOutUser = yield call(signOutRequest);
    if (signOutUser === undefined) {
      sessionStorage.removeItem('user_token');
      yield put(userSignOutSuccess(signOutUser));
    } else {
      yield put(showAuthMessage(signOutUser.message));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

export function* signInUser() {
  yield takeEvery(SIGNIN_USER, signInUserWithEmailPassword);
}

export function* signOutUser() {
  yield takeEvery(SIGNOUT_USER, signOut);
}

export default function* rootSaga() {
  yield all([fork(signInUser),
  fork(signOutUser)]);
}
