import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
const NavBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          style={{
            flexGrow: 1
          }}
        >Flashcard SaaS</Typography>
        <SignedOut>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Sign Up</Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
