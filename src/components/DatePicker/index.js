import React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


export default function DatePicker({ label, name, handleFilter, selectedVals }) {
   
    const handleChange = (newValue) => {
      handleFilter('filterByDates', true);
      setTimeout(() => {
        handleFilter(name, newValue);
      }, "3000")
      
    };
  
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        
        <DesktopDatePicker
            id={name}
            name={name}
            label={label}
            inputFormat="dd-MM-yyyy"
            value={selectedVals}
            onChange={handleChange}
            minDate= {new Date("2016-01-01")}
            maxDate={new Date()} 
            renderInput={(params) => <TextField {...params} />}
        />
        
    </LocalizationProvider>
  );
}