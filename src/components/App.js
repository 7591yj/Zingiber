import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { initializeApp } from "firebase/app";
import "css/App.css";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// eslint-disable-next-line
const firebaseApp = initializeApp(firebaseConfig);

const App = () => {
  const auth = getAuth();
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        if (user.displayName === null) {
          const emailName = user.email.indexOf("@");
          const displayName = user.email.substring(0, emailName);
          updateProfile(user, { displayName: displayName });
        }
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
        });
      } else {
        setUserObj(null);
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, [auth]);

  return (
    <>
      <div className="appContainer">
        {init ? (
          <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
        ) : (
          <span>Initializing...</span>
        )}
        <footer>
          Zingiber {new Date().getFullYear()} &#183; icons delivered by{" "}
          <a className="footerA" href="https://fontawesome.com/">
            Font Awesome
          </a>
        </footer>
      </div>
    </>
  );
};

export default App;
