import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useParams } from 'react-router-dom';

const getToken = () => localStorage.getItem('authToken');
const API_BASE_URL = `${import.meta.env.VITE_HOST_URL}/basemodels/`;
const API_TRAINING_JOBS_URL = `${import.meta.env.VITE_HOST_URL}/trainingjobs/`;
const API_DATASETS_URL = `${import.meta.env.VITE_HOST_URL}/datasets/`;

export default function TrainingJobs() {
  const { project_id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [baseModels, setBaseModels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [baseModel, setBaseModel] = useState('');
  const [datasetTrain, setDatasetTrain] = useState('');
  const [datasetTest, setDatasetTest] = useState('');
  const [jobName, setJobName] = useState('');

  useEffect(() => {
    const fetchBaseModels = async () => {
      try {
        const token = getToken();
        const response = await axios.get(API_BASE_URL, {
          headers: {
            Authorization: `Token ${token}`,
            "ngrok-skip-browser-warning": "69420"
          },
        });
        setBaseModels(response.data);
      } catch (error) {
        console.error('Error fetching base models:', error);
      }
    };

    const fetchTrainingJobs = async () => {
      try {
        const token = getToken();
        const response = await axios.get(`${API_TRAINING_JOBS_URL}?project_id=${project_id}`, {
          headers: {
            Authorization: `Token ${token}`,
            "ngrok-skip-browser-warning": "69420"
          },
        });
        console.log('Training Jobs:', response.data);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching training jobs:', error);
      }
    };

    const fetchDatasets = async () => {
      try {
        const token = getToken();
        const response = await axios.get(`${API_DATASETS_URL}?project_id=${project_id}`, {
          headers: {
            Authorization: `Token ${token}`,
            "ngrok-skip-browser-warning": "69420"
          },
        });
        setDatasets(response.data);
      } catch (error) {
        console.error('Error fetching datasets:', error);
      }
    };

    fetchBaseModels();
    fetchTrainingJobs();
    fetchDatasets();

    const intervalId = setInterval(fetchTrainingJobs, 30000); // Refresh every 30 seconds

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [project_id]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleBaseModelChange = (event) => setBaseModel(event.target.value);
  const handleDatasetTrainChange = (event) => setDatasetTrain(event.target.value);
  const handleDatasetTestChange = (event) => setDatasetTest(event.target.value);

  const filteredJobs = jobs.filter((job) =>
    job.training_job_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateJob = async () => {
    const newJob = {
      training_job_name: jobName,
      status: 'pending',
      model_id: baseModel,
      dataset_id: datasetTrain,
      project_id: project_id,
    };

    try {
      const token = getToken();
      const response = await axios.post(API_TRAINING_JOBS_URL, newJob, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      setJobs((prevJobs) => [...prevJobs, response.data]);
      handleCloseModal();
      setJobName('');
      setBaseModel('');
      setDatasetTrain('');
      setDatasetTest('');
    } catch (error) {
      console.error('Error creating new training job:', error);
    }
  };

  return (
    <Box
      sx={{
        padding: '20px',
        backgroundColor: '#ffffff',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            width: '30%',
            backgroundColor: '#fff',
            borderRadius: '4px',
          }}
        />

        <Button
          variant="contained"
          onClick={handleOpenModal}
          sx={{
            borderRadius: '20px',
            padding: '10px 20px',
            '&:hover': {
              backgroundColor: '#5a2387',
            },
          }}
        >
          Create New Training Job
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Table stickyHeader aria-label="training jobs table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#3f51b5', color: '#fff' }}>
                Job Name
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#3f51b5', color: '#fff' }}>
                Base Model
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#3f51b5', color: '#fff' }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredJobs.map((job, index) => (
              <TableRow key={index}>
                <TableCell>{job.training_job_name}</TableCell>
                <TableCell>{job.model_name}</TableCell>
                <TableCell>{job.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            width: 400,
            margin: 'auto',
            marginTop: '100px',
            padding: '30px',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0px 5px 15px rgba(0,0,0,0.3)',
          }}
        >
          <Typography id="modal-title" variant="h6" gutterBottom>
            Create New Training Job
          </Typography>
          <TextField
            label="Job Name"
            fullWidth
            margin="normal"
            value={jobName}
            onChange={(e) => setJobName(e.target.value)}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="base-model-select-label">Base Model</InputLabel>
            <Select
              labelId="base-model-select-label"
              id="base-model-select"
              value={baseModel}
              label="Base Model"
              onChange={handleBaseModelChange}
            >
              {baseModels.map((model) => (
                <MenuItem key={model.model_id} value={model.model_id}>
                  {model.model_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="train-dataset-select-label">Training Dataset</InputLabel>
            <Select
              labelId="train-dataset-select-label"
              id="train-dataset-select"
              value={datasetTrain}
              label="Training Dataset"
              onChange={handleDatasetTrainChange}
            >
              {datasets.map((dataset) => (
                <MenuItem key={dataset.dataset_id} value={dataset.dataset_id}>
                  {dataset.dataset_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="test-dataset-select-label">Testing Dataset</InputLabel>
            <Select
              labelId="test-dataset-select-label"
              id="test-dataset-select"
              value={datasetTest}
              label="Testing Dataset"
              onChange={handleDatasetTestChange}
            >
              {datasets.map((dataset) => (
                <MenuItem key={dataset.dataset_id} value={dataset.dataset_id}>
                  {dataset.dataset_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCreateJob}
            sx={{ marginTop: '20px' }}
          >
            Create Job
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
