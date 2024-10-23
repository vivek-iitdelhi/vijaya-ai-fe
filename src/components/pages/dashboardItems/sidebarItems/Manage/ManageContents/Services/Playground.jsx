import { useState, useEffect, useRef } from 'react';
import { Box, Button, TextField, MenuItem, Select, Paper } from '@mui/material';
import axios from 'axios';

const Playground = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [selectedDeployment, setSelectedDeployment] = useState('GPT-3');
  const [shouldScroll, setShouldScroll] = useState(true);

  const dummyDeployments = ['GPT-3', 'LLaMA', 'ChatGPT', 'Claude'];
  const textareaRef = useRef(null);
  const lastMessageRef = useRef(null);
  const url = "https://rbea5pj4f9gk98-8000.proxy.runpod.net/generate/";

  // Function to handle sending messages
  const handleSendMessage = async () => {
    if (currentMessage.trim() === '') return;

    const newMessages = [...messages, { text: currentMessage, sender: 'user' }];
    setMessages(newMessages);
    setCurrentMessage('');

    try {
      const response = await axios.post(url, {
        text: currentMessage,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const botReply = {
        text: response.data.response || 'Error: No response from server.',
        sender: 'bot',
      };

      setMessages((prevMessages) => [...prevMessages, botReply]);
    } catch  {
      
      setMessages((prevMessages) => [...prevMessages, { text: 'Error: Failed to fetch response.', sender: 'bot' }]);
    }

    setShouldScroll(true); // Allow scroll after message is sent
  };

  // Function to create new chat window
  const handleCreateNewChatWindow = async () => {
    setMessages([]);
    setCurrentMessage('');
    setSelectedDeployment('GPT-3');
  
    try {
      const response = await axios.post(url, {
        text: "!!new_chat",
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const botResponse = response.data.response || 'New chat created.';
  
      // Ignore any response like "Act like a helpful assistant"
      if (!botResponse.includes("Act like a helpful assistant")) {
        setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: 'bot' }]);
      }
    } catch {
      setMessages((prevMessages) => [...prevMessages, { text: 'Error: Failed to create new chat.', sender: 'bot' }]);
    }
  };
  

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currentMessage]);

  useEffect(() => {
    if (shouldScroll && lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, shouldScroll]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        padding: '20px',
        background: 'linear-gradient(135deg, #f6f9fc, #e9f3fa)',
        fontFamily: 'Arial, sans-serif',
        overflow: 'hidden',
      }}
    >
      <Paper
        sx={{
          display: 'flex',
          position: 'sticky',
          flexDirection: 'column',
          borderRadius: '25px',
          overflow: 'hidden',
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
          maxWidth: '800px',
          width: '100%',
          height: '65vh',
          margin: '0 auto',
          backgroundColor: '#ffffff',
        }}
      >
        {/* "New Chat Window" Button in the top-right corner */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateNewChatWindow}
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: '#ff5e57',
            color: '#fff',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
            borderRadius: '50px',
            padding: '10px 25px',
            textTransform: 'none',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: '#ff4b42',
            },
          }}
        >
          New Chat Window
        </Button>

        {/* Deployment Dropdown */}
        <Box
          sx={{
            padding: '15px',
            backgroundColor: '#f7f9fc',
            borderBottom: '1px solid #ddd',
          }}
        >
          <Select
            value={selectedDeployment}
            onChange={(e) => setSelectedDeployment(e.target.value)}
            variant="outlined"
            sx={{
              backgroundColor: '#fff',
              minWidth: '200px',
              borderRadius: '12px',
              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
              fontSize: '16px',
              fontWeight: 'bold',
              '& .MuiSelect-select': {
                padding: '12px',
              },
            }}
          >
            {dummyDeployments.map((deployment) => (
              <MenuItem key={deployment} value={deployment}>
                {deployment}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Chat Area */}
        <Box
          sx={{
            flexGrow: 1,
            padding: '20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#fafafa',
            borderBottom: '1px solid #ddd',
            '::-webkit-scrollbar': {
              width: '8px',
            },
            '::-webkit-scrollbar-thumb': {
              backgroundColor: '#ddd',
              borderRadius: '8px',
            },
          }}
          onScroll={() => setShouldScroll(false)}
        >
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: '12px',
              }}
            >
              <Box
                sx={{
                  backgroundColor: msg.sender === 'user' ? '#007aff' : '#e0e0e0',
                  color: msg.sender === 'user' ? '#fff' : '#000',
                  borderRadius: '20px',
                  padding: '14px 20px',
                  maxWidth: '70%',
                  boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
                  wordWrap: 'break-word',
                  fontSize: '16px',
                  fontFamily: "'Roboto', sans-serif",
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              >
                {msg.text}
              </Box>
            </Box>
          ))}
          <div ref={lastMessageRef}></div>
        </Box>

        {/* Message Input Area */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            padding: '15px',
            backgroundColor: '#ffffff',
            borderTop: '1px solid #ddd',
          }}
        >
          <TextField
            inputRef={textareaRef}
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Type a message..."
            value={currentMessage}
            onChange={(e) => {
              setCurrentMessage(e.target.value);
              setShouldScroll(false); // Stop scrolling when typing
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            multiline
            rows={1}
            maxRows={4}
            sx={{
              marginRight: '10px',
              borderRadius: '12px',
              backgroundColor: '#fafafa',
              border: '1px solid #ddd',
              resize: 'none',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                },
              },
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              fontFamily: "'Roboto', sans-serif",
              fontSize: '16px',
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
            sx={{
              backgroundColor: '#007aff',
              color: '#fff',
              padding: '10px 20px',
              boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
              borderRadius: '50px',
              textTransform: 'none',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: '#0067d9',
              },
            }}
          >
            Send
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Playground;
