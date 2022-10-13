import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import MultiSelect from './MultiSelect';
import PeriodSelectBtn from './PeriodSelectBtn';
import {CAUSES, NEEDS, REGION_NAMES, DISTRICT_NAMES, VIOLATION_CATEGORIES, PERPETRATOR_GROUPS} from '../../constants';
import {periods} from './utils';
import DatePicker from '../DatePicker';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ pt: 1 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export default function FilterDrawer({ open, handleClick, handleFilterChange, filters, type }) {

  const [periodObj, setPeriodObj] = useState({})
  const [value, setValue] = React.useState(0);
  
  useEffect(() => {
    setPeriodObj(periods())
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
  console.log('filters: ', filters.causes);
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
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab label="Period(Days Ago)" {...a11yProps(0)} />
            <Tab label="Dates" {...a11yProps(1)} />
          </Tabs>
          <Divider />
          <TabPanel value={value} index={0}>
            <Box>
              {periodSelectBtns()}
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid spacing={2} sx={{ display: 'flex', flexDirection: 'row' }}>
              <Grid item xs={12} md={6} mr={1} mt={2}>
                <DatePicker 
                  handleFilter={handleFilterChange}
                  selectedVals={filters.start}
                  label="Start Date" 
                  name="start"  />
              </Grid>
              <Grid item xs={12} md={6} mt={2}>
                <DatePicker 
                  handleFilter={handleFilterChange} 
                  selectedVals={filters.end}
                  label="End Date" 
                  name="end"  />
              </Grid>
            </Grid>
          </TabPanel>
          
          <Typography variant="h6" color="primary" sx={{ mt: 2, pl: 1 }}>Regions</Typography>
          <MultiSelect names={REGION_NAMES} handleFilter={handleFilterChange} target="Regions" selectedVals={filters.regions} />
          <Typography variant="h6" color="primary" sx={{ mt: 2, pl: 1 }}>Districts</Typography>
          <MultiSelect names={DISTRICT_NAMES} handleFilter={handleFilterChange} target="Districts" selectedVals={filters.districts} />
          { type === 'displacement' ?
              <>
                <Typography variant="h6" color="primary" sx={{ mt: 2, pl: 1 }}>Needs</Typography>
                <MultiSelect names={NEEDS} handleFilter={handleFilterChange} target="Needs" selectedVals={filters.needs} />
                <Typography variant="h6" color="primary" sx={{ mt: 2, pl: 1 }}>Causes</Typography>
                <MultiSelect names={CAUSES} handleFilter={handleFilterChange} target="Causes" selectedVals={filters.causes} />
              </>
            :
            <>
            <Typography variant="h6" color="primary" sx={{ mt: 2, pl: 1 }}>Violation Categories</Typography>
            <MultiSelect names={VIOLATION_CATEGORIES} handleFilter={handleFilterChange} target="Violations" selectedVals={filters.violations} />
            <Typography variant="h6" color="primary" sx={{ mt: 2, pl: 1 }}>perpetrator Groups</Typography>
            <MultiSelect names={PERPETRATOR_GROUPS} handleFilter={handleFilterChange} target="Perpetrators" selectedVals={filters.perpetrators} />
            </>
        }     
        </Box>
    </Drawer>
      
  );
}
