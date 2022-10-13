import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
  
import DisplacementRegionsChart from './DisplacementRegionsChart';



  const DisplacementRegionsChartWrapper = styled(DisplacementRegionsChart)(
    () => `
        width: 100%;
        height: 100%;
  `
  );

  
  function DisplacementRegions(props) {
    
    const [displacementRegions, setDisplacementRegions] = useState([]);
    const [displacedPopulation, setDisplacedPopulation] = useState([]);

   
     useEffect(() => {
      const getDisplacementRegions = () => {

        if (props.data.top_regions) {
          const sorted_top_regions = Object.entries(props.data.top_regions)
          .sort(([, v1], [, v2]) => v2 - v1)
          .reduce((obj, [k, v]) => ({
            ...obj,
            [k]: v
          }), {})

          const Regions = Object.entries(sorted_top_regions).map(([k,v]) => k);
          const population =  Object.entries(sorted_top_regions).map(([k,v]) => v);
          setDisplacementRegions(Regions);
          setDisplacedPopulation(population);
        }
      }
      getDisplacementRegions();
    }, [props.data.top_regions]);
  
  
    const population = {
        numbers: displacedPopulation
      };
    
      const generic = {
        regions: {
          labels: displacementRegions,
        }
      };
  
    return (
        <Box sx={{ py: 1, pb: 2, height: '100%' }}>
            <Box height={200}>
            <DisplacementRegionsChartWrapper 
                data={population} 
                labels={generic.regions.labels}
                />
            </Box>
        </Box>   
    );
  }
  
  export default DisplacementRegions;
  