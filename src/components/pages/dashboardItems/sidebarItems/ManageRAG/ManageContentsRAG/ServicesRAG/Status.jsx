import React, { useState } from 'react';
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

const Status = () => {
  const [embeddingVersion, setEmbeddingVersion] = useState('');
  const [embeddingName, setEmbeddingName] = useState('');
  const [fineTunedProject, setFineTunedProject] = useState('');
  const [llmOption, setLlmOption] = useState('');
  const [generatorName, setGeneratorName] = useState('');

  // Dummy data for dropdowns
  const embeddingsVersions = ['1', '2', '3', '4', '5'];
  const fineTunedProjects = ['Project A', 'Project B', 'Project C', 'Project D', 'Project E'];
  const llmOptions = ['LLM Model 1', 'LLM Model 2', 'LLM Model 3', 'LLM Model 4', 'LLM Model 5'];

  const embeddingTableData = [
    { id: 1, deploymentId: 'D-001', deploymentName: 'Deployment 1', status: 'Active' },
    { id: 2, deploymentId: 'D-002', deploymentName: 'Deployment 2', status: 'Pending' },
    { id: 3, deploymentId: 'D-003', deploymentName: 'Deployment 3', status: 'Completed' },
    { id: 4, deploymentId: 'D-004', deploymentName: 'Deployment 4', status: 'Failed' },
    { id: 5, deploymentId: 'D-005', deploymentName: 'Deployment 5', status: 'Active' },
  ];

  const fineTunedTableData = [
    { id: 1, deploymentId: 'D-006', deploymentName: 'FineTuned Deployment 1', status: 'Completed' },
    { id: 2, deploymentId: 'D-007', deploymentName: 'FineTuned Deployment 2', status: 'In Progress' },
    { id: 3, deploymentId: 'D-008', deploymentName: 'FineTuned Deployment 3', status: 'Active' },
    { id: 4, deploymentId: 'D-009', deploymentName: 'FineTuned Deployment 4', status: 'Pending' },
  ];

  const handleDeploy = () => {
    console.log('Deploying...');
    // Add deploy logic here
  };

  return (
    <Box sx={{ padding: '2px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Upper Half Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        {/* Left Side */}
        <Box sx={{ width: '35%' }}>
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
            Embeddings Version
          </Typography>

          {/* Embedding Version Dropdown with Search */}
          <Autocomplete
            value={embeddingVersion}
            onChange={(e, newValue) => setEmbeddingVersion(newValue)}
            options={embeddingsVersions}
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
                {embeddingTableData.map((data) => (
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
            options={fineTunedProjects}
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
            renderInput={(params) => <TextField {...params} label="Generator LLM " />}
            sx={{ marginBottom: '20px' }}
            disableClearable
            ListboxProps={{
              style: { maxHeight: '200px', overflowY: 'auto' },
            }}
          />

          {/* Deployment Name and Deploy button */}
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
