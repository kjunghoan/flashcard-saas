import { SignUp } from "@clerk/nextjs";
import { Box, Typography } from "@mui/material";

const SignUpPage: React.FC = () => {
  return (
    <div data-testid="sign-up-page">
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
        <Typography variant="h2">Sign Up</Typography>
        <SignUp />
      </Box>
    </div>
  );
};

export default SignUpPage;
