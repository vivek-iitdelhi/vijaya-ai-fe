import { useState, useEffect, useRef } from 'react';
import { Box, Button, TextField, MenuItem, Select, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Playground = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [deployments, setDeployments] = useState([]);
  const [selectedDeployment, setSelectedDeployment] = useState('');
  const [shouldScroll, setShouldScroll] = useState(true);

  const { project_id } = useParams(); // Get project_id from URL
  const textareaRef = useRef(null);
  const lastMessageRef = useRef(null);

  const url = `${import.meta.env.VITE_HOST_URL}/deployments/`;
  const token = localStorage.getItem('authToken');

  // Fetch deployment models
  const fetchDeployments = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Token ${token}`,
          'ngrok-skip-browser-warning': '69420',
        },
        params: { project_id },
      });

      const successfulDeployments = response.data.filter(
        (deployment) => deployment.status === 'Deployed'
      );
      setDeployments(successfulDeployments);

      if (!successfulDeployments.find((d) => d.instance_name === selectedDeployment)) {
        setSelectedDeployment(successfulDeployments[0]?.instance_name || '');
      }
    } catch (error) {
      console.error('Error fetching deployments:', error);
    }
  };

  useEffect(() => {
    fetchDeployments();
    const interval = setInterval(fetchDeployments, 30000); // Poll every 30 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [project_id]);

  // Handle sending messages
  const handleSendMessage = async () => {
    if (currentMessage.trim() === '') return;

    const newMessages = [...messages, { text: currentMessage, sender: 'user' }];
    setMessages(newMessages);
    setCurrentMessage('');

    try {
      const response = await axios.post(
        url,
        { text: currentMessage },
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const botReply = {
        text: response.data.response || 'Error: No response from server.',
        sender: 'bot',
      };

      setMessages((prevMessages) => [...prevMessages, botReply]);
    } catch {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Error: Failed to fetch response.', sender: 'bot' },
      ]);
    }

    setShouldScroll(true);
  };

  // Handle creating a new chat window
  const handleCreateNewChatWindow = async () => {
    setMessages([]);
    setCurrentMessage('');

    try {
      const response = await axios.post(
        url,
        { text: '!!new_chat' },
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const botResponse = response.data.response || 'New chat created.';

      if (!botResponse.includes('Act like a helpful assistant')) {
        setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: 'bot' }]);
      }
    } catch {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Error: Failed to create new chat.', sender: 'bot' },
      ]);
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
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '70%',
        padding: '20px',
        background: 'linear-gradient(135deg, #f6f9fc, #e9f3fa)',
        fontFamily: 'Arial, sans-serif',
        overflow: 'auto',
      }}
    >
      <Paper
        component={motion.div}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.1, type: 'spring' }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '20px',
          overflow: 'auto',
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
          width: '75%',
          height: '100%',
          maxHeight: 'calc(100vh - 350px)',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          position: 'fixed',
        }}
      >
        <Button
          component={motion.div}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
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
            }}
          >
            {deployments.map((deployment) => (
              <MenuItem key={deployment.deployment_id} value={deployment.instance_name}>
                {deployment.instance_name}
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
          }}
          onScroll={() => setShouldScroll(false)}
        >
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: msg.sender === 'user' ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <Box
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
                    }}
                  >
                    {msg.text}
                  </Box>
                </Box>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={lastMessageRef}></div>
        </Box>

        {/* Message Input Area */}
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
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
            multiline
            rows={1}
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Type a message..."
            sx={{
              flexGrow: 1,
              fontSize: '16px',
              borderRadius: '20px',
              backgroundColor: '#f7f7f7',
              marginRight: '10px',
              padding: '10px 15px',
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
            sx={{
              padding: '10px 20px',
              fontWeight: 'bold',
              borderRadius: '20px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              textTransform: 'none',
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
