import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDcxkBN535xCmN0b333D2eF-pVyrgwylUg",
  authDomain: "box-p-1e200.firebaseapp.com",
  projectId: "box-p-1e200",
  storageBucket: "box-p-1e200.appspot.com",
  messagingSenderId: "443592507137",
  appId: "1:443592507137:web:0e4f2b4a56b8d9ea8a6500"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app);
const storage = getStorage(app)

export { db, storage }