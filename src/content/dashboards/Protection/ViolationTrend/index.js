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
   
    const violationCases = [];
    const weekNums = [];
    
    if (props.data.weekly_cases) {
        props.data.weekly_cases.map(o=> {
          violationCases.push(o.TotalCases); 
          weekNums.push(o.Week_Number)  
          return (violationCases, weekNums);
        });
    }
    
      
    return (
        <Box height={250}>
            <ViolationTrendChartWrapper
            data={violationCases} 
            labels={weekNums}
            />
        </Box>
    );
  }
  
  export default ViolationTrend;
  
