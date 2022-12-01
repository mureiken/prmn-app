import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
  
import ViolationCategoriesChart from './ViolationCategoriesChart';

  
  const ViolationCategoriesChartWrapper = styled(ViolationCategoriesChart)(
    () => `
        width: 100%;
        height: 100%;
  `
  );

  
  function ViolationCategories(props) {

    const [ViolationCategories, setViolationCategories] = useState([]);
    const [cases, setCases] = useState([]);

     useEffect(() => {
      const getViolationCategories = () => {

        if (props.data.top_violation_categories) {
          
          const sorted_violation_categories = Object.entries(props.data.top_violation_categories)
          .sort(([, v1], [, v2]) => v2 - v1)
          .reduce((obj, [k, v]) => ({
            ...obj,
            [k]: v
          }), {})
          
          const Violations = Object.entries(sorted_violation_categories).map(([k,v]) => `${k}`);
          const Cases =  Object.entries(sorted_violation_categories).map(([k,v]) => `${v}`);
          setViolationCategories(Violations);
          setCases(Cases);
        }
      }
      getViolationCategories();
    }, [props.data.top_violation_categories]);
  
  
    const violationCases = {
        numbers: cases
      };
    
      const generic = {
        categories: {
          labels: ViolationCategories,
        }
      };
  
    return (
        <Box sx={{ py: 1, pb: 0}}>
            <Box height={185}>
              <ViolationCategoriesChartWrapper 
                  data={violationCases} 
                  labels={generic.categories.labels}
                  handleFilter={props.handleFilterChange}

              />
            </Box>
        </Box>   
    );
  }
  
  export default ViolationCategories;
  