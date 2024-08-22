import { Box, Divider, Grid, Typography } from "@mui/material";

const FeatureSection = () => {
  const features = [
    {
      title: "Create Flashcards",
      description: "Create flashcards from your text making it easier to study",
    },
    {
      title: "Smart Flashcards",
      description: "Our AI will generate flashcards from your text breaking down complex concepts into simple questions",
    },
    {
      title: "Study Flashcards From Anywhere",
      description: "Study your flashcards from anywhere on any device",
    },
    {
      title: "Easy To Use",
      description: "Our app is easy to use and intuitive",
    }
  ];
  return (
    <Box sx={{ padding: 2, flexGrow: 2, textAlign: 'center' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Features</Typography>
          <Divider sx={{ marginBottom: 2 }} />
        </Grid>
        {features.map((feature, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Box sx={{ display: 'inline-block' }}>
              <Typography
                variant="h5"
                component="h5"
                sx={{
                  position: 'relative',
                  paddingBottom: 1
                }}
              >
                {feature.title}
              </Typography>
              <Divider sx={{ marginBottom: 1 }} />
            </Box>
            <Typography>{feature.description}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default FeatureSection;
