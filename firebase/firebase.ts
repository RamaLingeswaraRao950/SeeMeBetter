import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore as getFirestoreFull, initializeFirestore as initializeFirestoreFull } from "firebase/firestore";
import { getFirestore as getFirestoreLite } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!
};

export const firebaseApp = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);

// Use Firestore Lite (REST) for maximum compatibility.
// Some environments block Firestore's WebChannel streaming endpoints (/Write/channel),
// which breaks the full SDK even for basic reads/writes.
export const firebaseDb = getFirestoreLite(firebaseApp);

// Keep a full Firestore instance available (unused by default).
export const firebaseDbFull = (() => {
  try {
    return initializeFirestoreFull(firebaseApp, {
      experimentalAutoDetectLongPolling: true
    });
  } catch {
    return getFirestoreFull(firebaseApp);
  }
})();
