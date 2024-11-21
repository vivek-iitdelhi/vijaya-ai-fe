import React, { useState } from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Plane } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const cards = [
  'https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/5/52/RWS_Tarot_05_Hierophant.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/a/a0/RWS_Tarot_03_Empress.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/3/3d/RWS_Tarot_04_Emperor.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/a/a2/RWS_Tarot_09_Hermit.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/1/18/RWS_Tarot_10_Wheel_of_Fortune.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_11_Justice.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/7/75/RWS_Tarot_12_Hanged_Man.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/c/c9/RWS_Tarot_13_Death.jpg',
];

const ItemType = 'CARD';

const DraggableCard = ({ src, index, moveCard }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Paper
      ref={drag}
      sx={{
        padding: '1rem',
        textAlign: 'center',
        borderRadius: '8px',
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        opacity: isDragging ? 0.5 : 1,
        '&:hover': {
          transform: 'rotateY(10deg) scale(1.05)',
          boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <img
        src={src}
        alt={`Tarot Card ${index + 1}`}
        style={{
          cursor: 'pointer',
          maxWidth: '100%',
          maxHeight: '200px',
          objectFit: 'cover',
          transition: 'transform 0.5s ease-in-out',
        }}
      />
      <Typography variant="h6" sx={{ marginTop: '1rem' }}>
        Tarot Card {index + 1}
      </Typography>
    </Paper>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [cardsList, setCardsList] = useState(cards);

  const moveCard = (dragIndex, hoverIndex) => {
    const updatedCards = [...cardsList];
    const [movedCard] = updatedCards.splice(dragIndex, 1);
    updatedCards.splice(hoverIndex, 0, movedCard);
    setCardsList(updatedCards);
  };

  return (
    <Box sx={{ padding: '1.5rem' }}>
      <Box sx={{ marginBottom: '15rem' }}></Box>

      <Typography variant="h4" gutterBottom>
        Welcome to Your Dashboard!
      </Typography>
      <Typography variant="body1" paragraph>
        Explore the instructions below to get started with our platform.
      </Typography>

      {/* Three.js Canvas for animations */}
      <Canvas camera={{ position: [0, 0, 5] }} style={{ marginBottom: '2rem', borderRadius: '8px' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <OrbitControls />
        <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="lightblue" />
        </Plane>
      </Canvas>

      <Box sx={{ maxWidth: '1200px', margin: 'auto' }}>
        {/* Grid of Instructional Images */}
        <Grid container spacing={3} justifyContent="center">
          {cardsList.map((src, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <DraggableCard src={src} index={index} moveCard={moveCard} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

// Wrap Home with DndProvider
const HomeWithDragDropContext = () => (
  <DndProvider backend={HTML5Backend}>
    <Home />
  </DndProvider>
);

export default HomeWithDragDropContext;
