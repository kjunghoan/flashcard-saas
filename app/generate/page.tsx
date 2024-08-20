'use client';
import FlashcardComponent from "@/components/FlashcardComponent";
import db from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, TextField, Typography } from "@mui/material";
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FlippedState {
  [key: number]: boolean;
};

const Generate: React.FC = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [flipped, setFlipped] = useState<FlippedState>([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    fetch("/api/generate", {
      method: 'POST',
      body: text,
    })
      .then((res) => res.json())
      .then((data) => setFlashcards(data))
      .catch((err) => console.error(err));
  };
  const handleCardFlip = (id: number) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const saveFlashcards = async () => {
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
    handleClose();
    router.push('/flashcards');
  };
  return isSignedIn? (
    <div id="generate" data-testid="generate">
      <h1>Generate</h1>
      <Box
        sx={{
          mt: 2,
          mb: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Typography variant="h6">Generate Flashcards</Typography>
        <Paper sx={{ p: 4, width: '100%' }}>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >Submit</Button>
        </Paper>
      </Box>
      {flashcards.length > 0 && (<Box sx={{ mt: 4 }}>
        <Typography variant="h5">FlashCards Preview</Typography>
        <Grid container spacing={3}>
          {flashcards.map((flashcard, index) => (
            <FlashcardComponent
            key={index}
            flashcard={flashcard}
            index={index}
            flipped={flipped[index]}
            handleCardFlip={handleCardFlip}
          />
          ))}
        </Grid>
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: 'center',
            marginBottom: "30px"
          }}>
          <Button
            variant="contained"
            onClick={handleOpen}
          > Save </Button>
        </Box>
      </Box>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Flashcards</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for the flashcard collection.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Collection Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}> Cancel </Button>
          <Button onClick={saveFlashcards}> Save </Button>
        </DialogActions>
      </Dialog>
    </div>
  ) 
  : (
    <div>
      <h1>Generate</h1>
      <Typography variant="h5">Please sign in to generate flashcards</Typography>
    </div>
  );
};

export default Generate;
