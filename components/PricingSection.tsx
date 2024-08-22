'use client';
import getStripe from "@/utils/get-stripejs";
import { Box, Button, Divider, Grid, List, ListItem, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const PricingSection = () => {
  const router = useRouter();
  const prices = [
    {
      title: "Basic",
      price: "$5 / month",
      description: ["Create up to 100 flashcards for 1 user"],
      endPoint: 'basic'
    },
    {
      title: "Pro",
      price: "$10 / month",
      description: ["Create up to 500 flashcards for 1 user"],
      endPoint: "pro",
    },
    {
      title: "Enterprise",
      price: "Contact Support",
      description: [
        "Create unlimited flashcards for multiple users",
        "First party priority support",
      ],
      endPoint: '/support'
    },
  ];

  const handleRedirect = async (endPoint: string) => {
    if (endPoint === '/support') {
      router.push(endPoint);
    } else {
      if (!process.env.NEXT_PUBLIC_ORIGIN) {
        alert("No origin found, please contact support");
        throw new Error("No origin found");
      };
      try {
        const checkoutSession = await fetch("/api/checkout_sessions", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ endPoint }),
        });
        // TODO: remove me
        console.log("response status: ", checkoutSession.status);
        const checkoutSessionJson = await checkoutSession.json();
        if (!checkoutSession.ok) {
          alert("Failed to create checkout session, please contact support");
          throw new Error("Failed to create checkout session");
        }
        const stripe = await getStripe();
        if (!stripe) {
          alert("Failed to load stripe, please contact support");
          throw new Error("Failed to load stripe");
        }
        console.log("success amigo 1", checkoutSessionJson)
        const { error } = await stripe.redirectToCheckout({
          sessionId: checkoutSessionJson.id,
        });
        console.log("success mi amigo 2")
        if (error) {
          console.warn(error.message);
        }
        console.log("success mi amigo 3")
      } catch (error) {
        console.error("Error in handleRedirect: ", error);
        alert("An error occurred while redirecting to checkout, please contact support");
      };
    }
  };

  return (
    <Box sx={{ padding: 2, flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ textAlign: 'center' }}>
        <Grid item xs={12}>
          <Typography variant="h4">Pricing</Typography>
          <Divider sx={{ marginBottom: 2 }} />
        </Grid>
        {prices.map((price, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Box sx={{
              padding: 3,
              border: '1px solid #ccc',
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            }}>
              <Typography variant="h5">{price.title}</Typography>
              <Typography variant="h6" sx={{ marginBottom: 1 }}>{price.price}</Typography>
              <Divider sx={{ marginBottom: 1 }} />
              <List>
                {price.description.map((desc, index) => (
                  <ListItem key={index}>{desc}</ListItem>
                ))}
              </List>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  marginTop: 'auto'
                }}
                onClick={() => { handleRedirect(price.endPoint) }}
              >
                {price.title === "Enterprise" ? "Contact Support" : price.title}
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
};

export default PricingSection;
