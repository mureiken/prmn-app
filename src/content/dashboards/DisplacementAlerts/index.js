import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert';
//import TransferWithinAStationTwoToneIcon from '@mui/icons-material/TransferWithinAStationTwoTone';
import Skeleton from '@mui/material/Skeleton';
import DisplacementRegions from './DisplacementRegions';
import DisplacementNeeds from './DisplacementNeeds';
import DisplacementTriggers from './DisplacementTriggers';
import DisplacementTrend from './DisplacementTrend';
import IconButton from '@mui/material/IconButton';
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import Map from './Map';
import './index.css';
import SubscriptionForm from '../../applications/EmailSubscription';
import Footer from 'src/components/Footer';
import FilterDrawer from '../../../components/FilterDrawer';
import useFetch from '../../../useFetch';
import InternallyDisplacedIcon from 'src/assets/Internally-displaced.png';

function DashboardMain() {
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
  // const [isLoading, setIsLoading] = useState(false); 
  const [query, setQuery] = useState('');  

  const [state, setState] = useState({
    todaysDate: new Date(),
    startDate: startDate(7),
    endDate: new Date().toLocaleDateString(),
  });

  const [filters, setFilters] = useState({
    filterByDates: false,
    period: '30',
    causes: [],
    needs: [],
    currentRegions: [],
    currentDistricts: [],
    previousRegions: [],
    previousDistricts: [],
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
    } else if (target === 'CurrentRegions') {
      setFilters((prevState) => ({
        ...prevState,
        currentRegions: value,
      }));
    } else if (target === 'CurrentDistricts') {
      setFilters((prevState) => ({
        ...prevState,
        currentDistricts: value,
      }));
    } else if (target === 'PreviousRegions') {
      setFilters((prevState) => ({
        ...prevState,
        previousRegions: value,
      }));
    } else if (target === 'PreviousDistricts') {
      setFilters((prevState) => ({
        ...prevState,
        previousDistricts: value,
      }));
    } else if (target === 'Needs') {
      setFilters((prevState) => ({
        ...prevState,
        needs: value,
      }));
    } else if (target === 'Causes') {
        setFilters((prevState) => ({
          ...prevState,
          causes: value,
        }));
      }
  }

  useEffect(() => {
    let cregions = filters.currentRegions.length ? filters.currentRegions.join(',') : 'All';
    let cdistricts = filters.currentDistricts.length ? filters.currentDistricts.join(',') : 'All';
    let pregions = filters.previousRegions.length ? filters.previousRegions.join(',') : 'All';
    let pdistricts = filters.previousDistricts.length ? filters.previousDistricts.join(',') : 'All'
    let needs = filters.needs.length ? filters.needs.join(',') : 'All';
    let causes = filters.causes.length ? filters.causes.join(',') : 'All';
    
    if (filters.filterByDates) {
      setQuery(`${cregions}/${cdistricts}/${pregions}/${pdistricts}/${needs}/${causes}/d/${dateStr(filters.start)}/${dateStr(filters.end)}`);
    } else {
      setQuery(`${cregions}/${cdistricts}/${pregions}/${pdistricts}/${needs}/${causes}/${filters.period}D`)
    }
  
  }, [dateStr, filters]);

  const url = query && `${process.env.REACT_APP_API_URL}/api/displacement-data/${query}`;
  
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

  const SkeletonWrapper = () => {
    return(
      <Card>
        <CardHeader>
          <Skeleton variant="text" />
        </CardHeader>
        <Divider />
        <CardContent>
          <Skeleton variant="rectangular" height={218} width='100%' sx={{ color: 'secondary.light', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>loading...</Skeleton>
        </CardContent>
      </Card>
    )
  }
 
  console.log("start date", filters.start);
  console.log("end date", filters.end);

  return (
    <>
      <Helmet>
        <title>PRMN Dashboard</title>
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
                            <FilterAltTwoToneIcon />
                        </IconButton>
                    }
                    title={loading ? <Skeleton variant="text" width={150} /> : <> <Typography variant="h1" color="secondary">{Number(data.total_arrivals).toLocaleString('en')} </Typography> </> }
                    subheader={loading ? <Skeleton variant="text" width={300} /> : <> displaced between dates {filters.filterByDates ? dateStr(filters.start, 'en-GB') : state.startDate} to {filters.filterByDates ? dateStr(filters.end, 'en-GB') : state.endDate }</> }
                />
            </Card>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  {loading ? (
                    <SkeletonWrapper />
                    ) : (
                    <Card>
                        <CardHeader title="Top Regions" />
                        <Divider />
                        <CardContent>
                            <DisplacementRegions data={data} />
                        </CardContent>
                    </Card>
                  )}
                </Grid>
                <Grid item xs={12} md={4}>
                  {loading ? (
                    <SkeletonWrapper />
                    ) : (
                    <Card>
                        <CardHeader title="Top Needs" />
                        <Divider />
                        <CardContent>
                            <DisplacementNeeds data={data} />
                        </CardContent>
                    </Card>
                    )}
                </Grid>
                <Grid item xs={12} md={4}>
                  {loading ? (
                    <SkeletonWrapper />
                    ) : (
                    <Card>
                        <CardHeader title="Top Causes" />
                        <Divider />
                        <CardContent>
                            <DisplacementTriggers data={data} />
                        </CardContent>
                    </Card>
                  )}
                </Grid>
            </Grid>
            
          </Grid>
          <Grid item xs={12} md={12} mb={1}>
            <Stack spacing={2}>
                <Card>
                    <Map data={data} viewport={state.viewport} setState={setState} />           
                </Card>
            </Stack>
        </Grid>
       
        </Grid>
        <Grid container spacing={2}>
         <Grid item xs={12} md={7}>
          {loading ? (
            <SkeletonWrapper />
            ) : (
            <Card>
              <CardHeader title="Weekly Displacement Trend" />
              <Divider />
              <CardContent>
                <DisplacementTrend data={data}/>
              </CardContent>
            </Card>
          )}
          </Grid>
          <Grid item xs={12} md={5}>
            <Card>
              <CardHeader title="Get Email Alerts" />
              <Divider />
              <CardContent>
                <SubscriptionForm type="displacement" />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        </Box>
      <Footer />
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

export default DashboardMain;
