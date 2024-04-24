import { useState, useEffect } from "react";
import { signInWithPopup, OAuthProvider, signOut } from "firebase/auth";
import { auth } from "../FirebaseConfig.js";

export function SignIn() {
  const signInWithMicrosoft = () => {
    const provider = new OAuthProvider("microsoft.com");
    // Add scopes for accessing Outlook data if needed
    // provider.addScope('https://outlook.office.com/mail.read');
    signInWithPopup(auth, provider)
      .then((result) => {
        // Handle successful sign-in
      })
      .catch((error) => {
        // Handle errors
      });
  };

  return <button onClick={signInWithMicrosoft}>SignIn with Outlook</button>;
}

export function SignOut() {
  return (
    <div>
      {auth.currentUser && (
        <div>
          Hello, {auth.currentUser.displayName} &nbsp;
          <button onClick={() => signOut(auth)}>SignOut</button>
        </div>
      )}
    </div>
  );
}

export function useAuthentication() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return user;
}
