import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
// import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
// import HealthAndSafetyTwoToneIcon from '@mui/icons-material/HealthAndSafetyTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
// import { red } from '@mui/material/colors';
import FilterDrawer from '../../../components/FilterDrawer';
import ProtectionIcon from 'src/assets/Abduction-kidnapping.png';
import DataTable from './DataTable';

function PartnerDisplacementDashBoard() {
  const date = new Date();
  const daysAgo = new Date(date.getTime());
  const dateStr = (myDate = date, format='en-US') => myDate.toLocaleDateString(format).replace(/\//g, '-');
  const startDate = (period) => new Date(daysAgo.setDate(date.getDate() - period)).toLocaleDateString()
  const [tableData, setTableData] = useState([])
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const [state, setState] = useState({
    data: {},
    todaysDate: new Date(),
    startDate: startDate(30),
    endDate: new Date().toLocaleDateString(),
  });

  const [filters, setFilters] = useState({
    period: '7',
    violations: [],
    perpetrators: [],
    regions: [],
  })

  const handleFilterChange = (target ,value) => {
    if (target === 'Period') {
      setFilters((prevState) => ({
        ...prevState,
        period: value,
      }));
      setState((prevState) => ({
        ...prevState,
        startDate:  new Date(daysAgo.setDate(date.getDate() - value)).toLocaleDateString(),
      }));
    } else if (target === 'Violations') {
      setFilters((prevState) => ({
        ...prevState,
        violations: value,
      }));
    } else if (target === 'Regions') {
      setFilters((prevState) => ({
        ...prevState,
        regions: value,
      }));
    } else if (target === 'Perpetrators') {
        setFilters((prevState) => ({
          ...prevState,
          perpetrators: value,
        }));
      }
  }

  useEffect(() => {
    let getUrl = () => {
      let regions = filters.regions.length ? filters.regions.join(',') : 'All';
      let violations = filters.violations.length ? filters.violations.join(',') : 'All';
      let perpetrators = filters.perpetrators.length ? filters.perpetrators.join(',') : 'All';
      return `/api/partner-protection-data/${filters.period}D/${regions}/${violations}/${perpetrators}`
    }

    const getProtectiontData = async () => {
      setIsLoading(true);
      const res = await fetch(getUrl());
      const data = await res.json();
      setTableData(data);
      setIsLoading(false);
    };

    console.log("Data: ")
    getProtectiontData().catch(console.error);
  }, [filters]);

  const handleDrawerOpen = () => {
    setOpenFilterDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenFilterDrawer(false);
  };

  
console.log('ddd ', tableData)
  return (
    <>
      <Helmet>
        <title>Partner Protection Data Dashboard</title>
      </Helmet>
      <Box sx={{mx: 5}}>
        <Grid
          container
          justifyContent="center"
          alignItems="stretch"
          spacing={1}
          sx={{ marginTop: 5}}
        >
          <Grid item xs={12}>
            <Card sx={{ mb: 1 }}>
                <CardHeader
                  avatar={
                      <img src={ProtectionIcon} alt="Protection Dashboard Icon" width={50}/>
                    }
                    action={
                        <IconButton aria-label="settings"  onClick={handleDrawerOpen}>
                            <SettingsTwoToneIcon />
                        </IconButton>
                    }
                    title="Protection Data"
                    subheader={isLoading ? <Skeleton variant="text" width={300} /> : `Displacement between dates  ${filters.filterByDates ? dateStr(filters.start, 'en-GB') : state.startDate} to ${filters.filterByDates ? dateStr(filters.end, 'en-GB') : state.endDate }`}
                />
            </Card>
            <Grid container spacing={2}>
              <div style={{ height: 800, width: '98%', marginLeft: 20, marginTop: 30 }}>
                <DataTable protectionData={tableData} />
          </div>
                
          </Grid>
          
        </Grid>
        
     
      </Grid>
      </Box>
    <FilterDrawer
     type='protection'
     open={openFilterDrawer}
     setOpenFilterDrawer={setOpenFilterDrawer}
     handleClick={handleDrawerClose}
     handleFilterChange={handleFilterChange}
     filters={filters}
    >
  </FilterDrawer>
  </>
);
}

export default PartnerDisplacementDashBoard;
