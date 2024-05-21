import 'firebaseui/dist/firebaseui.css'
import firebase from 'firebase/compat/app'
import * as firebaseui from 'firebaseui'
import { auth } from './firebase'
import axios from 'axios'

// Function to transfer calendar data from localStorage to the backend
async function transferCalendarData(user: firebase.User): Promise<void> {
  const localStorageData = localStorage.getItem('unregisteredCalendar')
  if (localStorageData) {
    const calendarData = JSON.parse(localStorageData)
    const token = await user.getIdToken()

    await axios.post('/api/users/register', { calendarData }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    localStorage.removeItem('unregisteredCalendar')
  }
}

// Custom FirebaseUI configuration
const uiConfig: firebaseui.auth.Config = {
  signInSuccessUrl: '/', // Redirect to home after sign in
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  signInFlow: 'popup',
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  callbacks: {
    signInFailure: (error) => {
      console.error('Sign-in error:', error)
      return Promise.reject(error)
    },
    uiShown: () => {
      console.log('FirebaseUI shown')
    },
    signInSuccessWithAuthResult: (authResult) => {
      const user = authResult.user
      if (user) {
        transferCalendarData(user).then(() => {
          // Redirect to home page
          window.location.href = '/'
        }).catch(
          (error) => {
            console.error('Failed to transfer calendar data:', error)
            return Promise.reject(error)
          }
        )
      }
      return false // Prevents the redirect automatically
    }
  },
  tosUrl: '', // URL for Terms of Service
  privacyPolicyUrl: '' // URL for Privacy Policy
}

const ui = new firebaseui.auth.AuthUI(auth)

export { ui, uiConfig, transferCalendarData }
