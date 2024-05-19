import 'firebaseui/dist/firebaseui.css';
import firebase from "firebase/compat/app";
import * as firebaseui from 'firebaseui';
import { auth } from './firebase';

const uiConfig: firebaseui.auth.Config = {
  signInSuccessUrl: '/', // Redirect to home after sign in
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  signInFlow: 'popup',
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  callbacks: {
    signInFailure: (error) => {
      console.error('Sign-in error:', error);
      return Promise.reject(error);
    },
    uiShown: () => {
      console.log('FirebaseUI shown');
    }
  },
  tosUrl: '', // URL for Terms of Service
  privacyPolicyUrl: '' // URL for Privacy Policy
};

const ui = new firebaseui.auth.AuthUI(auth);

export { ui, uiConfig };
