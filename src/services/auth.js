import { auth } from "./firebase";
// auth helpers
export function signUp(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

export function logIn(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}
