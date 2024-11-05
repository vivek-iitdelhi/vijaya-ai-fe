import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, UploadFile as UploadFileIcon } from '@mui/icons-material';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // To capture the project_id from the URL

const API_BASE_URL = `${import.meta.env.VITE_HOST_URL}/datasets/`;
const getToken = () => localStorage.getItem('authToken');

// Function to check file extension
const isValidFileType = (file) => {
  const validExtensions = ['.csv', '.json', '.jsonl'];
  const fileExtension = file.name.split('.').pop().toLowerCase();
  return validExtensions.includes(`.${fileExtension}`);
};

const DatasetContent = () => {
  const { project_id } = useParams(); // Extract project_id from the route parameters
  const [datasets, setDatasets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newDatasetName, setNewDatasetName] = useState('');
  const [file, setFile] = useState(null);

  // Fetch datasets based on project_id
  const fetchDatasets = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = getToken();
      const response = await axios.get(`${API_BASE_URL}?project_id=${project_id}`, {
        headers: {
          Authorization: `Token ${token}`,
          "ngrok-skip-browser-warning": "69420"
        },
      });
      setDatasets(response.data);
    } catch (error) {
      console.error('Error fetching datasets:', error?.response?.data || error.message);
      alert('Failed to fetch datasets. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [project_id]);

  useEffect(() => {
    fetchDatasets();
  }, [fetchDatasets]);

  // Add a new dataset
  const addDataset = async () => {
    if (!newDatasetName || !file) {
      alert('Please provide a dataset name and select a file.');
      return;
    }

    try {
      const token = getToken();
      const formData = new FormData();
      formData.append('project_id', project_id); // Use the project_id from params
      formData.append('dataset_name', newDatasetName);
      formData.append('file', file);

      const response = await axios.post(API_BASE_URL, formData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      console.log('Dataset added successfully:', response.data);
      setDatasets([...datasets, response.data]); // Add new dataset to the existing list
      setIsDialogOpen(false);
      setNewDatasetName('');
      setFile(null);
    } catch (error) {
      console.error('Error adding dataset:', error?.response?.data || error.message);
      alert('Failed to add dataset. Please try again.');
    }
  };

  // Remove dataset
  const removeDataset = async (dataset_id) => {
    try {
      const token = getToken();
      const response = await axios.delete(`${API_BASE_URL}${dataset_id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(dataset_id);
      

      // Check if the response status is 204
      if (response.status === 204) {
        setDatasets((prevDatasets) => prevDatasets.filter((dataset) => dataset.dataset_id !== dataset_id)); // Filter based on dataset_id
        alert('Dataset removed successfully.');
      } else {
        alert('Unexpected response while deleting dataset.');
      }
    } catch (error) {
      console.error('Error removing dataset:', error?.response?.data || error.message);
      alert('Failed to remove dataset. Please try again.');
    }
  };

  // Handle file selection with validation
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && isValidFileType(selectedFile)) {
      setFile(selectedFile);
    } else {
      alert('Invalid file type. Please upload a .csv, .json, or .jsonl file.');
      setFile(null);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setIsDialogOpen(true)}
        sx={{
          marginBottom: '20px',
          backgroundColor: '#1E88E5',
          borderRadius: '10px',
          padding: '10px 20px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            backgroundColor: '#1565C0',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        Add Dataset
      </Button>

      {/* Add Dataset Dialog */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ backgroundColor: '#1565C0', color: 'white' }}>Add New Dataset</DialogTitle>
        <DialogContent>
          <TextField
            label="Dataset Name"
            fullWidth
            value={newDatasetName}
            onChange={(e) => setNewDatasetName(e.target.value)}
            sx={{ marginBottom: '20px' }}
          />
          <Button variant="contained" component="label" startIcon={<UploadFileIcon />}>
            Upload File
            <input
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          {file && <Typography sx={{ marginTop: '10px', fontWeight: 'bold' }}>{file.name}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsDialogOpen(false)}
            sx={{
              backgroundColor: '#E53935',
              color: 'white',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
              padding: '10px 20px',
              '&:hover': {
                backgroundColor: '#D32F2F',
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={addDataset}
            sx={{
              backgroundColor: '#1E88E5',
              color: 'white',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
              padding: '10px 20px',
              '&:hover': {
                backgroundColor: '#1565C0',
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
              },
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Display existing datasets */}
      {datasets.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No datasets found for this project.
        </Typography>
      ) : (
        datasets.map((dataset) => (
          <Card key={dataset.dataset_id} sx={{ marginBottom: '20px', boxShadow: 3, borderRadius: '10px', transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h6" sx={{ paddingTop: '5px', fontWeight: 'bold' }}>{dataset.dataset_name}</Typography>
                <Typography variant="body2" color="textSecondary">Project ID: {dataset.project_id}</Typography>
              </Box>
              <IconButton
                onClick={() => removeDataset(dataset.dataset_id)}
                sx={{ color: '#E53935', '&:hover': { backgroundColor: '#FFEBEE' } }}
              >
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

// Prop types for validation
DatasetContent.propTypes = {
  project_id: PropTypes.string,
};

export default DatasetContent;
