import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const PleaseSignIn: React.FC = () => {
  const router = useRouter();
  return (<div
      id="notLoggedIn"
      data-testid="notLoggedIn"
      style={{
        textAlign: 'center',
        marginTop: '10rem',
      }}>
      <h1>Generate</h1>
      <Typography variant="h5">Please sign in before proceeding</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push('/sign-in')}
        sx={{ marginTop: '4rem' }}
      >Sign In</Button>
    </div>);
};

export default PleaseSignIn;