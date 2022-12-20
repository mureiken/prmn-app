import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
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
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
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
    (myDate = date) => {
      return myDate.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'}).replace(/\//g, '-');
    },
    [date],
  );
  
  const startDate = (period) => new Date(daysAgo.setDate(date.getDate() - period+1)).toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'})
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  //const [isLoading, setIsLoading] = useState(false);  
  const [query, setQuery] = useState('');  
  const [state, setState] = useState({
    data: {},
    todaysDate: new Date(),
    startDate: new Date(daysAgo.setDate(date.getDate() - 7)).toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'}),
    endDate: new Date().toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'}),
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

  const url = query && `/api/protection-data/${query}`;
  const geoData = true;
  
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
           <Grid item xs={12} sx={{ mb: 1, position: 'sticky', top: 0, zIndex: 1, opacity: 0.9 }}>
            <Card sx={{ mb: 1 }}>
            {error && 
              <Alert severity={"error"} >
              {
                error.includes("Unexpected token") ?
                  "Error - Please try again later."
                :
                  isNaN(Number(data.total_violation_cases)) ?
                    "No protection cases found for the selected period"
                :
                  error
              } 
              </Alert>
          }
                <CardHeader
                avatar={
                    <img src={ProtectionIcon} alt="Protection Dashboard Icon" width={50}/>
                    }
                    action={
                      <Tooltip
                        PopperProps={{
                          disablePortal: true,
                        }}
                    
                        open="open"
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        title="Use filter to query data on dashboard"
                        placement="left"
                        arrow
                        >
                        <IconButton aria-label="settings"  onClick={handleDrawerOpen}>
                            <TuneTwoToneIcon />
                        </IconButton>
                      </Tooltip>
                    }
                    title={loading ? <Skeleton variant="text" width={100} /> : 
                      <>
                        <Typography variant="h1"  color="secondary">
                        {
                          isNaN(Number(data.total_violation_cases)) ?
                            0
                          :
                          Number(data.total_violation_cases).toLocaleString('en')
                        } 
                        </Typography>
                      </>
                    }
                    subheader={ 
                      loading ? 
                        <Skeleton variant="text" width={300} /> 
                      : 
                        <React.Fragment> 
                          Violation cases between dates {filters.filterByDates ? dateStr(filters.start, 'en-GB') : state.startDate} - {filters.filterByDates ? dateStr(filters.end, 'en-GB') : state.endDate }
          
                          {filters.regions.length ? <React.Fragment> Violation regions:  [{filters.regions.join(',')}] </React.Fragment>: ''}
                          {filters.violations.length ? <React.Fragment><br /><strong>Violation Categories</strong>: [{filters.violations.join(',')}] </React.Fragment>: ''}
                          {filters.perpetrators.length ? <React.Fragment><br /><strong>Perpetrator Groups:</strong> [{filters.perpetrators.join(',')}] </React.Fragment>: ''}
                        </React.Fragment> 
                      }
                    />
            </Card>
            </Grid>
            <Grid item xs={12}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                {loading ? (
                  <SkeletonWrapper />
                  ) : (
                    <Card>
                        <CardHeader 
                          title="Top Violation Categories" 
                          action={
                            <Tooltip
                              title="Top 5 Violation categories based on reports by victims.Click on chart element to filter data."
                              placement="left-end"
                              arrow
                            >
                              <IconButton aria-label="help">
                                <HelpOutlineOutlinedIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          }
                        />
                        <Divider />
                        <CardContent>
                            <ViolationCategories 
                              data={data}
                              handleFilterChange={handleFilterChange}
                            />
                        </CardContent>
                        <CardActions disableSpacing>
                          <Tooltip
                              title="Reset filter"
                              placement="left-end"
                              arrow
                          >
                            <IconButton 
                              onClick={()=>handleFilterChange(
                                "Violations", 
                                [])} aria-label="Reset">
                              <RestartAltOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        </CardActions>
                    </Card>
                  )}
                </Grid>
                <Grid item xs={12} md={4}>
                {loading ? (
                  <SkeletonWrapper />
                  ) : (
                    <Card>
                        <CardHeader 
                          title="Top Protection Responses"
                          action={
                            <Tooltip
                              title="Top 5 protection responses after violation cases where reported."
                              placement="left-end"
                              arrow
                            >
                              <IconButton aria-label="help">
                                <HelpOutlineOutlinedIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          }
                        />
                        <Divider />
                        <CardContent>
                          <ViolationResponses 
                            data={data}
                            handleFilterChange={handleFilterChange}
                          />
                        </CardContent>
                    </Card>
                  )}
                </Grid>
                <Grid item xs={12} md={4}>
                {loading ? (
                  <SkeletonWrapper />
                  ) : (
                    <Card>
                        <CardHeader 
                          title="Top Violation Perpetrators"
                          action={
                            <Tooltip
                              title="Top perpetrators groups that affected victims. Click on chart element to filter data"
                              placement="left-end"
                              arrow
                            >
                              <IconButton aria-label="help">
                                <HelpOutlineOutlinedIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          }
                        />
                        <Divider />
                        <CardContent>
                            <ViolationPerpetrators 
                              data={data}
                              handleFilterChange={handleFilterChange}
                            />
                        </CardContent>
                        <CardActions disableSpacing>
                          <Tooltip
                            title="Reset filter"
                            placement="left-end"
                            arrow
                          >
                            <IconButton 
                              onClick={()=>handleFilterChange(
                                "Perpetrators", 
                                [])} aria-label="Reset">
                              <RestartAltOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        </CardActions>
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
              <CardHeader 
                title="Weekly Protection Cases Trend"
                action={
                  <Tooltip
                    title="Trend of total violation cases on week by week basis."
                    placement="left-end"
                    arrow
                  >
                    <IconButton aria-label="help">
                      <HelpOutlineOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                }
              />
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
