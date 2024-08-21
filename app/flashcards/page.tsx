'use client'
import PleaseSignIn from '@/components/PleaseSignIn'
import db from '@/firebase'
import { useUser } from '@clerk/nextjs'
import { Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const FlashcardsPage: React.FC = () => {

  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]); // Ensure flashcards is always an array
  const router = useRouter();

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;
      const docRef = doc(collection(db, 'users'), user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
        setFlashcards([]);
      }
    }
    getFlashcards();
  }, [user]);

  const handleCardClick = (id:string) => {
    router.push(`/flashcard?id=${id}`);
  };


  return !isSignedIn || !isLoaded ? (
    <PleaseSignIn />
  ) : (
    <Grid
      container
      spacing={3}
      sx={{ mt: 4 }}
    >
      {Array.isArray(flashcards) && flashcards.length > 0 ? (
        flashcards.map((flashcard: Flashcard, index: number) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardActionArea
                onClick={() => {
                  handleCardClick(flashcard.name)
                }}
              >
                <CardContent>
                  <Typography variant="h6">{flashcard.name}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography>No flashcards available</Typography>
      )}
    </Grid>
  )
};

export default FlashcardsPage;
