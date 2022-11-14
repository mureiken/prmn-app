import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
  
import DisplacementLocationsChart from './DisplacementLocationsChart';



  const DisplacementLocationsChartWrapper = styled(DisplacementLocationsChart)(
    () => `
        width: 100%;
        height: 100%;
  `
  );

  
  function DisplacementLocations(props) {
    
    const [DisplacementLocations, setDisplacementLocations] = useState([]);
    const [displacedPopulation, setDisplacedPopulation] = useState([]);

   
     useEffect(() => {
      const getDisplacementLocations = () => {

        if (props.data.top_locations) {
          const sorted_top_locations = Object.entries(props.data.top_locations)
          .sort(([, v1], [, v2]) => v2 - v1)
          .reduce((obj, [k, v]) => ({
            ...obj,
            [k]: v
          }), {})

          const Locations = Object.entries(sorted_top_locations).map(([k,v]) => k);
          const population =  Object.entries(sorted_top_locations).map(([k,v]) => v);
          setDisplacementLocations(Locations);
          setDisplacedPopulation(population);
        }
      }
      getDisplacementLocations();
    }, [props.data.top_locations]);
  
  
    const population = {
        numbers: displacedPopulation
      };
    
      const generic = {
        Locations: {
          labels: DisplacementLocations,
        }
      };
  
    return (
        <Box sx={{ py: 1, pb: 2, height: '100%' }}>
            <Box height={200}>
            <DisplacementLocationsChartWrapper 
                data={population} 
                labels={generic.Locations.labels}
                />
            </Box>
        </Box>   
    );
  }
  
  export default DisplacementLocations;
  