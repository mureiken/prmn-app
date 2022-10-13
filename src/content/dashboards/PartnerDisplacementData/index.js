import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
// import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
//import TransferWithinAStationTwoToneIcon from '@mui/icons-material/TransferWithinAStationTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import Alert from '@mui/material/Alert';
// import { red } from '@mui/material/colors';
import FilterDrawer from '../../../components/FilterDrawer';
import useFetch from '../../../useFetch';
import DataTable from './DataTable';
import InternallyDisplacedIcon from 'src/assets/Internally-displaced.png';

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
    startDate: startDate(7),
    endDate: new Date().toLocaleDateString(),
  });

  const [filters, setFilters] = useState({
    filterByDates: false,
    period: '30',
    causes: [],
    needs: [],
    regions: [],
    districts: [],
    start: date,
    end: date,
  })

  const handleFilterChange = (target ,value) => {
    if (target === 'Period') {
      setFilters((prevState) => ({
        ...prevState,
        filterByDates: false,
        period: value,       
      }));
     
      setState((prevState) => ({
        ...prevState,
        startDate:  startDate(value),
      }));
    } else if (target==='start') {
      setFilters((prevState) => ({
        ...prevState,
        filterByDates: value,
        start: value,
        
      }));
    } else if (target==='end') {
      setFilters((prevState) => ({
        ...prevState,
        filterByDates: value,
        end: value,
      }));
    } else if (target === 'Needs') {
      setFilters((prevState) => ({
        ...prevState,
        needs: value,
      }));
    } else if (target === 'Regions') {
      setFilters((prevState) => ({
        ...prevState,
        regions: value,
      }));
    } else if (target === 'Districts') {
      setFilters((prevState) => ({
        ...prevState,
        districts: value,
      }));
    } else if (target === 'Causes') {
        setFilters((prevState) => ({
          ...prevState,
          causes: value,
        }));
      }
  }

  useEffect(() => {
    let regions = filters.regions.length ? filters.regions.join(',') : 'All';
    let districts = filters.districts.length ? filters.districts.join(',') : 'All';
    let needs = filters.needs.length ? filters.needs.join(',') : 'All';
    let causes = filters.causes.length ? filters.causes.join(',') : 'All';
    
    if (filters.filterByDates) {
      setQuery(`${regions}/${districts}/${needs}/${causes}/d/${dateStr(filters.start)}/${dateStr(filters.end)}`);
    } else {
      setQuery(`${regions}/${districts}/${needs}/${causes}/${filters.period}D`)
    }
  
  }, [dateStr, filters]);

  const url = query && `${process.env.REACT_APP_API_URL}/api/partner-displacement-data/${query}`;

  const {
    loading,  
    error,
    data
  } = useFetch(url);

  const handleDrawerOpen = () => {
    setOpenFilterDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenFilterDrawer(false);
  };

  return (
    <>
      <Helmet>
        <title>Partner Displacement Data Dashboard</title>
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
                      <img src={InternallyDisplacedIcon} alt="" width={50} />
                    }
                    action={
                        <IconButton aria-label="settings"  onClick={handleDrawerOpen}>
                            <SettingsTwoToneIcon />
                        </IconButton>
                    }
                    title="Displacement Data"
                    subheader={loading ? <Skeleton variant="text" width={300} /> : `Displacement between dates  ${filters.filterByDates ? dateStr(filters.start, 'en-GB') : state.startDate} to ${filters.filterByDates ? dateStr(filters.end, 'en-GB') : state.endDate }`}
                />
            </Card>
            <Grid container spacing={2}>
              <div style={{ height: 800, width: '98%', marginLeft: 20, marginTop: 30 }}>
                <DataTable displacementData={data} />
          </div>
                
          </Grid>
          
        </Grid>
        
     
      </Grid>
      </Box>
    <FilterDrawer
     type='displacement'
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
