import { useState, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../FirebaseConfig.js";

export function SignIn() {
  return (
    <button onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}>
      SignIn
    </button>
  );
}

export function SignOut() {
  return (
    <div>
      Hello, {auth.currentUser.displayName} &nbsp;
      <button onClick={() => signOut(auth)}>SignOut</button>
    </div>
  );
}

export function useAuthentication() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      user ? setUser(user) : setUser(null);
    });
  }, []);
  return user;
}
