import { initializeApp } from 'firebase/app';
import { getMessaging, Messaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'final-project-2fabc.firebaseapp.com',
  projectId: 'final-project-2fabc',
  storageBucket: 'final-project-2fabc.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

let messaging: Messaging | null = null;

// Fix crash FirebaseError in safari
try {
  const initializedFirebaseApp = initializeApp(firebaseConfig);
  messaging = getMessaging(initializedFirebaseApp);
  messaging.app.options.apiKey = import.meta.env.VITE_VAPID_KEY;
} catch (error) {
  // console.log('aaa', error)
}

export default messaging;
