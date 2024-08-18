'use client';
import { Box, Button, Divider, Grid, List, ListItem, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const PricingSection = () => {
  const router = useRouter();
  const prices = [
    {
      title: "Basic",
      price: "$5 / month",
      description: ["Create up to 100 flashcards for 1 user"],
      endPoint: '/checkout'
    },
    {
      title: "Pro",
      price: "$10 / month",
      description: ["Create up to 500 flashcards for 1 user"],
      endPoint: "/checkout",
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

  const handleRedirect = (endPoint: string) => {
    router.push(endPoint);
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
                sx={{ marginTop: 'auto' }}
                onClick={() => {handleRedirect(price.endPoint)}}
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
