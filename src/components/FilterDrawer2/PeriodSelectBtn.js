import React from 'react'
import Button from '@mui/material/Button';

function PeriodSelectBtn({daysPassed, period, handleFilter, selectedVals}) {
  return (
    <Button 
        onClick={() => { handleFilter("Period", daysPassed);}} 
        value={daysPassed}
        variant="outlined" 
        size="small"
        sx={{ margin: 1 }}
        color={selectedVals===daysPassed ?  "primary" : "secondary"}
    >
        {period}
    </Button>
  )
}

export default PeriodSelectBtn