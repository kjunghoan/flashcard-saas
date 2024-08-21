'use client';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
const NavBar: React.FC = () => {

  const router = useRouter();

  const handleNav = (name: string) => {
    router.push(`/${name}`);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          style={{
            flexGrow: 1
          }}
        onClick={() => handleNav('')}
        >Flashcard SaaS</Typography>
        <SignedOut>
          <Button color="inherit"
          name="login"
            onClick={() => handleNav('sign-in')}
          >Login</Button>
          <Button color="inherit"
          name="sign-up"
            onClick={() => handleNav('sign-up')}
          >Sign Up</Button>
        </SignedOut>
        <SignedIn>
          <Button
          sx={{ mr: 2 }}
            color="inherit"
            name="flashcards"
            onClick={() => handleNav('flashcards')}
          >Your Flashcards</Button>
          <Button
          sx={{ mr: 2 }}
            color="inherit"
            name="generate"
            onClick={() => handleNav('generate')}
          >Generate New Flashcards</Button>
          <UserButton />
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
