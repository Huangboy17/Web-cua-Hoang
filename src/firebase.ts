import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, setDoc, onSnapshot, getDoc } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { UserProfile } from './types';
import { DEFAULT_PROFILE } from './data/defaultData';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

const PROFILE_DOC_PATH = 'portfolio_settings';
const PROFILE_DOC_ID = 'main_profile';

/**
 * Save user profile to Google Cloud Firestore
 */
export async function saveProfileToCloud(profile: UserProfile): Promise<void> {
  try {
    const profileRef = doc(db, PROFILE_DOC_PATH, PROFILE_DOC_ID);
    await setDoc(profileRef, {
      ...profile,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (error) {
    console.error('Error saving profile to Firestore:', error);
    throw error;
  }
}

/**
 * Fetch profile from Google Cloud Firestore
 */
export async function fetchProfileFromCloud(): Promise<UserProfile | null> {
  try {
    const profileRef = doc(db, PROFILE_DOC_PATH, PROFILE_DOC_ID);
    const snap = await getDoc(profileRef);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error fetching profile from Firestore:', error);
    return null;
  }
}

/**
 * Realtime listener for profile synchronization
 */
export function subscribeToCloudProfile(callback: (profile: UserProfile) => void) {
  const profileRef = doc(db, PROFILE_DOC_PATH, PROFILE_DOC_ID);
  return onSnapshot(profileRef, (snap) => {
    if (snap.exists()) {
      callback(snap.data() as UserProfile);
    }
  }, (error) => {
    console.warn('Firestore snapshot listener warning/error:', error);
  });
}
