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

  
  export default function DisplacementTriggers(props) {
    
    const [displacementTriggerLabels, setDisplacementTriggerLabels] = useState([]);
    const [displacedPopulation, setDisplacedPopulation] = useState([]);
    
    useEffect(() => {
      const getDisplacementNeeds = () => {

        if (props.data.top_causes) {
            const displacementLabels = Object.entries(props.data.top_causes).map(([k,v]) => `${k}`);
            const displacedPopulation =  Object.entries(props.data.top_causes).map(([k,v]) => `${v}`);
            setDisplacementTriggerLabels(displacementLabels);
            setDisplacedPopulation(displacedPopulation);
        }
      }
      getDisplacementNeeds();
      
    }, [props.data.top_causes]);
  
    
      let backgroundColor =[]
       //assign colors of pie chart based on label values
       for(let i=0; i<displacementTriggerLabels.length; i++) {
        if(displacementTriggerLabels[i] === "Conflict/Insecurity"){
          backgroundColor.push("#e7646a");
        }
        else if(displacementTriggerLabels[i] === "Drought"){
          backgroundColor.push("#f7941d");
        }
        else if(displacementTriggerLabels[i] === "Flood"){
          backgroundColor.push("#a07b5e")
        }
        else if(displacementTriggerLabels[i] === "Other"){
          backgroundColor.push("#c974a2")
      }
    }

    const numberOfPeople = {
      datasets: [
        {
          data: displacedPopulation,
          backgroundColor: backgroundColor
        }
      ],
      labels: displacementTriggerLabels
    };
  
    return (
        <Box sx={{ py: 1, pb: 2, height: '100%' }}>
            <Box height={200}>
              <DisplacementTriggersChartWrapper data={numberOfPeople} />
            </Box>
        </Box>   
    );
  }
  