import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import HealthAndSafetyTwoToneIcon from '@mui/icons-material/HealthAndSafetyTwoTone';
import Skeleton from '@mui/material/Skeleton';
import ViolationCategories from './ViolationCategories';
import ViolationResponses from './ViolationResponses';
import ViolationPerpetrators from './ViolationPerpetrators';
import ViolationTrend from './ViolationTrend';
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
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);   
  const [state, setState] = useState({
    viewport: DEFAULT_VIEWPORT,
    data: {},
    todaysDate: new Date(),
    startDate: new Date(daysAgo.setDate(date.getDate() - 7)).toLocaleDateString(),
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
    let getUrl = () => {
      let regions = filters.regions.length ? filters.regions.join(',') : 'All';
      let violations = filters.violations.length ? filters.violations.join(',') : 'All';
      let perpetrators = filters.perpetrators.length ? filters.perpetrators.join(',') : 'All';
      return `/api/protection-data/${filters.period}D/${regions}/${violations}/${perpetrators}`
    }

    const getProtectiontData = async () => {
      setIsLoading(true);
      const res = await fetch(getUrl());
      const data = await res.json();
      setState((prevState) => ({
        ...prevState,
        data: data,
      }));
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
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="total number of violation cases">
                        <HealthAndSafetyTwoToneIcon />
                    </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings"  onClick={handleDrawerOpen}>
                            <SettingsTwoToneIcon />
                        </IconButton>
                    }
                    title="Protection Snapshot"
                    subheader={isLoading ? <Skeleton variant="text" width={300} /> : <>{Number(state.data.total_violation_cases).toLocaleString('en')} violation cases between dates  {state.startDate} - {state.endDate} <Link href="/bi-protection-dashboard" target="_blank"><Typography variant="subtitle2">View PowerBI Protection dashboard</Typography></Link></>}
                />
            </Card>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                {isLoading ? (
                  <SkeletonWrapper />
                  ) : (
                    <Card>
                        <CardHeader title="Top Violation Categories" />
                        <Divider />
                        <CardContent>
                            <ViolationCategories data={state.data} />
                        </CardContent>
                    </Card>
                  )}
                </Grid>
                <Grid item xs={12} md={4}>
                {isLoading ? (
                  <SkeletonWrapper />
                  ) : (
                    <Card>
                        <CardHeader title="Top Protection Responses" />
                        <Divider />
                        <CardContent>
                            <ViolationResponses data={state.data} />
                        </CardContent>
                    </Card>
                  )}
                </Grid>
                <Grid item xs={12} md={4}>
                {isLoading ? (
                  <SkeletonWrapper />
                  ) : (
                    <Card>
                        <CardHeader title="Top Violation Causes" />
                        <Divider />
                        <CardContent>
                            <ViolationPerpetrators data={state.data} />
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
              <CardHeader title="Weekly Protection Cases Trend" />
              <Divider />
              <CardContent>
                <ViolationTrend data={state.data} />
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
