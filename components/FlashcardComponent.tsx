import { Box, Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";

const FlashcardComponent: React.FC<{
  flashcard: Flashcard;
  index: number;
  flipped: boolean;
  handleCardFlip: (index: number) => void
}> = ({ flashcard, index, flipped, handleCardFlip }) => {
  return (
    <Grid item xs={12} sm={6} md={4} key={index}>
      <Card>
        <CardActionArea onClick={() => handleCardFlip(index)}>
          <CardContent>
            <Box
              sx={{
                perspective: '1000px',
                '& > div': {
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.5s',
                  position: 'relative',
                  width: '100%',
                  height: '200px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                },
                '& > div > div': {
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 2,
                  boxSizing: 'border-box',
                },
                '& > div > div:nth-of-type(2)': {
                  transform: 'rotateY(180deg)',
                }
              }}>
              <div>
                <div>
                  <Typography variant="h5" component="div">
                    {flashcard.front}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h5" component="div">
                    {flashcard.back}
                  </Typography>
                </div>
              </div>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
export default FlashcardComponent;