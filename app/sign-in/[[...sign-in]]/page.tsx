import { SignIn } from "@clerk/nextjs";
import { Box, Typography } from "@mui/material";

const SignInPage: React.FC = () => {
  return (
    <div data-testid="sign-in-page">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          paddingTop: "1vh",
          height: "80vh"
        }}
      >
        <Typography variant="h2">Sign In</Typography>
        <SignIn />
      </Box>
    </div>
  );
};

export default SignInPage;
