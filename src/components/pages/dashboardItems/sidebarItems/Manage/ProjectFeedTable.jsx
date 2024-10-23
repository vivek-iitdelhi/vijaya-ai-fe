
import PropTypes from 'prop-types'; // Import PropTypes
import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const ProjectFeedTable = ({ projects, page, pageLimit, onPageChange, onRowsPerPageChange, onRemove, onUpdate }) => {
  const startIndex = (page - 1) * pageLimit;
  const endIndex = startIndex + pageLimit;
  const paginatedProjects = projects.slice(startIndex, endIndex);

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Project Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedProjects.map((project) => (
            <TableRow key={project.project_id}>
              <TableCell>{project.project_name}</TableCell>
              <TableCell>{project.description}</TableCell>
              <TableCell>Active</TableCell> {/* Assuming all projects are active */}
              <TableCell>
                <IconButton onClick={() => onUpdate(project.project_id, { project_name: 'Updated Name', description: 'Updated Description' })}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onRemove(project.project_id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={projects.length}
        rowsPerPage={pageLimit}
        page={page - 1}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </div>
  );
};

// Define PropTypes for the component
ProjectFeedTable.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      project_id: PropTypes.string.isRequired,
      project_name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  page: PropTypes.number.isRequired,
  pageLimit: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ProjectFeedTable;
