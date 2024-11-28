import React, { useState } from 'react';
import {
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Paper,
  Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Playground = () => {
  const [generatorLLM, setGeneratorLLM] = useState('');
  const [embedding, setEmbedding] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Dummy data for dropdowns
  const generatorLLMs = ['LLM Model A', 'LLM Model B', 'LLM Model C'];
  const embeddings = ['Embedding 1', 'Embedding 2', 'Embedding 3'];

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') {
      setErrorMessage('Message cannot be empty');
      setOpenSnackbar(true);
      return;
    }

    const userMessage = { sender: 'User', text: inputMessage };
    const botMessage = { sender: 'Bot', text: 'This is a bot reply to your message!' };

    setMessages([...messages, userMessage, botMessage]);
    setInputMessage('');
  };

  const handleNewChat = () => {
    setMessages([]);
    setInputMessage('');
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#fff', minHeight: '100vh' }}>
      {/* Top Section with Dropdowns and New Chat Button */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <Box sx={{ display: 'flex', gap: '20px', flexGrow: 1 }}>
          <FormControl sx={{ flex: 1 }}>
            <InputLabel>Select Generator LLM</InputLabel>
            <Select
              value={generatorLLM}
              onChange={(e) => setGeneratorLLM(e.target.value)}
              label="Select Generator LLM"
            >
              {generatorLLMs.map((llm, index) => (
                <MenuItem key={index} value={llm}>
                  {llm}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ flex: 1 }}>
            <InputLabel>Select Embedding</InputLabel>
            <Select
              value={embedding}
              onChange={(e) => setEmbedding(e.target.value)}
              label="Select Embedding"
            >
              {embeddings.map((embed, index) => (
                <MenuItem key={index} value={embed}>
                  {embed}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Button
          variant="contained"
          sx={{
            backgroundColor: '#5a2387',
            color: '#fff',
            borderRadius: '8px',
            padding: '10px 20px',
            marginLeft: '20px',
            '&:hover': {
              backgroundColor: '#3f1a5b',
            },
          }}
          onClick={handleNewChat}
        >
          New Chat
        </Button>
      </Box>

      {/* Chat Window */}
      <Paper
        sx={{
          backgroundColor: '#f4f6f8',
          borderRadius: '8px',
          padding: '20px',
          height: '400px', // Fixed height for chat window
          overflowY: 'auto', // Makes the chat scrollable if content exceeds height
          marginBottom: '20px',
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: message.sender === 'User' ? 'flex-end' : 'flex-start',
              marginBottom: '10px',
            }}
          >
            <Box
              sx={{
                backgroundColor: message.sender === 'User' ? '#3f51b5' : '#e0e0e0',
                color: message.sender === 'User' ? '#fff' : '#000',
                borderRadius: '20px',
                padding: '10px 20px',
                maxWidth: '60%',
              }}
            >
              {message.text}
            </Box>
          </Box>
        ))}
      </Paper>

      {/* Input area and Send Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          variant="outlined"
          placeholder="Type a message"
          fullWidth
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          sx={{ marginRight: '10px' }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#5a2387',
            '&:hover': {
              backgroundColor: '#3f1a5b',
            },
            borderRadius: '20px',
            fontSize: '16px',
            padding: '10px 20px',
          }}
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </Box>

      {/* Snackbar for Error Messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default Playground;
