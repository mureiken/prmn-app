import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import ViolationCategories from './ViolationCategories';
import ViolationResponses from './ViolationResponses';
import ViolationPerpetrators from './ViolationPerpetrators';
import ViolationTrend from './ViolationTrend';
import IconButton from '@mui/material/IconButton';
import TuneTwoToneIcon from '@mui/icons-material/TuneTwoTone';
import Map from './Map';
import './index.css';
import SubscriptionForm from '../../applications/EmailSubscription';
import ProtectionIcon from '../../../assets/Abduction-kidnapping.png';
import Footer from '../../../components/Footer';
import FilterDrawer from '../../../components/FilterDrawer';
import useFetch from '../../../useFetch';

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
  //const [isLoading, setIsLoading] = useState(false);  
  const [query, setQuery] = useState('');  
  const [state, setState] = useState({
    data: {},
    todaysDate: new Date(),
    startDate: new Date(daysAgo.setDate(date.getDate() - 7)).toLocaleDateString(),
    endDate: new Date().toLocaleDateString(),
  });

  const [filters, setFilters] = useState({
    filterByDates: false,
    period: '30',
    violations: [],
    perpetrators: [],
    regions: [],
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

  const url = query && `/api/protection-data/${query}`
  
  const {
    loading,  
    error,
    data
  } = useFetch(url)
    

  // useEffect(() => {
  //   let getUrl = () => {
  //     let regions = filters.regions.length ? filters.regions.join(',') : 'All';
  //     let violations = filters.violations.length ? filters.violations.join(',') : 'All';
  //     let perpetrators = filters.perpetrators.length ? filters.perpetrators.join(',') : 'All';
  //     return `/api/protection-data/${filters.period}D/${regions}/${violations}/${perpetrators}`
  //   }

  //   const getProtectiontData = async () => {
  //     setIsLoading(true);
  //     const res = await fetch(getUrl());
  //     const data = await res.json();
  //     setState((prevState) => ({
  //       ...prevState,
  //       data: data,
  //     }));
  //     setIsLoading(false);
  //   };

  //   console.log("Data: ")
  //   getProtectiontData().catch(console.error);
  // }, [filters]);

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
                    <img src={ProtectionIcon} alt="Protection Dashboard Icon" width={50}/>
                    }
                    action={
                        <IconButton aria-label="settings"  onClick={handleDrawerOpen}>
                            <TuneTwoToneIcon />
                        </IconButton>
                    }
                    title={loading ? <Skeleton variant="text" width={100} /> : <><Typography variant="h1"  color="secondary">{Number(data.total_violation_cases).toLocaleString('en')} </Typography></>}
                    subheader={loading ? <Skeleton variant="text" width={300} /> : <> violation cases between dates  {state.startDate} - {state.endDate}</>}
                />
            </Card>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                {loading ? (
                  <SkeletonWrapper />
                  ) : (
                    <Card>
                        <CardHeader title="Top Violation Categories" />
                        <Divider />
                        <CardContent>
                            <ViolationCategories data={data} />
                        </CardContent>
                    </Card>
                  )}
                </Grid>
                <Grid item xs={12} md={4}>
                {loading ? (
                  <SkeletonWrapper />
                  ) : (
                    <Card>
                        <CardHeader title="Top Protection Responses" />
                        <Divider />
                        <CardContent>
                            <ViolationResponses data={data} />
                        </CardContent>
                    </Card>
                  )}
                </Grid>
                <Grid item xs={12} md={4}>
                {loading ? (
                  <SkeletonWrapper />
                  ) : (
                    <Card>
                        <CardHeader title="Top Violation Perpetrators" />
                        <Divider />
                        <CardContent>
                            <ViolationPerpetrators data={data} />
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
              <CardHeader title="Weekly Protection Cases Trend" />
              <Divider />
              <CardContent>
                <ViolationTrend data={data} />
              </CardContent>
            </Card>
          )}
          </Grid>
          <Grid item xs={12} md={5}>
            <Card>
              <CardHeader title="Get Email Alerts" />
              <Divider />
              <CardContent>
                <SubscriptionForm type="protection" />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        </Box>
      <Footer />
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

export default DashboardMain;
