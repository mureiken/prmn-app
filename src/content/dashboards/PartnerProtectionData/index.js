import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
// import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import TuneTwoToneIcon from '@mui/icons-material/TuneTwoTone';
import Alert from '@mui/material/Alert';
import FilterDrawer from '../../../components/FilterDrawer';
import ProtectionIcon from '../../../assets/Abduction-kidnapping.png';
import DataTable from './DataTable';
import useFetch from '../../../useFetch';
function PartnerDisplacementDashBoard() {
  const date = useMemo(
    () => { return new Date(); }, [],
  );
  const daysAgo = new Date(date.getTime());  
  const dateStr = useCallback(
    (myDate = date, format='en-US') => {
      return myDate.toLocaleDateString(format).replace(/\//g, '-');
    },
    [date],
  );
  
  const startDate = (period) => new Date(daysAgo.setDate(date.getDate() - period)).toLocaleDateString()

  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const [query, setQuery] = useState('');  


  const [state, setState] = useState({
    data: {},
    todaysDate: new Date(),
    startDate: startDate(30),
    endDate: new Date().toLocaleDateString(),
  });

  const [filters, setFilters] = useState({
    period: '30',
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
    let regions = filters.regions.length ? filters.regions.join(',') : 'All';
    let violations = filters.violations.length ? filters.violations.join(',') : 'All';
    let perpetrators = filters.perpetrators.length ? filters.perpetrators.join(',') : 'All';
    
  
    if (filters.filterByDates) {
      setQuery(`${regions}/${violations}/${perpetrators}/d/${dateStr(filters.start)}/${dateStr(filters.end)}`);
    } else { 
      setQuery(`${regions}/${violations}/${perpetrators}/${filters.period}D`)
    }
  
  }, [dateStr, filters]);


  const url = query && `/api/partner-protection-data/${query}`;
  const geoData = false;
  
  const {
    loading,  
    error,
    data
  } = useFetch(url, geoData)
    


  const handleDrawerOpen = () => {
    setOpenFilterDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenFilterDrawer(false);
  };

  
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
            {error && <Alert severity={"error"} >{error}</Alert>}
                <CardHeader
                  avatar={
                      <img src={ProtectionIcon} alt="Protection Dashboard Icon" width={50}/>
                    }
                    action={
                        <IconButton aria-label="settings"  onClick={handleDrawerOpen}>
                            <TuneTwoToneIcon />
                        </IconButton>
                    }
                    title="Protection Data"
                    subheader={loading ? <Skeleton variant="text" width={300} /> : `Displacement between dates  ${filters.filterByDates ? dateStr(filters.start, 'en-GB') : state.startDate} to ${filters.filterByDates ? dateStr(filters.end, 'en-GB') : state.endDate }`}
                />
            </Card>
            <Grid container spacing={2}>
              <div style={{ height: 800, width: '98%', marginLeft: 20, marginTop: 30 }}>
                <DataTable protectionData={data} />
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
