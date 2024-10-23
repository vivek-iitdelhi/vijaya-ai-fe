import { useState } from 'react';
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const baseModels = [
  { id: 1, name: 'GPT-3' },
  { id: 2, name: 'LLaMA' },
  { id: 3, name: 'ChatGPT' },
  { id: 4, name: 'Claude' },
  { id: 5, name: 'Bard' },
  { id: 6, name: 'Davinci' },
  { id: 7, name: 'Jurassic-1' },
  { id: 8, name: 'Megatron' },
  { id: 9, name: 'OPT' },
  { id: 10, name: 'Bloom' },
];

export default function Status() {
  const [selectedModel, setSelectedModel] = useState(null);
  const [deploymentName, setDeploymentName] = useState('');
  const [deployments, setDeployments] = useState([]);

  const handleModelSelect = (model) => {
    setSelectedModel(model);
  };

  const handleDeploy = () => {
    if (selectedModel && deploymentName) {
      const newDeployment = {
        id: deployments.length + 1,
        name: deploymentName,
        model: selectedModel.name,
        status: 'Pending',
      };
      setDeployments([...deployments, newDeployment]);
      setDeploymentName('');
    } else {
      alert('Please select a model and provide a deployment name.');
    }
  };

  const handleDelete = (id) => {
    setDeployments(deployments.filter((deployment) => deployment.id !== id));
  };

  return (
    <Grid container spacing={2} style={{ padding: '20px', height: '100vh' }}>
      {/* Left Section (Base Models) */}
      <Grid item xs={12} md={3}>
        <Paper
          elevation={3}
          sx={{
            padding: '20px',
            borderRadius: '16px',
            backgroundColor: '#f0f4f8',
            height: '500px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Base Models
          </Typography>

          {/* Scrollable List of Models */}
          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              marginBottom: '20px',
              borderRadius: '12px',
              backgroundColor: '#fff',
              padding: '10px',
            }}
          >
            <List>
              {baseModels.map((model) => (
                <ListItem
                  button
                  key={model.id}
                  onClick={() => handleModelSelect(model)}
                  sx={{
                    backgroundColor: selectedModel?.id === model.id ? '#90caf9' : '#ffffff',
                    marginBottom: '10px',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#e3f2fd',
                    },
                  }}
                >
                  <ListItemText primary={model.name} />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Deployment Name Input */}
          <TextField
            label="Deployment Name"
            fullWidth
            value={deploymentName}
            onChange={(e) => setDeploymentName(e.target.value)}
            sx={{ marginBottom: '20px' }}
          />

          {/* Deploy Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleDeploy}
            sx={{ borderRadius: '12px' }}
          >
            Deploy
          </Button>
        </Paper>
      </Grid>

      {/* Right Section (Deployments Table) */}
      <Grid item xs={12} md={9}>
        <Paper
          elevation={3}
          sx={{
            padding: '20px',
            borderRadius: '16px',
            backgroundColor: '#f9f9f9',
            height: '100%',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Deployments
          </Typography>

          {/* Scrollable Table Container */}
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: '12px',
              maxHeight: '450px', // Set max height to enable scrolling
              overflowY: 'auto',  // Enable vertical scrolling
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Deployment Name</TableCell>
                  <TableCell>Model</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deployments.map((deployment) => (
                  <TableRow key={deployment.id}>
                    <TableCell>{deployment.id}</TableCell>
                    <TableCell>{deployment.name}</TableCell>
                    <TableCell>{deployment.model}</TableCell>
                    <TableCell>{deployment.status}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(deployment.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}
