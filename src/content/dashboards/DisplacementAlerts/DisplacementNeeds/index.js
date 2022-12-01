import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
  
import DisplacementNeedsChart from './DisplacementNeedsChart';

  
  const DisplacementNeedsChartWrapper = styled(DisplacementNeedsChart)(
    () => `
        width: 100%;
        height: 100%;
  `
  );

  
  function DisplacementNeeds(props) {

    
    const [displacementNeeds, setDisplacementNeeds] = useState([]);
    const [displacedPopulation, setDisplacedPopulation] = useState([]);

     useEffect(() => {
      const getDisplacementNeeds = () => {

        if (props.data.top_needs) {

         const sorted_top_needs = Object.entries(props.data.top_needs)
          .sort(([, v1], [, v2]) => v2 - v1)
          .reduce((obj, [k, v]) => ({
            ...obj,
            [k]: v
          }), {})

          const Needs = Object.entries(sorted_top_needs).map(([k,v]) => `${k}`);
          const population =  Object.entries(sorted_top_needs).map(([k,v]) => `${v}`);
          setDisplacementNeeds(Needs);
          setDisplacedPopulation(population);
        }
      }
      getDisplacementNeeds();
    }, [props.data.top_needs]);
  
  
    const population = {
        numbers: displacedPopulation
      };
    
      const generic = {
        Needs: {
          labels: displacementNeeds,
        }
      };
  
    return (
        <Box sx={{ py: 1, pb: 0, height: '100%' }}>
            <Box height={185}>
            <DisplacementNeedsChartWrapper 
              data={population} 
              labels={generic.Needs.labels}
              handleFilter={props.handleFilterChange}
            />
            </Box>
        </Box>   
    );
  }
  
  export default DisplacementNeeds;
  