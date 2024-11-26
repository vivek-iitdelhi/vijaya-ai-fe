import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams for route params
import axios from 'axios';
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

const BASE_MODEL_API = `${import.meta.env.VITE_HOST_URL}/basemodels/`;
const DEPLOYMENT_API = `${import.meta.env.VITE_HOST_URL}/deployments/`;

export default function Status() {
  const { project_id } = useParams(); 
  const [selectedModel, setSelectedModel] = useState(null);
  const [deploymentName, setDeploymentName] = useState('');
  const [deployments, setDeployments] = useState([]);
  const [baseModels, setBaseModels] = useState([]);
  const [loading, setLoading] = useState(true);

  const getToken = () => localStorage.getItem('authToken');

  useEffect(() => {
    const fetchBaseModels = async () => {
      try {
        const token = getToken();
        const response = await axios.get(BASE_MODEL_API, {
          headers: {
            Authorization: `Token ${token}`,
            'ngrok-skip-browser-warning': '69420',
          },
        });
        setBaseModels(response.data);
      } catch (error) {
        console.error('Error fetching base models:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBaseModels();
  }, []);

  const fetchDeployments = async () => {
    try {
      const token = getToken();
      const response = await axios.get(DEPLOYMENT_API, {
        headers: {
          Authorization: `Token ${token}`,
        },
        params: { project_id }, // Use project_id from params
      });
      setDeployments(response.data);
    } catch (error) {
      console.error('Error fetching deployments:', error);
    }
  };

  useEffect(() => {
    fetchDeployments();
    const interval = setInterval(fetchDeployments, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, [project_id]); // Re-fetch when project_id changes

  const handleModelSelect = (model) => {
    setSelectedModel(model);
  };

  const handleDeploy = async () => {
    if (selectedModel && deploymentName) {
      try {
        const token = getToken();
        const payload = {
          project_id, // project_id from params
          model_id: selectedModel.model_id,
          deployment_name: deploymentName,
          instance_name: `instance-${deploymentName}`,
        };
        await axios.post(DEPLOYMENT_API, payload, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        alert('Deployment initiated successfully!');
        setDeploymentName('');
        fetchDeployments(); // Refresh the deployments list
      } catch (error) {
        console.error('Error deploying model:', error);
        alert('Failed to deploy the model. Please try again.');
      }
    } else {
      alert('Please select a model and provide a deployment name.');
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeployments(deployments.filter((deployment) => deployment.deployment_id !== id));
    } catch (error) {
      console.error('Error deleting deployment:', error);
    }
  };

  return (
    <Grid container spacing={2} style={{ padding: '20px', height: '100vh' }}>
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
            {loading ? (
              <Typography>Loading base models...</Typography>
            ) : (
              <List>
                {baseModels.map((model) => (
                  <ListItem
                    button
                    key={model.model_id}
                    onClick={() => handleModelSelect(model)}
                    sx={{
                      backgroundColor: selectedModel?.model_id === model.model_id ? '#90caf9' : '#ffffff',
                      marginBottom: '10px',
                      borderRadius: '8px',
                      '&:hover': {
                        backgroundColor: '#e3f2fd',
                      },
                    }}
                  >
                    <ListItemText primary={model.model_name} />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
          <TextField
            label="Deployment Name"
            fullWidth
            value={deploymentName}
            onChange={(e) => setDeploymentName(e.target.value)}
            sx={{ marginBottom: '20px' }}
          />
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
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: '12px',
              maxHeight: '450px',
              overflowY: 'auto',
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Instance Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deployments.map((deployment) => (
                  <TableRow key={deployment.deployment_id}>
                    <TableCell>{deployment.deployment_id}</TableCell>
                    <TableCell>{deployment.instance_name}</TableCell>
                    <TableCell>{deployment.status}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(deployment.deployment_id)}
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
