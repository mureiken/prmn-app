import React, { useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import Button from '@mui/material/Button';
import MultiSelect from './MultiSelect';
import PeriodSelectBtn from './PeriodSelectBtn';
import {REGION_NAMES, VIOLATION_CATEGORIES, PERPETRATOR_GROUPS} from '../../constants';
import {periods} from './utils';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

export default function FilterDrawer({ open, handleClick, handleFilterChange, filters }) {

  const [periodObj, setPeriodObj] = useState({})
  
  useEffect(() => {
    setPeriodObj(periods())
  }, [])

 
  let periodSelectBtns = () =>  {
    return Object.keys(periodObj).map((key) => {
      return (
        <PeriodSelectBtn
          key={key}
          daysPassed={key}
          period={periodObj[key]}
          handleFilter={handleFilterChange}
          selectedVals={filters.period}
        />  )
      });
  }
 
  return (  
    <Drawer
        anchor="right"
        open={open}
        PaperProps={{
            sx: {
              width: {
                xs: 150,
                sm: 350
              }
            }
          }}
    >
        <DrawerHeader>
            <IconButton onClick={handleClick} sx={{ mt: 1 }}>
                <CloseTwoToneIcon />
            </IconButton>
        </DrawerHeader>
        <Typography variant="h3" color="secondary" sx={{ px:2 }}>Filters</Typography>
        <Divider sx={{ mt: 1 }} />
        <Box sx={{ p: 1 }}>
          <Typography variant="h6" color="primary" sx={{ mt: 2, pl: 1 }}>Period</Typography>
          <Box>
            {periodSelectBtns()}
          </Box>
          <Typography variant="h6" color="primary" sx={{ mt: 2, pl: 1 }}>Regions</Typography>
          <MultiSelect names={REGION_NAMES} handleFilter={handleFilterChange} target="Regions" selectedVals={filters.regions} />
          <Typography variant="h6" color="primary" sx={{ mt: 2, pl: 1 }}>Violation Categories</Typography>
          <MultiSelect names={VIOLATION_CATEGORIES} handleFilter={handleFilterChange} target="Needs" selectedVals={filters.violations} />
          <Typography variant="h6" color="primary" sx={{ mt: 2, pl: 1 }}>perpetrator Groups</Typography>
          <MultiSelect names={PERPETRATOR_GROUPS} handleFilter={handleFilterChange} target="Causes" selectedVals={filters.perpetrators} />
          <Button sx={{ mt: 3, ml: 1, p: 2, width: 300 }} variant="contained">Apply Filters</Button>
        </Box>
    </Drawer>
      
  );
}
