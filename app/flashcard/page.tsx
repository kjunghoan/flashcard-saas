'use client'
import db from '@/firebase'
import { useUser } from '@clerk/nextjs'
import { Box, CardActionArea, CardContent, Grid, Typography } from "@mui/material"
import { collection, doc, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'

const FlashcardPage: React.FC = () => {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcards, setFlashcards] = useState<any[]>([])
  const [flipped, setFlipped] = useState<boolean[]>([])

  const searchParams = useSearchParams()
  const search = searchParams.get('id')

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return
      const colRef = collection(doc(collection(db, 'users'), user.id), search)
      const docs = await getDocs(colRef)
      const flashcards: any[] = []

      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() })
      })
      setFlashcards(flashcards)
    }
    getFlashcard()
  }, [user, search])

  const handleCardClick = (id: number) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  if (!isLoaded || !isSignedIn) {
    return <></>
  }

  return (
    <div>
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.map((flashcard, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CardActionArea onClick={() => handleCardClick(index)}>
              <CardContent>
                <Box
                  sx={{
                    perspective: "1000px",
                    '& > div': {
                      transition: 'transform 0.6s',
                      transformStyle: 'preserve-3d',
                      position: 'relative',
                      width: '100%',
                      height: '200px',
                      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                      transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                      borderRadius: "30px",

                    },

                    '& > div > div': {
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 2,
                      boxSizing: "border-box",
                      borderRadius: "30px",
                      overflow: 'auto',

                    },
                    '& > div > div:nth-of-type(1)': {
                      backgroundColor: "#9BEDFF",
                    },

                    '& > div > div:nth-of-type(2)': {
                      transform: 'rotateY(180deg)',
                      backgroundColor: "#bcf5bc"

                    },

                  }}
                >
                  <div>
                    <div>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          maxHeight: "100%",
                          overflow: "auto",
                          wordBreak: "break-word",
                          fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                          fontSize: "1.2rem",
                          lineHeight: 1.5,
                          color: "#000",
                          fontWeight: "bold",
                          padding: "10px",
                        }}> {flashcard.front} </Typography>
                    </div>
                    <div>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          maxHeight: "100%",
                          overflow: "auto",
                          wordBreak: "break-word",
                          fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                          fontSize: "1.2rem",
                          lineHeight: 1.5,
                          color: "#000",
                          padding: "10px",

                        }}> {flashcard.back} </Typography>
                    </div>
                  </div>
                </Box>
              </CardContent>
            </CardActionArea>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default FlashcardPage;
