import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const OutlinedCard = ({ projects }) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', padding: '20px' }}>
      {projects.map((project) => (
        <Card
          key={project.project_id}
          variant="outlined"
          sx={{
            width: '300px',
            borderRadius: '8px',
            transition: 'box-shadow 0.3s',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            },
          }}
        >
          <CardContent>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
              {project.project_name}
            </Typography>
            <Typography variant="body2" sx={{ color: '#555', mt: 1 }}>
              {project.description}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center', paddingBottom: '16px' }}>
            <Button
              onClick={() => window.open(`/datasets/`, '_blank')}
              variant="contained"
              color="primary"
              sx={{ textTransform: 'none' }}
            >
              Manage
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

// Define prop types for the OutlinedCard component
OutlinedCard.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      project_id: PropTypes.string.isRequired,
      project_name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default OutlinedCard;
