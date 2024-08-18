import { Box, Button, Divider, Typography } from "@mui/material";
import FeatureSection from "./components/FeatureSection";
import PricingSection from "./components/PricingSection";

const Home: React.FC = () => {
  return (
    <div id="home" data-testid="home" style={{ paddingTop: "50px" }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h2">Welcome to Flashcard SaaS</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h5">
          A SaaS for creating flashcards from your text
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 2
          }}
        >Get Started</Button>
      </Box>
      <FeatureSection />
      <PricingSection />
    </div>
  );
}

export default Home;
