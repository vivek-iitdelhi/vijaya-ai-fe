import { useState } from 'react';
import { Card, CardContent, Typography, Grid, IconButton, Box } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const dummyData = [
  { id: 1, name: 'Card 1', description: 'Description of Card 1' },
  { id: 2, name: 'Card 2', description: 'Description of Card 2' },
  { id: 3, name: 'Card 3', description: 'Description of Card 3' },
  { id: 4, name: 'Card 4', description: 'Description of Card 4' },
  { id: 5, name: 'Card 5', description: 'Description of Card 5' },
  { id: 6, name: 'Card 6', description: 'Description of Card 6' },
  { id: 7, name: 'Card 7', description: 'Description of Card 7' },
  { id: 8, name: 'Card 8', description: 'Description of Card 8' },
  { id: 9, name: 'Card 9', description: 'Description of Card 9' },
  { id: 10, name: 'Card 10', description: 'Description of Card 10' },
];

export const RAG = () => {
  const [files, setFiles] = useState({});

  const handleFileChange = (event, cardId) => {
    const newFiles = { ...files, [cardId]: event.target.files[0] };
    setFiles(newFiles);
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Grid container spacing={3}>
        {dummyData.map((card) => (
          <Grid item xs={12} sm={6} md={2.4} key={card.id}>
            <Card sx={{ position: 'relative', padding: '16px', height: '200px' }}>
              {/* Upload Button in the Left Corner */}
              <IconButton
                component="label"
                sx={{ position: 'absolute', top: '10px', left: '10px' }}
                color="primary"
              >
                <CloudUploadIcon />
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleFileChange(e, card.id)}
                />
              </IconButton>

              {/* Card Content */}
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {card.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {card.description}
                </Typography>
              </CardContent>

              {/* Uploaded File Display */}
              {files[card.id] && (
                <Typography variant="body2" color="primary">
                  Uploaded: {files[card.id].name}
                </Typography>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};