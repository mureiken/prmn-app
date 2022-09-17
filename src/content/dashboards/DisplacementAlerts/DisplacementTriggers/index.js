import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';  

import DisplacementTriggersChart from './DisplacementTriggersChart';

  
  const DisplacementTriggersChartWrapper = styled(DisplacementTriggersChart)(
    () => `
        width: 100%;
        height: 100%;
  `
  );

  
  function DisplacementTriggers(props) {
    
    const [displacementTriggers, setDisplacementTriggers] = useState([]);
    const [displacedPopulation, setDisplacedPopulation] = useState([]);

    useEffect(() => {
      const getDisplacementNeeds = () => {

        if (props.data.top_causes) {
            const displacementTriggers = Object.entries(props.data.top_causes).map(([k,v]) => `${k}`);
            const displacedPopulation =  Object.entries(props.data.top_causes).map(([k,v]) => `${v}`);
            setDisplacementTriggers(displacementTriggers);
            setDisplacedPopulation(displacedPopulation);
        }
      }
      getDisplacementNeeds();
    }, [props.data.top_causes]);
  
  
    const numberOfPeople = {
      datasets: [
        {
          data: displacedPopulation,
          backgroundColor: ['#FFA500', '#CBC3E3', '#F88379', '#FAEB00', '#666666', '#18375F']
        }
      ],
      labels: displacementTriggers
    };
  
    return (
        <Box sx={{ py: 1, pb: 2, height: '100%' }}>
            <Box height={200}>
              <DisplacementTriggersChartWrapper data={numberOfPeople} />
            </Box>
        </Box>   
    );
  }
  
  export default DisplacementTriggers;
  