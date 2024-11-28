import { useState } from 'react';
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

const DatasetContentRAG = () => {
  const [datasets, setDatasets] = useState([
    { dataset_id: 1, dataset_name: 'Sample Dataset 1', gcp_path: 'path/to/dataset1' },
    { dataset_id: 2, dataset_name: 'Sample Dataset 2', gcp_path: 'path/to/dataset2' },
    { dataset_id: 3, dataset_name: 'Sample Dataset 3', gcp_path: 'path/to/dataset3' },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newDatasetName, setNewDatasetName] = useState('');
  const [file, setFile] = useState(null);

  const addDataset = () => {
    if (!newDatasetName || !file) {
      alert('Please provide a dataset name and select a file.');
      return;
    }

    const newDataset = {
      dataset_id: datasets.length + 1,
      dataset_name: newDatasetName,
      gcp_path: `path/to/${file.name}`,
    };

    setDatasets([...datasets, newDataset]);
    setIsDialogOpen(false);
    setNewDatasetName('');
    setFile(null);
  };

  const removeDataset = (dataset_id) => {
    setDatasets((prevDatasets) => prevDatasets.filter((dataset) => dataset.dataset_id !== dataset_id));
    alert('Dataset removed successfully.');
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const validExtensions = ['.csv', '.json', '.jsonl'];
    const fileExtension = selectedFile?.name.split('.').pop().toLowerCase();

    if (selectedFile && validExtensions.includes(`.${fileExtension}`)) {
      setFile(selectedFile);
    } else {
      alert('Invalid file type. Please upload a .csv, .json, or .jsonl file.');
      setFile(null);
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setIsDialogOpen(true)}
        sx={{ marginBottom: '10px' }}
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

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          marginTop: '20px',
          maxHeight: '620px',
          overflowY: 'auto',
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="datasets table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  backgroundColor: '#3f51b5',
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
            {datasets.map((dataset, index) => (
              <TableRow key={dataset.dataset_id} sx={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
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

export default DatasetContentRAG;
