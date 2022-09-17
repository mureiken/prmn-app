import { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {
  Divider,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Card,
  TablePagination,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
 
} from '@mui/material';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import Link from '@mui/material/Link';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

const applyFilters = (publications, filters) => {
  return publications.filter((publication) => {
    let matches = true;
    if (filters.type && publication.type !== filters.type) {
      matches = false;
    }
    return matches;
  });
};

const applyPagination = (publications, page, limit) => {
  return publications.slice(page * limit, page * limit + limit);
};

const Publication = ({ publications }) => {

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState({
    type: null
  });

  const publicationTypes= [
    {
        id: 'all',
        name: 'All'
    },
    {
      id: 'MonthlyReport',
      name: 'Monthly Report'
    },
    {
      id: 'FlashReport',
      name: 'Flash Report'
    },
    {
      id: 'RegionalDashboard',
      name: 'Regional Dashboard'
    },
  ];

  const handlePublicationTypeChange = (e) => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      type: value
    }));
  };


  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredPublications = applyFilters(publications, filters);
  const paginatedPublications = applyPagination(
    filteredPublications,
    page,
    limit
  );

  const theme = useTheme();

  return (
    <Card>
     
      
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Publication Type</InputLabel>
                <Select
                  value={filters.type || 'all'}
                  onChange={handlePublicationTypeChange}
                  label="Type"
                  autoWidth
                >
                  {publicationTypes.map((publicationType) => (
                    <MenuItem key={publicationType.id} value={publicationType.id}>
                      {publicationType.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Publications"
        />

      <Divider />
     
            {paginatedPublications.map((publication) => {
              return (
                <Paper
                sx={{
                  p: 2,
                  marginX: 'auto',
                  marginBottom: 2,
                  maxWidth: '90%',
                  flexGrow: 1,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              >
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                      <Img alt="complex" src={publication.thumbnail} />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1" component="div">
                          {publication.title}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                        {publication.summary}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                         Publish Date: {publication.publishDate}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Link href={publication.link} target="_blank" rel="noreferrer">
                          <Typography sx={{ cursor: 'pointer' }} variant="body2">Download</Typography>
                        </Link> 
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
              );
            })}
         
            <Box p={2}>
                <TablePagination
                component="div"
                count={filteredPublications.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25, 30]}
                />
         </Box>
    </Card>
  );
};

Publication.propTypes = {
    publications: PropTypes.array.isRequired
};

Publication.defaultProps = {
    publications: []
};

export default Publication;
