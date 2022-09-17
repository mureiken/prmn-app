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
   console.log("zprops", props);
    const orderedCases = [];
    
    if (props.data.z_daily_cases) {
        const  { Cases } = props.data.z_daily_cases
        // Cases.map((k, v)=> {
        //     let newObj = {};
        //     newObj.x = Cases[k];
        //     newObj.y = Cases[v];
        //     orderedCases.push(newObj);   
        //     return orderedCases;

        // })
        Object.keys(Cases).map((key) => {
            let newObj = {};
            newObj.x = new Date(Number(key));
            newObj.y = Cases[key];
            orderedCases.push(newObj);
            return orderedCases;
          });
    }

    orderedCases.sort(function compare(a, b) {
        var dateA = new Date(a.x);
        var dateB = new Date(b.x);
        return dateA - dateB;
      });
      
    
      
    return (
        <Box height={150}>
            <ViolationTrendChartWrapper
                data={orderedCases}
            />
        </Box>
    );
  }
  
  export default ViolationTrend;
  