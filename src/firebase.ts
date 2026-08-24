import { initializeApp, getApps } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  onSnapshot, 
  getDoc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json';
import { UserProfile, ContactMessage } from './types';
import { DEFAULT_PROFILE } from './data/defaultData';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const ADMIN_EMAILS = [
  'buiviethoangktxd@gmail.com',
  'buiviehoangktxd@gmail.com'
];

export { onAuthStateChanged };

export function checkIsAdmin(email?: string | null): boolean {
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();
  return ADMIN_EMAILS.some(adm => adm.toLowerCase() === cleanEmail);
}

export const isUserAdmin = (user?: User | null): boolean => {
  return checkIsAdmin(user?.email);
};

/**
 * Sign in using Google OAuth Popup
 */
export async function signInAdminWithGoogle(): Promise<{ user: User; isAdmin: boolean }> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const isAdmin = checkIsAdmin(user.email);
    return { user, isAdmin };
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
}

/**
 * Sign out current user
 */
export async function logoutAdmin(): Promise<void> {
  await signOut(auth);
}

/**
 * Listen to auth state changes
 */
export function onAuthChange(callback: (user: User | null, isAdmin: boolean) => void) {
  return onAuthStateChanged(auth, (user) => {
    const isAdmin = checkIsAdmin(user?.email);
    callback(user, isAdmin);
  });
}

const PROFILE_DOC_PATH = 'portfolio_settings';
const PROFILE_DOC_ID = 'main_profile';

/**
 * Save user profile to Google Cloud Firestore (Admin only)
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

/**
 * Submit Contact Message to Google Cloud Firestore (Public action)
 */
export async function submitContactMessage(
  data: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>
): Promise<string> {
  try {
    const messagesCol = collection(db, 'contact_messages');
    const docRef = await addDoc(messagesCol, {
      ...data,
      createdAt: new Date().toISOString(),
      status: 'unread'
    });
    return docRef.id;
  } catch (error) {
    console.error('Error submitting contact message to Firestore:', error);
    throw error;
  }
}

/**
 * Subscribe to contact messages for Admin
 */
export function subscribeToContactMessages(callback: (messages: ContactMessage[]) => void) {
  const messagesCol = collection(db, 'contact_messages');
  return onSnapshot(messagesCol, (snapshot) => {
    const messages: ContactMessage[] = [];
    snapshot.forEach((docSnap) => {
      messages.push({
        id: docSnap.id,
        ...(docSnap.data() as Omit<ContactMessage, 'id'>)
      });
    });
    // Sort in-memory by createdAt descending
    messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    callback(messages);
  }, (error) => {
    console.warn('Firestore contact messages snapshot error:', error);
  });
}

/**
 * Update message status (Admin only)
 */
export async function updateMessageStatus(
  messageId: string, 
  status: 'unread' | 'read' | 'archived'
): Promise<void> {
  try {
    const messageRef = doc(db, 'contact_messages', messageId);
    await updateDoc(messageRef, { status });
  } catch (error) {
    console.error('Error updating message status in Firestore:', error);
    throw error;
  }
}

/**
 * Delete message (Admin only)
 */
export async function deleteMessageFromCloud(messageId: string): Promise<void> {
  try {
    const messageRef = doc(db, 'contact_messages', messageId);
    await deleteDoc(messageRef);
  } catch (error) {
    console.error('Error deleting message from Firestore:', error);
    throw error;
  }
}
