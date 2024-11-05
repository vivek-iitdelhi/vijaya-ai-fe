import { useState, useEffect } from 'react';
import axios from 'axios';
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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = `${import.meta.env.VITE_HOST_URL}/projects/`;
const DATASET_API_URL = `${import.meta.env.VITE_HOST_URL}/datasets/`;

const getToken = () => {
  return localStorage.getItem('authToken');
};

const fetchProjects = async () => {
  const token = getToken();
  try {
    const projectResponse = await axios.get(API_BASE_URL, {
      headers: {
        Authorization: `Token ${token}`,
        "ngrok-skip-browser-warning": "69420"
      },
    });

    const projects = projectResponse.data;

    // Ensure the response is an array
    if (!Array.isArray(projects)) {
      throw new Error('Expected an array of projects');
    }

    // Fetch datasets for each project and append the dataset count
    const projectsWithDatasetCount = await Promise.all(
      projects.map(async (project) => {
        const datasetResponse = await axios.get(`${DATASET_API_URL}?project_id=${project.project_id}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        return {
          ...project,
          datasetCount: datasetResponse.data.length, // Count of datasets
          trainingJobs: 0, // Dummy value for now
          services: 0, // Dummy value for now
        };
      })
    );

    return projectsWithDatasetCount;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return []; // Return an empty array on error
  }
};

const addProject = async (projectData) => {
  const token = getToken();
  const response = await axios.post(API_BASE_URL, projectData, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};

const removeProject = async (project_id) => {
  const token = getToken();
  await axios.delete(`${API_BASE_URL}${project_id}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export default function ProjectDetailPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newProject, setNewProject] = useState({ project_name: '', description: '' });
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadProjects() {
      setIsLoading(true);
      const data = await fetchProjects();
      setProjects(data);
      setIsLoading(false);
    }
    loadProjects();
  }, []);

  const handleAddProject = async () => {
    const addedProject = await addProject(newProject);
    setProjects([...projects, addedProject]);
    setNewProject({ project_name: '', description: '' });
    setOpenModal(false);
  };

  const handleManageProject = (project_id) => {
    navigate(`/manage/${project_id}`); // Navigate to the DatasetManager with project_id
  };

  const handleDeleteProject = async (project_id) => {
    await removeProject(project_id);
    setProjects((prevProjects) => prevProjects.filter((project) => project.project_id !== project_id));
  };

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <div style={{ margin: '0 19rem', paddingBottom: '500px' }}>
      <Button variant="contained" color="primary" onClick={() => setOpenModal(true)} style={{ marginBottom: '20px' }}>
        Create New Project
      </Button>

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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
        {projects.map((project) => (
          <Card
            key={project.project_id}
            variant="outlined"
            sx={{
              boxSizing: 'border-box',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: '#2196F3',
              color: '#fff',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              height: '350px',
              width: '300px',
              borderRadius: '12px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 4px 15px rgba(255, 255, 0, 0.5)',
              },
            }}
          >
            <CardContent sx={{ padding: '0' }}>
              <div style={{ backgroundColor: '#1565C0', padding: '16px', borderRadius: '8px 8px 0 0', marginBottom: '8px' }}>
                <Typography variant="h6" component="div" gutterBottom style={{ fontWeight: 'bold' }}>
                  {project.project_name}
                </Typography>
              </div>
              <div style={{ backgroundColor: '#1976D2', padding: '12px', borderRadius: '8px', marginBottom: '12px', boxShadow: 'inset 0px 0px 5px rgba(0, 0, 0, 0.1)' }}>
                <Typography variant="body2" color="#fff">
                  {project.description}
                </Typography>
              </div>
              <div style={{ backgroundColor: '#1E88E5', padding: '12px', borderRadius: '8px', marginBottom: '12px' }}>
                <Typography variant="body1" color="#fff" style={{ marginBottom: '4px' }}>
                  Datasets: <strong>{project.datasetCount}</strong>
                </Typography>
                <Typography variant="body1" color="#fff" style={{ marginBottom: '4px' }}>
                  Training Jobs: <strong>{project.trainingJobs}</strong>
                </Typography>
                <Typography variant="body1" color="#fff">
                  Services: <strong>{project.services}</strong>
                </Typography>
              </div>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between' }}>
              <Button
                onClick={() => handleManageProject(project.project_id)}
                size="small"
                sx={{
                  backgroundColor: '#4CAF50',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#45A049',
                  },
                  borderRadius: '20px',
                  padding: '8px 16px',
                }}
              >
                Manage
              </Button>
              <Button
                onClick={() => handleDeleteProject(project.project_id)}
                size="small"
                sx={{
                  backgroundColor: '#F44336',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#D32F2F',
                  },
                  borderRadius: '20px',
                  padding: '8px 16px',
                  marginLeft: '10px',
                }}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}
   