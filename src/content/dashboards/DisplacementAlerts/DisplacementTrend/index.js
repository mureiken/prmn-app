import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import DisplacementTrendChart from './DisplacementTrendChart';
  
const DisplacementTrendChartWrapper = styled(DisplacementTrendChart)(
    ({ theme }) => `
        height: 300px;
  `
);


function DisplacementTrend(props) {


    let arrayOfWeeklyData = [];
    let min = 0
    let max = 0;
   
    if (props.data.weekly_displacement) {
      
      arrayOfWeeklyData = props.data.weekly_displacement.map(item => {
        return {
          x: item.Week_Number,
          y: item.AllPeople
        };
      });

      
    const start = arrayOfWeeklyData[0];
    const end = arrayOfWeeklyData[arrayOfWeeklyData.length - 1];
    min = start["x"];
    max = end["x"];
     
  }

    return (
        <Box height={250}>
            <DisplacementTrendChartWrapper
            arrayOfWeeklyData={arrayOfWeeklyData}
            min={min}
            max={max}
            />
        </Box>
    );
  }

  export default DisplacementTrend;
  