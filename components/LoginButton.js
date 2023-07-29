"use client";

import { auth, db } from "@/firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useAuthState, useSignInWithGoogle, useSignOut } from "react-firebase-hooks/auth";
const LoginButton = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [dbUser] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const createUserDocument = async (user) => {
    const docRef = doc(db, "users", user?.uid);
    await setDoc(docRef, JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {
    if (user) {
      createUserDocument(user.user);
    }
  }, [user]);

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <>
      {!dbUser ? (
        <button
          onClick={() => signInWithGoogle()}
          className="mr-5 hover:text-gray-900"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      ) : (
        <button
          onClick={async () => {
            await signOut();
          }}
          className="mr-5 hover:text-gray-900"
        >
          Logout
        </button>
      )}
    </>
  );
};

export default LoginButton;
