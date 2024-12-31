import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";

const API_BASE_URL = `${import.meta.env.VITE_HOST_URL}/rag/embeddingsjobs/`;
const BASE_MODELS_URL = `${import.meta.env.VITE_HOST_URL}/tuning/basemodels/`;

const getToken = () => {
  return localStorage.getItem("authToken");
};

export default function EmbeddingJobs() {
  const [jobs, setJobs] = useState([]);
  const [baseModels, setBaseModels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBaseModel, setSelectedBaseModel] = useState("");

  useEffect(() => {
    fetchJobs();
    fetchBaseModels();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = getToken();
      const response = await fetch(API_BASE_URL, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch jobs.");
      }
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchBaseModels = async () => {
    try {
      const token = getToken();
      const response = await fetch(BASE_MODELS_URL, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch base models.");
      }
      const data = await response.json();
      setBaseModels(data);
    } catch (error) {
      console.error("Error fetching base models:", error);
    }
  };

  const handleCreateEmbeddingJob = async () => {
    try {
      const token = getToken();
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          embeddings_job_name: `Job_${Date.now()}`,
          model_id: selectedBaseModel,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create embedding job.");
      }
      const newJob = await response.json();
      setJobs((prevJobs) => [...prevJobs, newJob]);
      setOpenDialog(false);
    } catch (error) {
      console.error("Error creating embedding job:", error);
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.embeddings_job_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
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
            width: "30%",
            backgroundColor: "#fff",
            borderRadius: "20px",
            padding: "4px 10px",
          }}
        />

        <Button
          variant="contained"
          sx={{
            borderRadius: "30px",
            padding: "12px 30px",
            "&:hover": {
              backgroundColor: "#5a2387",
            },
          }}
          onClick={() => setOpenDialog(true)}
        >
          Add New Embedding Job
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "16px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxHeight: "620px",
          overflowY: "auto",
        }}
      >
        <Table stickyHeader aria-label="embedding jobs table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#3f51b5", color: "#fff" }}>
                Job Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#3f51b5", color: "#fff" }}>
                Base Model
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#3f51b5", color: "#fff" }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredJobs.map((job) => (
              <TableRow key={job.embeddings_job_id}>
                <TableCell>{job.embeddings_job_name}</TableCell>
                <TableCell>{job.model_id}</TableCell>
                <TableCell>{job.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create New Embedding Job Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "20px",
            width: "500px",
            padding: "20px",
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          Select BaseModel
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <FormControl fullWidth>
              <InputLabel>Select Base Model</InputLabel>
              <Select
                value={selectedBaseModel}
                onChange={(e) => setSelectedBaseModel(e.target.value)}
                label="Select Base Model"
                sx={{
                  borderRadius: "20px",
                  padding: "12px 16px",
                }}
              >
                {baseModels.map((model, index) => (
                  <MenuItem key={index} value={model.model_id}>
                    {model.model_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <Button onClick={() => setOpenDialog(false)} color="secondary" sx={{ borderRadius: "20px" }}>
            Cancel
          </Button>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={handleCreateEmbeddingJob}
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "20px",
                padding: "12px 30px",
                fontWeight: "bold",
              }}
            >
              Create Embedding
            </Button>
          </motion.div>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
