'use client';
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import FeatureSection from "../components/FeatureSection";
import PricingSection from "../components/PricingSection";

const Home: React.FC = () => {
  const router = useRouter();
  const handleNav = (signedIn: boolean) => {
    signedIn ? router.push("/dashboard") : router.push("/sign-up");
  }
  return (
    <div id="home" data-testid="home" >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h2">Welcome to Flashcard SaaS</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h5">
          A SaaS for creating flashcards from your text
        </Typography>
        <SignedIn>
          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 2
            }}
          onClick={() => handleNav(false)}
          >Get Started</Button>
        </SignedIn>
        <SignedOut>
          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 2
            }}
          onClick={() => handleNav(false)}
          >Get Started</Button>
        </SignedOut>
      </Box>
      <FeatureSection />
      <PricingSection />
    </div>
  );
}

export default Home;
