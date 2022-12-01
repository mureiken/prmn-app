import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
  
import ViolationResponsesChart from './ViolationResponsesChart';

  
  const ViolationResponsesChartWrapper = styled(ViolationResponsesChart)(
    () => `
        width: 90%;
        height: 100%;
  `
  );

  
  function ViolationResponses(props) {

    
    const [ViolationResponses, setViolationResponses] = useState([]);
    const [cases, setCases] = useState([]);

     useEffect(() => {
      const getViolationResponses = () => {

        if (props.data.top_responses) {
          const sorted_top_responses = Object.entries(props.data.top_responses)
          .sort(([, v1], [, v2]) => v2 - v1)
          .reduce((obj, [k, v]) => ({
            ...obj,
            [k]: v
          }), {})
          const Responses = Object.entries(sorted_top_responses).map(([k,v]) => k.replace( /([a-z])([A-Z])/g, "$1 $2"));
          const VCases =  Object.entries(sorted_top_responses).map(([k,v]) => v);
          setViolationResponses(Responses);
          setCases(VCases);
        }
      }
      getViolationResponses();
    }, [props.data.top_responses]);
  
  
    const violation_cases = {
        numbers: cases
      };
    
      const generic = {
        Responses: {
          labels: ViolationResponses,
        }
      };
  
    return (
        <Box sx={{ py: 1, pb: 0, height: '100%'}}>
            <Box height={235}>
            <ViolationResponsesChartWrapper 
                data={violation_cases} 
                labels={generic.Responses.labels}
                />
            </Box>
        </Box>   
    );
  }
  
  export default ViolationResponses;
  