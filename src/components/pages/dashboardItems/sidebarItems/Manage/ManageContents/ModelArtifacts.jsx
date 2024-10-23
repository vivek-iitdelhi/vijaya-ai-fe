import { useState } from "react";
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

const data = [
  { jobName: "Job 1", baseModel: "BaseModel 1", dataset: "Dataset 1" },
  { jobName: "Job 2", baseModel: "BaseModel 2", dataset: "Dataset 2" },
  { jobName: "Job 3", baseModel: "BaseModel 3", dataset: "Dataset 3" },
  { jobName: "Job 4", baseModel: "BaseModel 1", dataset: "Dataset 1" },
  { jobName: "Job 5", baseModel: "BaseModel 2", dataset: "Dataset 2" },
  { jobName: "Job 6", baseModel: "BaseModel 3", dataset: "Dataset 3" },
  { jobName: "Job 7", baseModel: "BaseModel 1", dataset: "Dataset 1" },
  { jobName: "Job 8", baseModel: "BaseModel 2", dataset: "Dataset 2" },
  { jobName: "Job 9", baseModel: "BaseModel 3", dataset: "Dataset 3" },
  { jobName: "Job 10", baseModel: "BaseModel 1", dataset: "Dataset 1" },
  { jobName: "Job 11", baseModel: "BaseModel 2", dataset: "Dataset 2" },
  { jobName: "Job 12", baseModel: "BaseModel 3", dataset: "Dataset 3" },
];

const ModelArtifactsTable = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleDeploy = (jobName) => {
    alert(`Deploying ${jobName}`);
  };

  const handleDownload = (jobName) => {
    const confirmation = window.confirm(
      `Are you sure you want to download ${jobName}?`
    );
    if (confirmation) {
      const fileContent = `Job Name: ${jobName}`;
      const blob = new Blob([fileContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${jobName}.txt`;
      link.click();

      URL.revokeObjectURL(url);
    }
  };

  const filteredData = data.filter((row) =>
    row.jobName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        height: "100vh", // Full height
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Search Bar */}
      <Box sx={{ padding: "20px" }}>
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
          flexGrow: 1, // Allows table to grow and fill remaining space
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          overflowY: "auto", // Enables vertical scrolling
          margin: "0px 20px 20px 20px", // Small margin around the table
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
                Job Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#3f51b5",
                  color: "#fff",
                  fontSize: "16px",
                }}
              >
                Base Model
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#3f51b5",
                  color: "#fff",
                  fontSize: "16px",
                }}
              >
                Dataset
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
                  {row.jobName}
                </TableCell>
                <TableCell sx={{ color: "#333", fontSize: "14px" }}>
                  {row.baseModel}
                </TableCell>
                <TableCell sx={{ color: "#333", fontSize: "14px" }}>
                  {row.dataset}
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
                    onClick={() => handleDeploy(row.jobName)}
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
                    onClick={() => handleDownload(row.jobName)}
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
