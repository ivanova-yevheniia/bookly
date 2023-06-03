import { CssBaseline } from "@mui/material";
import { getAuth } from "firebase/auth";
import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider, FirebaseAppProvider, useFirebaseApp } from "reactfire";
import App from "./App";
import "./index.css";
import { firebaseConfig } from "./utils/constants";

const FirebaseAuthProvider = ({ children }) => {
  const auth = getAuth(useFirebaseApp());
  return <AuthProvider sdk={auth}>{children}</AuthProvider>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseAuthProvider>
        <CssBaseline />
        <App />
      </FirebaseAuthProvider>
    </FirebaseAppProvider>
  </React.StrictMode>,
);
