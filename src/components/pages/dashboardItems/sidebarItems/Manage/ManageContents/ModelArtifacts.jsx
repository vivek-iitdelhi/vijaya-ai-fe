import { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams for capturing URL params

const API_MODEL_ARTIFACTS = `${import.meta.env.VITE_HOST_URL}/modelartifacts/`;
const API_DEPLOY = `${import.meta.env.VITE_HOST_URL}/deploy/`;

const ModelArtifactsTable = () => {
  const { project_id } = useParams(); // Get project_id from the URL
  const [searchQuery, setSearchQuery] = useState("");
  const [modelArtifacts, setModelArtifacts] = useState([]);

  // Get the token from local storage (or where it's stored)
  const token = localStorage.getItem("authToken");

  // Fetch model artifacts data from the API using project_id
  useEffect(() => {
    const fetchModelArtifacts = async () => {
      try {
        const response = await axios.get(`${API_MODEL_ARTIFACTS}?project_id=${project_id}`, {
          headers: {
            Authorization: `Token ${token}`, // Include the token in the headers
            "ngrok-skip-browser-warning": "69420", // Include the ngrok header
          },
        });
        setModelArtifacts(response.data);
      } catch (error) {
        console.error("Error fetching model artifacts:", error);
      }
    };

    if (project_id) {
      fetchModelArtifacts();
    }
  }, [project_id, token]); // Make sure to include token in dependencies

  const handleDeploy = async (jobId, modelId, instanceName) => {
    try {
      const response = await axios.post(
        API_DEPLOY,
        {
          project_id, // Use the project_id from the URL
          model_id: modelId,
          instance_name: instanceName,
        },
        {
          headers: {
            Authorization: `Token ${token}`, // Include the token in the headers
            "ngrok-skip-browser-warning": "69420", // Include the ngrok header
          }
        }
      );
      alert(`Deployment started for ${jobId}`);
      console.log("Deployment Response:", response.data);
    } catch (error) {
      console.error("Error deploying model:", error);
    }
  };

  const handleDownload = (artifactName) => {
    const confirmation = window.confirm(
      `Are you sure you want to download ${artifactName}?`
    );
    if (confirmation) {
      const fileContent = `Artifact Name: ${artifactName}`;
      const blob = new Blob([fileContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${artifactName}.txt`;
      link.click();

      URL.revokeObjectURL(url);
    }
  };

  const filteredData = modelArtifacts.filter((row) =>
    row.Artifact_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
        padding: "20px", // Add padding for better alignment
      }}
    >
      {/* Search Bar */}
      <Box sx={{ marginBottom: "20px", maxWidth: "800px", marginX:'327px' }}> {/* Center the search bar */}
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
        />
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          overflowY: "auto",
          mx: "auto", // Center the table horizontally
          maxWidth: "800px", // Limit max width for better alignment
        }}
      >
        <Table stickyHeader aria-label="model artifacts table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#3f51b5",
                  color: "#fff",
                  fontSize: "16px",
                }}
              >
                Artifact Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#3f51b5",
                  color: "#fff",
                  fontSize: "16px",
                }}
              >
                Storage Path
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#3f51b5",
                  color: "#fff",
                  fontSize: "16px",
                }}
              >
                Deployment Status
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  backgroundColor: "#3f51b5",
                  color: "#fff",
                  fontSize: "16px",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: "#333", fontSize: "14px" }}>
                  {row.Artifact_name}
                </TableCell>
                <TableCell sx={{ color: "#333", fontSize: "14px" }}>
                  {row.Storage_path}
                </TableCell>
                <TableCell sx={{ color: "#333", fontSize: "14px" }}>
                  {row.Deployment_status}
                </TableCell>
                <TableCell
                  sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent: "center",
                    padding: "16px",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDeploy(row.Training_job_id, row.Artifact_id, "test instance")}
                    sx={{
                      textTransform: "none",
                      padding: "8px 16px",
                      borderRadius: "8px",
                    }}
                  >
                    Deploy
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<DownloadIcon />}
                    onClick={() => handleDownload(row.Artifact_name)}
                    sx={{
                      textTransform: "none",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      borderColor: "#3f51b5",
                      color: "#3f51b5",
                      "&:hover": {
                        borderColor: "#3f51b5",
                        backgroundColor: "#f0f0f0",
                      },
                    }}
                  >
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ModelArtifactsTable;
