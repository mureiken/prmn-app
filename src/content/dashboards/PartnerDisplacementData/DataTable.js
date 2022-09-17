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


const applyPagination = (displacementData, page, limit) => {
  return displacementData.slice(page * limit, page * limit + limit);
};

const DataTable = ({displacementData}) => {
  console.log('sss', displacementData)
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(25);

  
 
 
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };


  const paginateddisplacementData = applyPagination(
    displacementData,
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
                  Current Region
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" gutterBottom>
                  Current District
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" gutterBottom>
                  Current Settlement
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" gutterBottom>
                  Previous Region
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" gutterBottom>
                  Previous District
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" gutterBottom>
                  Previous Settlement
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" gutterBottom>
                  No of People
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" gutterBottom>
                  Arrival Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" gutterBottom>
                 yr Week
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" gutterBottom>
                  Reason
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" gutterBottom>
                  Priority Need 1
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" gutterBottom>
                  Priority Need 2
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" gutterBottom>
                  Boys
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" gutterBottom>
                  Girls
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" gutterBottom>
                 Men
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" gutterBottom>
                  Women
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" gutterBottom>
                  Elderly Men
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" gutterBottom>
                  Elderly Women
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" gutterBottom>
                  Total Male
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" gutterBottom>
                  Total Female
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" gutterBottom>
                 Intra Region
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginateddisplacementData.map((data) => {
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
                      {data.CurentRegion}
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
                      {data.CurrentDistrict}
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
                      {data.CurrentSettlement}
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
                      {data.PreviousRegion}
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
                      {data.PreviousDistrict}
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
                      {data.PreviousSettlement}
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
                      {data.AllPeople}
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
                      {data.ArrivalDate}
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
                      {data.Week}
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
                     {data.Reason}
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
                     {data.Need1}
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
                     {data.Need2}
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
                      {data.Boys}
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
                      {data.Girls}
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
                      {data.Men}
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
                      {data.Women}
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
                      {data.ElderlyMen}
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
                      {data.ElderlyWomen}
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
                      {data.TotalM}
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
                        {data.TotalF}
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
                        {data.IntraRegion ? "Intra" : "Extra"}
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
          count={displacementData.length}
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
          onClick={()=>generateCSV(csvHeader, displacementData, 'file')}>
            <FileDownloadTwoToneIcon label="Export" />
            Export
        </Button>
      </Box>

    </Card>
  );
};

DataTable.propTypes = {
  displacementData: PropTypes.array.isRequired
};

DataTable.defaultProps = {
  displacementData: []
};

export default DataTable;
