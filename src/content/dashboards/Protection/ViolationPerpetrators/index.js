import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';  

import ViolationPerpetratorsChart from './ViolationPerpetratorsChart';

  
  const ViolationPerpetratorsChartWrapper = styled(ViolationPerpetratorsChart)(
    () => `
        width: 100%;
        height: 100%;
  `
  );

  
  function ViolationPerpetrators(props) {
    
    const [ViolationPerpetrators, setViolationPerpetrators] = useState([]);
    const [cases, setCases] = useState([]);

    useEffect(() => {
      const getDisplacementNeeds = () => {

        if (props.data.top_perpetrator_groups) {
            const ViolationPerpetrators = Object.entries(props.data.top_perpetrator_groups).map(([k,v]) => `${k}`);
            const VCases =  Object.entries(props.data.top_perpetrator_groups).map(([k,v]) => `${v}`);
            setViolationPerpetrators(ViolationPerpetrators);
            setCases(VCases);
        }
      }
      getDisplacementNeeds();
    }, [props.data.top_perpetrator_groups]);
  
  
    const numberOfCases = {
      datasets: [
        {
          data: cases,
          backgroundColor: ['#0072BC', '#00B398', '#EF4A60', '#FAEB00', '#666666', '#18375F']
        }
      ],
      labels: ViolationPerpetrators
    };
  
    return (
        <Box sx={{ py: 1, pb: 2, height: '100%' }}>
            <Box height={200}>
              <ViolationPerpetratorsChartWrapper data={numberOfCases} />
            </Box>
        </Box>   
    );
  }
  
  export default ViolationPerpetrators;
  