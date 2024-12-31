import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Autocomplete,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import axios from 'axios';

const Status = () => {
  const [embeddingVersion, setEmbeddingVersion] = useState('');
  const [embeddingName, setEmbeddingName] = useState('');
  const [fineTunedProject, setFineTunedProject] = useState('');
  const [llmOption, setLlmOption] = useState('');
  const [generatorName, setGeneratorName] = useState('');
  const [embeddingTableData, setEmbeddingTableData] = useState([]);
  const [fineTunedTableData, setFineTunedTableData] = useState([]);
  const [deploymentsData, setDeploymentsData] = useState([]);

  // LLM options dropdown data
  const llmOptions = ['LLM Model 1', 'LLM Model 2', 'LLM Model 3', 'LLM Model 4', 'LLM Model 5'];

  const apiBaseUrl = import.meta.env.VITE_HOST_URL;
  const token = localStorage.getItem('authToken'); // Assuming auth token is stored in localStorage

  // Fetch Embedding Versions and Fine-Tuned Projects
  useEffect(() => {
    // Fetch Embedding Versions
    axios
      .get(`${apiBaseUrl}/rag/embedding-deployments/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setEmbeddingTableData(response.data);
        setEmbeddingVersion(response.data[0]?.version_name); // Set default version name
      })
      .catch((error) => console.error('Error fetching embedding versions:', error));

    // Fetch Fine-Tuned Projects with Completed Status
    axios
      .get(`${apiBaseUrl}/tuning/trainingjobs/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        const completedProjects = response.data.filter(
          (job) => job.status === 'completed'
        );
        setFineTunedTableData(completedProjects);
      })
      .catch((error) => console.error('Error fetching fine-tuned projects:', error));

    // Fetch Deployments (embedding version deployments)
    axios
      .get(`${apiBaseUrl}/rag/embeddings-deploy/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => setDeploymentsData(response.data))
      .catch((error) => console.error('Error fetching deployments:', error));
  }, [token, apiBaseUrl]);

  const handleDeploy = () => {
    axios
      .post(
        `${apiBaseUrl}/rag/embedding-deployments/POST`, 
        {
          version_name: embeddingVersion,
          embedding_name: embeddingName,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log('Deployment successful', response.data);
        // Optionally, update the deployment table or handle the response
      })
      .catch((error) => {
        console.error('Error deploying embedding:', error);
      });
  };

  return (
    <Box sx={{ padding: '2px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Upper Half Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '120px' }}>
        {/* Left Side */}
        <Box sx={{ width: '35%' }}>
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
            Embeddings Version
          </Typography>

          {/* Embedding Version Dropdown with Search */}
          <Autocomplete
            value={embeddingVersion}
            onChange={(e, newValue) => setEmbeddingVersion(newValue)}
            options={embeddingTableData.map((item) => item.version_name)}
            renderInput={(params) => <TextField {...params} label="Select Embedding Version" />}
            sx={{ marginBottom: '20px' }}
            disableClearable
            ListboxProps={{
              style: { maxHeight: '200px', overflowY: 'auto' },
            }}
          />

          {/* Embedding Name and Deploy Button */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <TextField
              label="Embedding Name"
              variant="outlined"
              value={embeddingName}
              onChange={(e) => setEmbeddingName(e.target.value)}
              fullWidth
              sx={{ marginRight: '10px', maxWidth: '300px' }}
            />
            <Button
              variant="contained"
              onClick={handleDeploy}
              sx={{
                width: '40%',
                borderRadius: '30px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              Deploy
            </Button>
          </Box>
        </Box>

        {/* Right Side - Table */}
        <Box sx={{ width: '60%' }}>
          <Typography variant="h6" gutterBottom>
            Deployments
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              maxHeight: '250px',
              overflowY: 'auto',
              borderRadius: '10px',
              width: '100%',
            }}
          >
            <Table stickyHeader aria-label="deployments table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#3f51b5', color: '#fff' }}>
                    Deployment ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#3f51b5', color: '#fff' }}>
                    Deployment Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#3f51b5', color: '#fff' }}>
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deploymentsData.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell>{data.deploymentId}</TableCell>
                    <TableCell>{data.deploymentName}</TableCell>
                    <TableCell>{data.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* Lower Half Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left Side */}
        <Box sx={{ width: '35%' }}>
          <Typography variant="h6" gutterBottom>
            Link Fine-Tuned Projects
          </Typography>

          {/* Fine-Tuned Project Dropdown */}
          <Autocomplete
            value={fineTunedProject}
            onChange={(e, newValue) => setFineTunedProject(newValue)}
            options={fineTunedTableData.map((item) => item.project_name)}
            renderInput={(params) => <TextField {...params} label="Fine-Tuned Projects" />}
            sx={{ marginBottom: '20px' }}
            disableClearable
            ListboxProps={{
              style: { maxHeight: '200px', overflowY: 'auto' },
            }}
          />

          {/* LLM Dropdown */}
          <Autocomplete
            value={llmOption}
            onChange={(e, newValue) => setLlmOption(newValue)}
            options={llmOptions}
            renderInput={(params) => <TextField {...params} label="Generator LLM" />}
            sx={{ marginBottom: '20px' }}
            disableClearable
            ListboxProps={{
              style: { maxHeight: '200px', overflowY: 'auto' },
            }}
          />

          {/* Generator Name and Deploy button */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <TextField
              label="Generator Name"
              variant="outlined"
              value={generatorName}
              onChange={(e) => setGeneratorName(e.target.value)}
              fullWidth
              sx={{ marginRight: '10px', maxWidth: '300px' }}
            />
            <Button
              variant="contained"
              onClick={handleDeploy}
              sx={{
                width: '48%',
                borderRadius: '30px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              Deploy
            </Button>
          </Box>
        </Box>

        {/* Right Side - Table */}
        <Box sx={{ width: '60%' }}>
          <Typography variant="h6" gutterBottom>
            Fine-Tuned Deployments
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              maxHeight: '245px',
              overflowY: 'auto',
              borderRadius: '10px',
              width: '100%',
            }}
          >
            <Table stickyHeader aria-label="fine-tuned deployments table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#3f51b5', color: '#fff' }}>
                    Deployment ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#3f51b5', color: '#fff' }}>
                    Deployment Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#3f51b5', color: '#fff' }}>
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fineTunedTableData.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell>{data.deploymentId}</TableCell>
                    <TableCell>{data.deploymentName}</TableCell>
                    <TableCell>{data.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Status;
