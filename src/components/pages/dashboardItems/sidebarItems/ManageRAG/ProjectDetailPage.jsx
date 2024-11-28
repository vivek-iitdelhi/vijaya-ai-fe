import { useState } from 'react';
import {
  Button,
  TextField,
  LinearProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ProjectDetailPageRAG() {
  const [projects, setProjects] = useState([
    {
      project_id: 1,
      project_name: "RAG Project 1",
      description: "A sample RAG project description",
      datasetCount: 5,
      trainingJobs: 2,
      services: 1,
    },
    {
      project_id: 2,
      project_name: "RAG Project 2",
      description: "Another RAG project description",
      datasetCount: 3,
      trainingJobs: 1,
      services: 2,
    },
    {
        project_id: 2,
        project_name: "RAG Project 2",
        description: "Another RAG project description",
        datasetCount: 3,
        trainingJobs: 1,
        services: 2,
      },
      {
        project_id: 2,
        project_name: "RAG Project 2",
        description: "Another RAG project description",
        datasetCount: 3,
        trainingJobs: 1,
        services: 2,
      },
      {
        project_id: 2,
        project_name: "RAG Project 2",
        description: "Another RAG project description",
        datasetCount: 3,
        trainingJobs: 1,
        services: 2,
      },
      
  ]);
  const [newProject, setNewProject] = useState({ project_name: '', description: '' });
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleAddProject = () => {
    const newId = projects.length + 1;
    const addedProject = { ...newProject, project_id: newId, datasetCount: 0, trainingJobs: 0, services: 0 };
    setProjects([...projects, addedProject]);
    setNewProject({ project_name: '', description: '' });
    setOpenModal(false);
  };

  const handleManageProject = (project_id) => {
    navigate(`/rag/manage/${project_id}`);
  };

  const handleDeleteProject = (project_id) => {
    setProjects((prevProjects) => prevProjects.filter((project) => project.project_id !== project_id));
  };

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <>
      {/* Sticky container for header */}
      <Box sx={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: 'white', width: '100%' }}>
        {/* Main title */}
        <Box sx={{ padding: '5px 8px', borderBottom: '1px solid #ddd' }}>
          <Typography variant="h4" component="h1">
            RAG Dashboard
          </Typography>
        </Box>

        {/* Sticky header for project section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 900,
            backgroundColor: '#fff',
            padding: '16px 0',
            borderBottom: '1px solid #ddd',
          }}
        >
          <Typography variant="h5" component="h2">
            My Projects
          </Typography>
          <Button style={{ borderRadius: '1rem' }} variant="contained" color="primary" onClick={() => setOpenModal(true)}>
            Create New Project
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          padding: '16px',
          height: 'calc(100vh - 180px)', // Adjust height based on header height
          overflowY: 'auto',
          backgroundColor: '#fafafa',
        }}
      >
        {/* Modal for adding a new project */}
        <Dialog open={openModal} onClose={() => setOpenModal(false)}>
          <DialogTitle>Add New Project</DialogTitle>
          <DialogContent>
            <TextField
              label="Project Name"
              fullWidth
              value={newProject.project_name}
              onChange={(e) => setNewProject({ ...newProject, project_name: e.target.value })}
              style={{ marginBottom: '10px' }}
            />
            <TextField
              label="Project Description"
              fullWidth
              multiline
              rows={2}
              value={newProject.description}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 20) {
                  setNewProject({ ...newProject, description: value });
                }
              }}
              inputProps={{ maxLength: 20 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleAddProject}>
              Add Project
            </Button>
          </DialogActions>
        </Dialog>

        {/* Scrollable projects grid */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(4, 1fr)"
          gap="20px"
          sx={{
            padding: '16px',
            maxHeight: '100%', // Take full available height
            overflowY: 'auto', // Enable scrolling for the grid
            backgroundColor: 'white',
            borderRadius: '8px',
            '@media (max-width: 1200px)': {
              gridTemplateColumns: 'repeat(3, 1fr)', // 3 columns on medium screens
            },
            '@media (max-width: 900px)': {
              gridTemplateColumns: 'repeat(2, 1fr)', // 2 columns on smaller screens
            },
            '@media (max-width: 600px)': {
              gridTemplateColumns: '1fr', // Single column on mobile screens
            },
          }}
        >
          {projects.length === 0 ? (
            <Card
              variant="outlined"
              sx={{
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                height: '200px',
                backgroundColor: '#f0f0f0',
                overflow:'auto'
              }}
            >
              <Typography variant="h6" color="textSecondary">
               Create your 1st project
              </Typography>
            </Card>
          ) : (projects.map((project) => (
            <Card
              key={project.project_id}
              variant="outlined"
              sx={{
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#2196F3',
                color: '#fff',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                height: '350px',
                width: '100%',
                borderRadius: '12px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 4px 15px rgba(255, 255, 0, 0.5)',
                },
                '@media (max-width: 600px)': {
                  height: 'auto', // Allow card to adjust height on mobile
                },
              }}
            >
              <CardContent sx={{ padding: '0' }}>
                <div style={{ backgroundColor: '#1565C0', padding: '16px', borderRadius: '8px 8px 0 0', marginBottom: '8px' }}>
                  <Typography variant="h6" component="div" gutterBottom style={{ fontWeight: 'bold' }}>
                    {project.project_name}
                  </Typography>
                </div>
                <div
                  style={{
                    backgroundColor: '#1976D2',
                    padding: '12px',
                    borderRadius: '8px',
                    marginBottom: '12px',
                    boxShadow: 'inset 0px 0px 5px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Typography variant="body2" color="#fff">
                    {project.description}
                  </Typography>
                </div>
                <div
                  style={{
                    backgroundColor: '#1E88E5',
                    padding: '12px',
                    borderRadius: '8px',
                    marginBottom: '12px',
                  }}
                >
                  <Typography variant="body1" color="#fff" style={{ marginBottom: '4px' }}>
                    Datasets: <strong>{project.datasetCount}</strong>
                  </Typography>
                  <Typography variant="body1" color="#fff" style={{ marginBottom: '4px' }}>
                    Training Jobs: <strong>{project.trainingJobs}</strong>
                  </Typography>
                  <Typography variant="body1" color="#fff" style={{ marginBottom: '4px' }}>
                    Services: <strong>{project.services}</strong>
                  </Typography>
                </div>
              </CardContent>
              <CardActions sx={{gap:'50px'}}>
                  <Button
                    size="small"
                    color="success"
                    sx={{
                      backgroundColor: 'green', 
                      color: '#fff', 
                      '&:hover': {
                        backgroundColor: '#81c784', // Lighter green on hover
                      },
                      borderRadius: '20px', // Rounded corners
                      padding: '6px 16px', // Adjust padding for better button size
                    }}
                    onClick={() => handleManageProject(project.project_id)}
                  >
                    Manage
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    sx={{
                      backgroundColor: 'red', 
                      color: '#fff', // White text
                      '&:hover': {
                        backgroundColor: '#ef5350', // Lighter red on hover
                      },
                      borderRadius: '20px', // Rounded corners
                      padding: '6px 16px', // Adjust padding for better button size
                    }}
                    onClick={() => handleDeleteProject(project.project_id)}
                  >
                    Delete
                  </Button>
                </CardActions>

            </Card>
          )))}
        </Box>
      </Box>
    </>
  );
}
