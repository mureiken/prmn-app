import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { makeStyles } from '@mui/styles';
import { COLORS } from '../../../../../constants';

  

  const useStyles = makeStyles((theme) => ({
    headerContainer: {
      textAlign: 'left',
      width: (props) => props.tooltipWidth,
      minHeight: '55px',
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

export default function Modal({ title, children, isOpen, handleClose, popupInfo }) {

  const district = popupInfo.properties.ViolationDistrict;
  const fromDate = popupInfo.properties.FromDate;
  const toDate =  popupInfo.properties.ToDate;
  const totalCases =  popupInfo.properties.TotalCases;
  //const dateOfArrival = popupInfo.properties.Date.replace('00:00:00 GMT','');


  const classes = useStyles();
  console.log("Is it open:", isOpen)
    return (
        <Dialog open={isOpen} onClose={handleClose}>
             <DialogContent>
                <Box>
                  <div className={classes.headerContainer}>
                    <div className="tooltip_header_title">{district}</div>
                  </div>
                  <div>
                  <div>{`${totalCases} cases between ${fromDate} and ${toDate}`}</div>
                </div>   
                </Box>
             </DialogContent>
             <DialogActions>
                <Button onClick={handleClose}>Close</Button>
             </DialogActions>     
        </Dialog>
    )
}