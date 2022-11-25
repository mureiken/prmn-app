import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import { COLORS } from '../../../../../constants';
import useFetch from '../../../../../useFetch';
  
  const displacementDetails = (data) => {
    console.log("data: ", data)
    return (
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Arriving from</TableCell>
              <TableCell align="right">No's</TableCell>
              <TableCell align="right">Reason</TableCell>
              <TableCell align="right">Needs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, key) => (
              <TableRow
                key={key}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.PreviousSettlement}, {row.PreviousDistrict}, {row.PreviousRegion}
                </TableCell>
                <TableCell align="right">{row.AllPeople}</TableCell>
                <TableCell align="right">{row.Reason}</TableCell>
                <TableCell align="right">{row.Needs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  const useStyles = makeStyles((theme) => ({
    headerContainer: {
      textAlign: 'left',
      width: (props) => props.tooltipWidth,
      minHeight: '85px',
      background: '#8EBEFF 0 0 no-repeat padding-box',
      opacity: '0.85',
      color: '#044F85',
      padding: '0 0 10px 0',
    },
    countryOfOriginContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItem: 'center',
    },
    lineContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: '10px',
    },
    countryText: {
      fontSize: '16px',
      color: COLORS.darkGray,
      width: '50%',
    },
    line: {
      backgroundColor: COLORS.blue,
      height: '5px',
      borderRadius: '11px',
      marginRight: '5px',
    },
    lineText: {
      fontSize: '16px',
      color: COLORS.blue,
    },
    content: {
      textAlign: 'left',
      fontSize: '16px',
      color: COLORS.darkGray,
      paddingLeft: '19px',
      paddingTop: '12px',
    },
    infoText: {
      textAlign: 'right',
      fontSize: '12px',
      fontStyle: 'italic',
      color: COLORS.blue,
      padding: '0px',
    },
  }));

export default function Modal({ isOpen, handleClose, popupInfo }) {

  const location = popupInfo.properties.CurrentSettlement.replace('/', '**');
  const district = popupInfo.properties.CurrentDistrict;
  const region = popupInfo.properties.CurentRegion;
  const numIDPS = popupInfo.properties.AllPeople;
  const dateOfArrival = popupInfo.properties.Date.replace('00:00:00 GMT','');

  const [query, setQuery] = useState();

  useEffect(() => {
    setQuery(`${location}/${dateOfArrival}`);
    
  }, [location, dateOfArrival]);

  
  
  const url = query && `/api/displacement-data/details/${query}`;
  const geoData = false;
  
  const {
    loading,  
    error,
    data
  } = useFetch(url, geoData);
    


  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch(
  //     `/api/displacement-data/details/${location}/${dateOfArrival}`
  //   )
  //     .then(resp => resp.json())
  //     .then(json => {
  //       setData(json)
  //       setIsLoading(false);
  //     })
  //     .catch(err => console.error('Could not load data', err)); // eslint-disable-line
  // }, [location, dateOfArrival]);



  const SkeletonWrapper = () => {
    return(
      <Box>
        {error && <Alert severity={"error"} >{error}</Alert>}
        <div className={classes.headerContainer}>
            <div className="tooltip_header_title"><Skeleton variant="text" width={300} /></div>
            <div className="tooltip_header_subtitle"><Skeleton variant="text" width={300} /></div>
          </div>
          <div>
              <div className={classes.infoText}><Skeleton variant="text" width={300} /></div>
          </div>   
      </Box>
    )
  }

  const classes = useStyles();
  console.log("Is it open:", isOpen)
    return (
        <Dialog open={isOpen} onClose={handleClose}>
             <DialogContent>
             {loading ? (
              <SkeletonWrapper />
              ) : (
                <Box>
                  <div className={classes.headerContainer}>
                    <div className="tooltip_header_title">{location}, {district}, {region}</div>
                    <div className="tooltip_header_subtitle">{`${numIDPS} IDPs arrived on ${dateOfArrival}`}</div>
                  </div>
                  <div>
                    <div className={classes.infoText}>{data && displacementDetails(data)}</div>
                  </div>   
                </Box>
              )}
             </DialogContent>
             <DialogActions>
                <Button onClick={handleClose}>Close</Button>
             </DialogActions>     
        </Dialog>
    )
}