import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import DisplacementTrendChart from './DisplacementTrendChart';
  
const DisplacementTrendChartWrapper = styled(DisplacementTrendChart)(
    ({ theme }) => `
        height: 300px;
  `
);


function DisplacementTrend(props) {
   
    // const displacements = [];
    
    // props.data.weekly_displacement.map(o=> {
    //     let newObj = {};
    //     newObj.x = o.Week_Number;
    //     newObj.y = o.AllPeople;
    //     displacements.push(newObj);   
    //     return displacements;

    // })

    // displacements.sort(function compare(a, b) {
    //     return a - b;
    //   });


    // const [displacementWeeks, setDisplacementWeeks] = useState([]);
    // const [displacedPopulation, setDisplacedPopulation] = useState([]);

    //  useEffect(() => {
    //   const getDisplacementNeeds = () => {
    //     const displacements = [];
    //     const weekNums = [];

    //     if (props.data.weekly_displacement) {
    //       props.data.weekly_displacement.map(o=> {
    //         displacements.push(o.AllPeople); 
    //         weekNums.push(o.Week_Number)  
    //         return (displacements, weekNums);

    //       })

    //       setDisplacementWeeks(weekNums)
    //       setDisplacedPopulation(displacements)
    //     }
    //   }
    //   getDisplacementNeeds();
    // }, [props.data.weekly_displacement]);
  
  
    // const population = {
    //     numbers: displacedPopulation
    //   };
    
    //   const generic = {
    //     weeks: {
    //       labels: displacementWeeks,
    //     }
    //   };

    const displacements = [];
    const weekNums = [];

    if (props.data.weekly_displacement) {
      props.data.weekly_displacement.map(o=> {
        displacements.push(o.AllPeople); 
        weekNums.push(o.Week_Number)  
        return (displacements, weekNums);
      });
  }

    console.log("weeks: ", weekNums);
    console.log("population: ", displacements);

    return (
        <Box height={250}>
            <DisplacementTrendChartWrapper
            data={displacements} 
            labels={weekNums}
            />
        </Box>
    );
  }

  export default DisplacementTrend;
  