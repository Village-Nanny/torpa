import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';
import { getMessaging } from 'firebase/messaging';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBwI_nx9p0U5hl8sO4fOw0webWqR9i3olE",
  authDomain: "torpa-c2c35.firebaseapp.com",
  projectId: "torpa-c2c35",
  storageBucket: "torpa-c2c35.firebasestorage.app",
  messagingSenderId: "757790367300",
  appId: "1:757790367300:web:29b8331bcde3230a5ca611",
  measurementId: "G-NKPYBZFLQS"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);
const messaging = typeof window !== 'undefined' ? getMessaging(app) : null;
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app, auth, db, storage, functions, messaging, analytics };