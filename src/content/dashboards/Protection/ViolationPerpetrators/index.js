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

    
    let backgroundColor =[]
       //assign colors of pie chart based on label values
       for(let i=0; i<ViolationPerpetrators.length; i++) {
        if(ViolationPerpetrators[i] === "State Actors"){
          backgroundColor.push("#0072BC");
        }
        else if(ViolationPerpetrators[i] === "Non-State Actors"){
          backgroundColor.push("#00B398");
        }
        else if(ViolationPerpetrators[i] === "International Actors"){
          backgroundColor.push("#EF4A60")
        }
        else if(ViolationPerpetrators[i] === "Unaffiliated Private Person"){
          backgroundColor.push("#FAEB00")
      }
    }
  
  
    const numberOfCases = {
      datasets: [
        {
          data: cases,
          backgroundColor: backgroundColor
        }
      ],
      labels: ViolationPerpetrators
    };
  
    return (
        <Box sx={{ py: 1, pb: 0, height: '100%' }}>
            <Box height={185}>
              <ViolationPerpetratorsChartWrapper 
                data={numberOfCases}
                handleFilter={props.handleFilterChange}
              />
            </Box>
        </Box>   
    );
  }
  
  export default ViolationPerpetrators;
  