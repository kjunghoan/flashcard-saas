'use client';
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const Support: React.FC = () => {
  const router = useRouter();
  return (
    <div id="support" data-testid="support" style={{ paddingTop: "2rem", textAlign:"center" }}>
      <Typography variant="h4">Support</Typography>
      <Box sx={{ padding: 2, flexGrow: 2, textAlign: 'center' }}>
      <Typography
      variant="h6"
      >
        While we appreciate your interest, we are unfortunatly no longer 
        offering support for this product.
      </Typography>
      <Typography variant="h6">
        Please feel free to checkout our other offerings back on the home page.
      </Typography>
      <Button
        onClick={() => router.push("/")}
        variant="contained"
        sx={{ marginTop: 2 }}
      >Home</Button>
      </Box>
    </div>
  );
};

export default Support;
