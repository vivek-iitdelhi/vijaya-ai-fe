import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, UploadFile as UploadFileIcon } from '@mui/icons-material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const API_BASE_URL = `${import.meta.env.VITE_HOST_URL}/datasets/`;
const getToken = () => localStorage.getItem('authToken');

const isValidFileType = (file) => {
  const validExtensions = ['.csv', '.json', '.jsonl'];
  const fileExtension = file.name.split('.').pop().toLowerCase();
  return validExtensions.includes(`.${fileExtension}`);
};

const DatasetContent = () => {
  const { project_id } = useParams();
  const [datasets, setDatasets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newDatasetName, setNewDatasetName] = useState('');
  const [file, setFile] = useState(null);

  const fetchDatasets = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = getToken();
      const response = await axios.get(`${API_BASE_URL}?project_id=${project_id}`, {
        headers: {
          Authorization: `Token ${token}`,
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

  const addDataset = async () => {
    if (!newDatasetName || !file) {
      alert('Please provide a dataset name and select a file.');
      return;
    }

    try {
      const token = getToken();
      const formData = new FormData();
      formData.append('project_id', project_id);
      formData.append('dataset_name', newDatasetName);
      formData.append('file', file);

      const response = await axios.post(API_BASE_URL, formData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      setDatasets([...datasets, response.data]);
      setIsDialogOpen(false);
      setNewDatasetName('');
      setFile(null);
    } catch (error) {
      console.error('Error adding dataset:', error?.response?.data || error.message);
      alert('Failed to add dataset. Please try again.');
    }
  };

  const removeDataset = async (dataset_id) => {
    try {
      const token = getToken();
      const response = await axios.delete(`${API_BASE_URL}${dataset_id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.status === 204) {
        setDatasets((prevDatasets) => prevDatasets.filter((dataset) => dataset.dataset_id !== dataset_id));
        alert('Dataset removed successfully.');
      } else {
        alert('Unexpected response while deleting dataset.');
      }
    } catch (error) {
      console.error('Error removing dataset:', error?.response?.data || error.message);
      alert('Failed to remove dataset. Please try again.');
    }
  };

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
        }}
      >
        Add Dataset
      </Button>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Dataset</DialogTitle>
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
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {file && <Typography sx={{ marginTop: '10px', fontWeight: 'bold' }}>{file.name}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button onClick={addDataset}>Add</Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper} sx={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
  <Table sx={{ minWidth: 650 }} aria-label="datasets table">
    <TableHead>
      <TableRow>
        <TableCell
          sx={{
            fontWeight: 'bold',
            backgroundColor: '#3f51b5', // Similar dark blue color to the TrainingJobs table header
            color: '#fff',
            textAlign: 'center',
          }}
        >
          Dataset Name
        </TableCell>
        <TableCell
          sx={{
            fontWeight: 'bold',
            backgroundColor: '#3f51b5',
            color: '#fff',
            textAlign: 'center',
          }}
        >
          Path
        </TableCell>
        <TableCell
          sx={{
            fontWeight: 'bold',
            backgroundColor: '#3f51b5',
            color: '#fff',
            textAlign: 'center',
          }}
        >
          Actions
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {datasets.map((dataset) => (
        <TableRow key={dataset.dataset_id} sx={{ backgroundColor: dataset.index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
          <TableCell sx={{ textAlign: 'center' }}>{dataset.dataset_name}</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>{dataset.gcp_path}</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>
            <IconButton
              onClick={() => removeDataset(dataset.dataset_id)}
              sx={{ color: '#E53935', '&:hover': { backgroundColor: '#FFEBEE' } }}
            >
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

    </Box>
  );
};

DatasetContent.propTypes = {
  project_id: PropTypes.string,
};

export default DatasetContent;
