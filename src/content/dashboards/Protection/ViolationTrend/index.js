import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import ViolationTrendChart from './ViolationTrendChart';
  
const ViolationTrendChartWrapper = styled(ViolationTrendChart)(
    ({ theme }) => `
        height: 200px;
  `
);
  
function ViolationTrend(props) { 
   
    // const violationCases = [];
    // const weekNums = [];
    
    // if (props.data.weekly_cases) {
    //     props.data.weekly_cases.map(o=> {
    //       violationCases.push(o.TotalCases); 
    //       weekNums.push(o.Week_Number)  
    //       return (violationCases, weekNums);
    //     });
    // }
    
    let arrayOfWeeklyData = [];
    let min = 0
    let max = 0;
   
    if (props.data.weekly_cases) {
      
      arrayOfWeeklyData = props.data.weekly_cases.map(item => {
        return {
          x: item.Week_Number,
          y: item.TotalCases
        };
      });
    
    const start = arrayOfWeeklyData[0];
    const end = arrayOfWeeklyData[arrayOfWeeklyData.length - 1];
    min = start["x"];
    max = end["x"];
  }
      
    return (
        <Box height={250}>
            <ViolationTrendChartWrapper
            arrayOfWeeklyData={arrayOfWeeklyData} 
            min={min}
            max={max}
            />
        </Box>
    );
  }
  
  export default ViolationTrend;
  
