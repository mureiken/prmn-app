import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button'
import FileDownloadTwoToneIcon from '@mui/icons-material/FileDownloadTwoTone';
import {
  Divider,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  
} from '@mui/material';

import { generateCSV } from './generateCSV';
import { csvHeader } from './csvHeader';


const applyPagination = (protectionData, page, limit) => {
  return protectionData.slice(page * limit, page * limit + limit);
};

const DataTable = ({protectionData}) => {
  console.log('sss', protectionData)
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(25);

  
 
 
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };


  const paginatedProtectionData = applyPagination(
    protectionData,
    page,
    limit
  );
  
  return (
    <Card>
      
      <Divider />
      <TableContainer sx={{ maxHeight: 640 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" gutterBottom>
                  Incident Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" gutterBottom>
                 Age
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" gutterBottom>
                  Sex
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" gutterBottom>
                  Violation
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" gutterBottom>
                  Violation Region
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" gutterBottom>
                  Violation District
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" gutterBottom>
                  Violation Settlement
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProtectionData.map((data) => {
              return (
                <TableRow
                  hover
                  key={data.id}
                >
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {data.IncidentDateStr}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {data.Age}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {data.Sex}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {data.Violation}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {data.ViolationRegion}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {data.ViolationDistrict}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {data.ViolationSettlement}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={protectionData.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[25, 50, 100, 200]}
        />
      </Box>
      <Box sx={{mb: 2, ml: 2}}>
        <Button 
          variant="contained" 
          size="small" 
          onClick={()=>generateCSV(csvHeader, protectionData, 'file')}>
            <FileDownloadTwoToneIcon label="Export" />
            Export
        </Button>
      </Box>

    </Card>
  );
};

DataTable.propTypes = {
  protectionData: PropTypes.array.isRequired
};

DataTable.defaultProps = {
  protectionData: []
};

export default DataTable;
