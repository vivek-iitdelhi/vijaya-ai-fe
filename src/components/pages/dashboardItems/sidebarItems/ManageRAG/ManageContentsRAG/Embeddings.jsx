import React, { useState } from "react";
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

export default function EmbeddingJobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBaseModel, setSelectedBaseModel] = useState("");
  
  // Dummy data
  const jobs = [
    {
      id: 1,
      job_name: "Job 1",
      base_model: "Model A",
      dataset_version: "Dataset1_v1.0",
      status: "Completed",
    },
    {
      id: 2,
      job_name: "Job 2",
      base_model: "Model B",
      dataset_version: "Dataset2_v2.1",
      status: "In Progress",
    },
    {
      id: 3,
      job_name: "Job 3",
      base_model: "Model C",
      dataset_version: "Dataset3_v3.5",
      status: "Failed",
    },
  ];

  const baseModels = ["Model A", "Model B", "Model C", "Model D"];

  const filteredJobs = jobs.filter((job) =>
    job.job_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdate = (jobId) => {
    console.log(`Update job with ID: ${jobId}`);
    // Add logic for updating job status or configuration
  };

  const handleCreateEmbeddingJob = () => {
    console.log("Creating new embedding job with base model:", selectedBaseModel);
    // Add logic for creating a new embedding job
    setOpenDialog(false);  // Close the dialog after creating
  };

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
            borderRadius: "20px", // Curvy search input
            padding: "4px 10px",  // Smoother input field
          }}
        />

        <Button
          variant="contained"
          sx={{
            borderRadius: "30px",  // Curvy button
            padding: "12px 30px",  // Larger button padding
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
          borderRadius: "16px",  // Curvy table container
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
                DatasetVersion
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#3f51b5", color: "#fff" }}>
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#3f51b5", color: "#fff" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.job_name}</TableCell>
                <TableCell>{job.base_model}</TableCell>
                <TableCell>{job.dataset_version}</TableCell>
                <TableCell>{job.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      borderRadius: "20px",
                      textTransform: "none",
                      fontWeight: "bold",
                    }}
                    onClick={() => handleUpdate(job.id)}
                  >
                    Update
                  </Button>
                </TableCell>
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
            borderRadius: "20px",  // Curvier dialog box
            width: "500px",  // Make the dialog larger
            padding: "20px", // Add more padding to make it feel spacious
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
                  borderRadius: "20px", // Curvier select box
                  padding: "12px 16px", // Larger padding
                }}
              >
                {baseModels.map((model, index) => (
                  <MenuItem key={index} value={model}>
                    {model}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",  // Center the buttons
            padding: "20px",  // Add more padding for a spacious feel
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
                padding: "12px 30px",  // Larger padding for buttons
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
