import React from 'react'
import Button from '@mui/material/Button';

function PeriodSelectBtn({daysPassed, period, handleFilter, selectedVals}) {
  return (
    <Button 
        onClick={() => { handleFilter("Period", daysPassed);}} 
        value={daysPassed}
        variant={selectedVals===daysPassed ?  "contained" : "outlined"} 
        size="small"
        sx={{ margin: 1 }}
        color="secondary"
    >
        {period}
    </Button>
  )
}

export default PeriodSelectBtn