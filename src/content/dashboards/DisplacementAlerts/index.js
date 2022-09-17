import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar';
import TransferWithinAStationTwoToneIcon from '@mui/icons-material/TransferWithinAStationTwoTone';
import Skeleton from '@mui/material/Skeleton';
import DisplacementRegions from './DisplacementRegions';
import DisplacementNeeds from './DisplacementNeeds';
import DisplacementTriggers from './DisplacementTriggers';
import DisplacementTrend from './DisplacementTrend';
import IconButton from '@mui/material/IconButton';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import { red } from '@mui/material/colors';
import { DEFAULT_VIEWPORT } from '../../../constants';
import Map from './Map';
import './index.css';
import SubscriptionForm from '../../applications/EmailSubscription';

import Footer from 'src/components/Footer';
import FilterDrawer from '../../../components/FilterDrawer';


function DashboardMain() {
  const date = new Date();
  const daysAgo = new Date(date.getTime());
  const dateStr = (myDate = date, format='en-US') => myDate.toLocaleDateString(format).replace(/\//g, '-');
  const startDate = (period) => new Date(daysAgo.setDate(date.getDate() - period)).toLocaleDateString()
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);   


  const [state, setState] = useState({
    viewport: DEFAULT_VIEWPORT,
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
    } else if (target === 'Causes') {
        setFilters((prevState) => ({
          ...prevState,
          causes: value,
        }));
      }
  }

  useEffect(() => {
   
    let getUrl = () => {
      let regions = filters.regions.length ? filters.regions.join(',') : 'All';
      let needs = filters.needs.length ? filters.needs.join(',') : 'All';
      let causes = filters.causes.length ? filters.causes.join(',') : 'All';

      let fetchUrl;
      needs = needs.replace('/', '**');
      causes = causes.replace('/', '**');

      if (filters.filterByDates) {
        fetchUrl = `/api/displacement-data/${regions}/${needs}/${causes}/d/${dateStr(filters.start)}/${dateStr(filters.end)}`
      } else {
        fetchUrl =  `/api/displacement-data/${regions}/${needs}/${causes}/${filters.period}D`
      }
      console.log("fetchUrl: ",fetchUrl);
      return fetchUrl
    }

    const getDisplacementData = async () => {
      setIsLoading(true);
      const res = await fetch(getUrl());
      const data = await res.json();
      setState((prevState) => ({
        ...prevState,
        data: data,
      }));
      setIsLoading(false);
    };

    getDisplacementData().catch(console.error);
  }, [filters]);

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
          <Skeleton variant="rectangular" height={218} />
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
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="total displacement">
                        <TransferWithinAStationTwoToneIcon />
                    </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings"  onClick={handleDrawerOpen}>
                            <SettingsTwoToneIcon />
                        </IconButton>
                    }
                    title="Displacement Snapshot"
                    subheader={isLoading ? <Skeleton variant="text" width={300} /> : <>{Number(state.data.total_arrivals).toLocaleString('en')} displaced between dates {filters.filterByDates ? dateStr(filters.start, 'en-GB') : state.startDate} to {filters.filterByDates ? dateStr(filters.end, 'en-GB') : state.endDate } <Link href="/yearly-displacement" target="_blank"><Typography variant="subtitle2">View yearly displacement dashboard</Typography></Link></> }
                />
            </Card>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  {isLoading ? (
                    <SkeletonWrapper />
                    ) : (
                    <Card>
                        <CardHeader title="Top Regions" />
                        <Divider />
                        <CardContent>
                            <DisplacementRegions data={state.data} />
                        </CardContent>
                    </Card>
                  )}
                </Grid>
                <Grid item xs={12} md={4}>
                  {isLoading ? (
                    <SkeletonWrapper />
                    ) : (
                    <Card>
                        <CardHeader title="Top Needs" />
                        <Divider />
                        <CardContent>
                            <DisplacementNeeds data={state.data} />
                        </CardContent>
                    </Card>
                    )}
                </Grid>
                <Grid item xs={12} md={4}>
                  {isLoading ? (
                    <SkeletonWrapper />
                    ) : (
                    <Card>
                        <CardHeader title="Top Causes" />
                        <Divider />
                        <CardContent>
                            <DisplacementTriggers data={state.data} />
                        </CardContent>
                    </Card>
                  )}
                </Grid>
            </Grid>
            
          </Grid>
          <Grid item xs={12} md={12} mb={1}>
            <Stack spacing={2}>
                <Card>
                    <Map data={state.data} viewport={state.viewport} setState={setState} />           
                </Card>
            </Stack>
        </Grid>
       
        </Grid>
        <Grid container spacing={2}>
         <Grid item xs={12} md={7}>
          {isLoading ? (
            <SkeletonWrapper />
            ) : (
            <Card>
              <CardHeader title="Displacement Trends" />
              <Divider />
              <CardContent>
                <DisplacementTrend data={state.data}/>
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
