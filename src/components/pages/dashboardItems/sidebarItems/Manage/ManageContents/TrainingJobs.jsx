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
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const getToken = () => localStorage.getItem('authToken');
const API_BASE_URL = `${import.meta.env.VITE_HOST_URL}/tuning/basemodels/`;
const API_TRAINING_JOBS_URL = `${import.meta.env.VITE_HOST_URL}/tuning/trainingjobs/`;
const API_DATASETS_URL = `${import.meta.env.VITE_HOST_URL}/tuning/datasets/`;
const API_CREDITS_URL = `${import.meta.env.VITE_HOST_URL}/tuning/credits/`;

export default function TrainingJobs() {
  const { project_id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [baseModels, setBaseModels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [baseModel, setBaseModel] = useState('');
  const [datasetTrain, setDatasetTrain] = useState('');
  const [datasetTest, setDatasetTest] = useState('');
  const [jobName, setJobName] = useState('');
  const [parameters, setParameters] = useState([]);
  const [currentCredits, setCurrentCredits] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch data function
  const fetchData = async () => {
    const token = getToken();
    const headers = {
      Authorization: `Token ${token}`,
      'ngrok-skip-browser-warning': '69420',
    };

    try {
      const [baseModelsRes, jobsRes, datasetsRes, creditsRes] = await Promise.all([
        axios.get(API_BASE_URL, { headers }),
        axios.get(`${API_TRAINING_JOBS_URL}?project_id=${project_id}`, { headers }),
        axios.get(`${API_DATASETS_URL}?project_id=${project_id}`, { headers }),
        axios.get(API_CREDITS_URL, { headers })
      ]);

      setBaseModels(baseModelsRes.data);
      setJobs(jobsRes.data);
      setDatasets(datasetsRes.data);
      setCurrentCredits(creditsRes.data.current_credits);
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Failed to fetch data. Please try again.');
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 30000);

    return () => clearInterval(intervalId);
  }, [project_id]);

  const resetForm = () => {
    setJobName('');
    setBaseModel('');
    setDatasetTrain('');
    setDatasetTest('');
    setParameters([]);
    setIsCreating(false);
    setSubmitDisabled(false);
    setErrorMessage('');
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    resetForm();
  };
  
  const handleCloseModal = () => {
    setOpenModal(false);
    resetForm();
  };

  const handleOpenErrorModal = (message) => {
    setErrorMessage(message);
    setOpenErrorModal(true);
  };

  const handleCloseErrorModal = () => {
    setOpenErrorModal(false);
    setErrorMessage('');
  };

  const handleBaseModelChange = async (event) => {
    const selectedModelId = event.target.value;
    setBaseModel(selectedModelId);

    if (selectedModelId) {
      try {
        const token = getToken();
        const response = await axios.get(`${API_BASE_URL}${selectedModelId}/`, {
          headers: {
            Authorization: `Token ${token}`,
            'ngrok-skip-browser-warning': '69420',
          },
        });

        const rawParameters = response.data.parameters;
        const parsedParameters = rawParameters
          .replace(/OrderedDict\(\[/, '')
          .replace(/\]\)$/, '')
          .split('), (')
          .map(param => {
            const cleanParam = param
              .replace(/^\(/, '')
              .replace(/\)$/, '');
            const [name, value] = cleanParam
              .replace(/[\[\]']/g, '')
              .split(', ');
            return { name: name.trim(), value: value.trim() };
          });

        setParameters(parsedParameters);
      } catch (error) {
        console.error('Error fetching model parameters:', error);
        setParameters([]);
        setErrorMessage('Failed to fetch model parameters');
      }
    } else {
      setParameters([]);
    }
  };

  const handleParameterChange = (index, event) => {
    const updatedParameters = [...parameters];
    updatedParameters[index].value = event.target.value;
    setParameters(updatedParameters);
  };

  const validateForm = () => {
    return jobName && baseModel && datasetTrain && datasetTest;
  };

  const handleCreateJob = async () => {
    if (isCreating || submitDisabled || !validateForm()) return;
    
    setIsCreating(true);
    setSubmitDisabled(true);

    if (currentCredits < 5) {
      handleOpenErrorModal("Insufficient credits to create a new job");
      setIsCreating(false);
      setSubmitDisabled(false);
      return;
    }

    const newJob = {
      training_job_name: jobName,
      status: 'pending',
      model_id: baseModel,
      train_dataset_id: datasetTrain,
      test_dataset_id: datasetTest,
      project_id: project_id,
      parameters: parameters.reduce((acc, param) => {
        acc[param.name] = param.value;
        return acc;
      }, {})
    };

    try {
      const token = getToken();
      const response = await axios.post(API_TRAINING_JOBS_URL, newJob, {
        headers: {
          Authorization: `Token ${token}`,
          'ngrok-skip-browser-warning': '69420',
        }
      });

      if (response.status === 201) {
        await fetchData();
        handleCloseModal();
      }
    } catch (error) {
      console.error('Error creating job:', error);
      handleOpenErrorModal('Failed to create job. Please try again.');
    } finally {
      setIsCreating(false);
      setSubmitDisabled(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const token = getToken();
      await axios.delete(`${API_TRAINING_JOBS_URL}${jobId}/`, {
        headers: {
          Authorization: `Token ${token}`,
          'ngrok-skip-browser-warning': '69420',
        },
      });
      await fetchData();
    } catch (error) {
      console.error('Error deleting job:', error);
      setErrorMessage('Failed to delete job');
    }
  };

  const filteredJobs = jobs.filter(job => 
    job.training_job_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#ffffff', minHeight: '100vh' }}>
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

      <TableContainer component={Paper} sx={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', maxHeight: '620px', overflowY: 'auto' }}>
        <Table stickyHeader aria-label="training jobs table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#3f51b5', color: '#fff' }}>Job Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#3f51b5', color: '#fff' }}>Base Model</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#3f51b5', color: '#fff' }}>Train Dataset</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#3f51b5', color: '#fff' }}>Test Dataset</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#3f51b5', color: '#fff' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#3f51b5', color: '#fff' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredJobs
              .filter((job) => job.status !== 'terminating')
              .map((job, index) => (
                <TableRow key={index}>
                  <TableCell>{job.training_job_name}</TableCell>
                  <TableCell>{job.model_name}</TableCell>
                  <TableCell>{job.train_dataset_name}</TableCell>
                  <TableCell>{job.test_dataset_name}</TableCell>
                  <TableCell>{job.status}</TableCell>
                  <TableCell>
                    <IconButton
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteJob(job.training_job_id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create Job Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            width: 600,
            margin: 'auto',
            marginTop: '100px',
            padding: '30px',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0px 5px 15px rgba(0,0,0,0.3)',
            position: 'relative',
          }}
        >
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'gray',
            }}
          >
            <CloseIcon />
          </IconButton>

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
            <InputLabel id="train-dataset-select-label">Train Dataset</InputLabel>
            <Select
              labelId="train-dataset-select-label"
              id="train-dataset-select"
              value={datasetTrain}
              label="Train Dataset"
              onChange={(e) => setDatasetTrain(e.target.value)}
            >
              {datasets.map((dataset) => (
                <MenuItem key={dataset.dataset_id} value={dataset.dataset_id}>
                  {dataset.dataset_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="test-dataset-select-label">Test Dataset</InputLabel>
            <Select
              labelId="test-dataset-select-label"
              id="test-dataset-select"
              value={datasetTest}
              label="Test Dataset"
              onChange={(e) => setDatasetTest(e.target.value)}
            >
              {datasets.map((dataset) => (
                <MenuItem key={dataset.dataset_id} value={dataset.dataset_id}>
                  {dataset.dataset_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '10px',
                marginTop: '20px',
              }}
            >
              {Array.isArray(parameters) &&
                parameters.map((param, index) => (
                  <TextField
                    key={index}
                    label={param.name}
                    value={param.value || ''}
                    onChange={(e) => handleParameterChange(index, e)}
                    fullWidth
                  />
                ))}
            </Box>
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={handleCreateJob}
            disabled={isCreating || submitDisabled || !validateForm()}
            sx={{
              marginTop: '20px',
              borderRadius: '20px',
              opacity: (isCreating || submitDisabled || !validateForm()) ? 0.7 : 1
            }}
          >
            {isCreating ? 'Creating...' : 'Create Job'}
          </Button>
        </Box>
      </Modal>

      {/* Error Modal */}
      <Modal open={openErrorModal} onClose={handleCloseErrorModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: 24,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: '20px', color: '#d32f2f' }}>
            {errorMessage || "You don't have enough credits to create a new job!"}
          </Typography>
          {currentCredits < 5 && (
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: '100%',
                borderRadius: '20px',
                padding: '10px',
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#115293',
                },
              }}
              href="https://calendly.com/vivek-vijaya/30min"
              target="_blank"
            >
              Add Credits
            </Button>
          )}
          <Button
            variant="outlined"
            onClick={handleCloseErrorModal}
            sx={{
              width: '100%',
              borderRadius: '20px',
              padding: '10px',
              marginTop: '10px',
            }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
