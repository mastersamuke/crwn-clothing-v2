import { initializeApp } from 'firebase/app';
import {
   getAuth,
   signInWithPopup,
   signInWithRedirect,
   GoogleAuthProvider,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
   onAuthStateChanged
} from 'firebase/auth';

import {
   getFirestore,
   doc,
   getDoc,
   setDoc,
   collection,
   writeBatch,
   query,
   getDocs
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyA2kw9q6b5SyTuA1c8D9hoWj1zPDrs1_JI",
   authDomain: "crwn-clothing-db-b3a77.firebaseapp.com",
   projectId: "crwn-clothing-db-b3a77",
   storageBucket: "crwn-clothing-db-b3a77.appspot.com",
   messagingSenderId: "564544503804",
   appId: "1:564544503804:web:8261cc2cd553c2a5813c79"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
   prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
   const collectionRef = collection(db, collectionKey);
   const batch = writeBatch(db);

   objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
   });

   await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
   const collectionRef = collection(db, 'categories');
   const q = query(collectionRef);

   const querySnapshot = await getDocs(q);
   return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createUserDocumentFromAuth = async (
   userAuth,
   additionalInformation = {}
) => {
   if (!userAuth) return;

   const userDocRef = doc(db, 'users', userAuth.uid);

   const userSnapshot = await getDoc(userDocRef);

   if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
         await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation,
         });
      } catch (error) {
         console.log('error creating the user', error.message);
      }
   }

   return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
   if (!email || !password) return;

   return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
   if (!email || !password) return;

   return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
   return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
         auth,
         (userAuth) => {
            unsubscribe();
            resolve(userAuth);
         },
         reject
      );
   });
};