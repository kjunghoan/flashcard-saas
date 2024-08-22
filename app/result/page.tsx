'use client';
import { Box, CircularProgress, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface CheckoutSession {
  id: string;
  payment_status: 'paid' | 'unpaid' | 'no_payment_required';
  error?: string;
}

const ResultPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id');

  const [loading, setLoading] = useState<boolean>(true);
  const [session, setSession] = useState<CheckoutSession | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!session_id) return;
      try {
        const res = await fetch(`/api/checkout_session?session_id=${session_id}`);
        const sessionData: CheckoutSession = await res.json();
        if (res.ok) {
          setSession(sessionData);
        } else {
          setError(sessionData.error || "An error occurred");
        }
      } catch (error) {
        setError("An error occurred while fetching the session");
      } finally {
        setLoading(false);
      }
    };
    fetchCheckoutSession();
  }, [session_id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: '4rem' }}>
        <CircularProgress />
        <Typography variant="h5">Loading ...</Typography>
      </div>
    );
  };
  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: '4rem' }}>
        <Typography variant="h5" color="error">{error}</Typography>
      </div>
    )
  };

  return (
    <div
      id="result"
      data-testid="result"
      style={{
        textAlign: 'center',
        marginTop: '4rem'
      }}
    >
      {session?.payment_status === "paid" ? (
        <div>
          <Typography variant="h4">Thank you for your purchase</Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Session ID: {session_id}</Typography>
            <Typography variant="body1">
              We have received your payment. Proceed to the site as we email your receipt shortly.
            </Typography>
          </Box>
        </div>
      ) : (
        <div>
          <Typography variant="h4">Payment Failed</Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              Your payment was not successful. Please try again.
            </Typography>
          </Box>
        </div>
      )}
    </div>
  );
};

export default ResultPage;
