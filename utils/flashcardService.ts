// src/services/flashcardService.ts
import db from '@/firebase';
import { collection, doc, getDoc, writeBatch } from 'firebase/firestore';

export const saveFlashcards = async (
  isLoaded: boolean,
  isSignedIn: boolean | undefined,
  user: { id: string } | null | undefined,
  name: string,
  flashcards: Flashcard[]
) => {
  if (!isLoaded || !isSignedIn || !user) {
    alert('Please sign in to save flashcards');
    return;
  }
  if (!name) {
    alert('Please enter a name');
    return;
  }
  const batch = writeBatch(db);
  const userDocRef = doc(collection(db, 'users'), user.id);
  const docSnap = await getDoc(userDocRef);
  if (docSnap.exists()) {
    const collections = docSnap.data().flashcards || [];
    if (collections.find((flashcard: Flashcard) => flashcard.name === name)) {
      alert('Flashcard with the same name already exists');
      return;
    } else {
      collections.push({ name });
      batch.set(userDocRef, { flashcards: collections }, { merge: true });
    }
  } else {
    batch.set(userDocRef, { flashcards: [{ name }] });
  }
  const columnRef = collection(userDocRef, name);
  flashcards.forEach((flashcard) => {
    const cardDocRef = doc(columnRef);
    batch.set(cardDocRef, flashcard);
  });
  await batch.commit();
};