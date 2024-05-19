// src/firebaseui.js
import 'firebaseui/dist/firebaseui.css'; // Ensure the FirebaseUI CSS is included
import * as firebaseui from 'firebaseui';
import { auth } from './firebase';

const uiConfig = {
  signInSuccessUrl: '/', // Redirect to home after sign in
  signInOptions: [
    'password'  // Email/password authentication
  ],
  tosUrl: '', // URL for Terms of Service
  privacyPolicyUrl: '' // URL for Privacy Policy
};

const ui = new firebaseui.auth.AuthUI(auth);

export { ui, uiConfig };
