import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert';
//import TransferWithinAStationTwoToneIcon from '@mui/icons-material/TransferWithinAStationTwoTone';
import Skeleton from '@mui/material/Skeleton';
import DisplacementLocations from './DisplacementLocations';
import DisplacementNeeds from './DisplacementNeeds';
import DisplacementTriggers from './DisplacementTriggers';
import DisplacementTrend from './DisplacementTrend';
import IconButton from '@mui/material/IconButton';
import TuneTwoToneIcon from '@mui/icons-material/TuneTwoTone';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import Tooltip from '@mui/material/Tooltip';
import Map from './Map';
import './index.css';
import SubscriptionForm from '../../applications/EmailSubscription';
import Footer from '../../../components/Footer';
import FilterDrawer from '../../../components/FilterDrawer';
import useFetch from '../../../useFetch';
import InternallyDisplacedIcon from '../../../assets/Internally-displaced.png';

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

  
  const handleFilterChange = (target, value) => {
    console.log('target', target, value)
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
      setQuery(`${cregions}/${cdistricts}/${pregions}/${pdistricts}/${encodeURIComponent(encodeURIComponent(needs))}/${encodeURIComponent(encodeURIComponent(causes))}/d/${dateStr(filters.start)}/${dateStr(filters.end)}`);
    } else {
      setQuery(`${cregions}/${cdistricts}/${pregions}/${pdistricts}/${encodeURIComponent(encodeURIComponent(needs))}/${encodeURIComponent(encodeURIComponent(causes))}/${filters.period}D`)
    }
  
  }, [dateStr, filters]);

  const url = query && `/api/displacement-data/${query}`;
  const geoData = true;
  
  const {
    loading,  
    error,
    data
  } = useFetch(url, geoData);
    

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
    
    <React.Fragment>
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
          <Card>
            {error && <Alert severity={"error"} >{error}</Alert>}
                <CardHeader
                  avatar={
                    <img src={InternallyDisplacedIcon} alt="" width={75} />
                    }
                    action={
                      <Tooltip
                        PopperProps={{
                          disablePortal: true,
                          // sx: {
                          //   "& .MuiTooltip-tooltip": {
                          //     backgroundColor: theme.palette.text.secondary,
                          //   }
                          // }
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
                    title={loading ? <Skeleton variant="text" width={150} /> : <React.Fragment> <Typography variant="h1" color="secondary">{Number(data.total_arrivals).toLocaleString('en')} </Typography> </React.Fragment> }
                    subheader={ 
                      loading ? 
                        <Skeleton variant="text" width={300} /> 
                      : 
                        <React.Fragment> 
                          Reporting on arrival, IDPs displaced between {filters.filterByDates ? dateStr(filters.start, 'en-GB') : state.startDate} - {filters.filterByDates ? dateStr(filters.end, 'en-GB') : state.endDate }
                          {(filters.currentRegions.length || filters.currentDistricts.length || filters.previousRegions.length || filters.previousDistricts.length) ?  <React.Fragment><br /> <strong>Locations:</strong></React.Fragment> : ''}
                          {filters.currentRegions.length ? <React.Fragment> Current regions:  [{filters.currentRegions.join(',')}] </React.Fragment>: ''}
                          {filters.currentDistricts.length ? <React.Fragment> Current districts:  [{filters.currentDistricts.join(', ')}] </React.Fragment> : ''}
                          {filters.previousRegions.length ?  <React.Fragment> Previous regions: [{filters.previousRegions.join(',')}]  </React.Fragment>: ''}
                          {filters.previousDistricts.length ? <React.Fragment> Previous districts: [{filters.previousDistricts.join(',')}] </React.Fragment>: ''}
                          {filters.needs.length ? <React.Fragment><br /> <strong>Needs</strong>: [{filters.needs.join(',')}] </React.Fragment>: ''}
                          {filters.causes.length ? <React.Fragment> <strong>Causes:</strong> [{filters.causes.join(',')}] </React.Fragment>: ''}
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
                          title={`Top ${data.top_locations_category}`}
                          action={
                            <Tooltip
                              title={`Top 5 ${data.top_locations_category} that reported most IDPs arrivals.`}
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
                            <DisplacementLocations
                              data={data} 
                              category={data.top_locations_category} 
                              handleFilterChange={handleFilterChange}
                            />
                        </CardContent>
                        <CardActions disableSpacing>
                          <IconButton 
                            onClick={()=>handleFilterChange(
                              data.top_locations_category==="Districts" ? "CurrentRegions"
                              : data.top_locations_category==="Settlements" ? "CurrentDistricts"
                              : "CurrentRegions", 
                              [])} aria-label="Reset">
                            <RestartAltOutlinedIcon />
                          </IconButton>
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
                          title="Top Needs" 
                          action={
                            <Tooltip
                            title={`Top 5 humanitarian needs based on survey done on IDPs on arrival in their settlements.`}
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
                            <DisplacementNeeds 
                              data={data}
                              handleFilterChange={handleFilterChange}
                          />
                        </CardContent>
                        <CardActions disableSpacing>
                          <IconButton 
                            onClick={()=>handleFilterChange(
                              "Needs", 
                              [])} aria-label="Reset">
                            <RestartAltOutlinedIcon />
                          </IconButton>
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
                          title="Top Reasons" 
                          action={
                            <Tooltip
                            title={`Top reasons that caused IDPs to be displaced from their previous locations.`}
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
                            <DisplacementTriggers 
                              data={data}
                              handleFilterChange={handleFilterChange}
                            />
                        </CardContent>
                        <CardActions disableSpacing>
                          <IconButton 
                            onClick={()=>handleFilterChange(
                              "Causes", 
                              [])} aria-label="Reset">
                            <RestartAltOutlinedIcon />
                          </IconButton>
                    </CardActions>
                    </Card>
                  )}
                </Grid>
            </Grid>
            
          </Grid>
          <Grid item xs={12} md={12} mb={1}>
            <Stack spacing={2}>
                <Card>
                    <Map 
                      data={data} 
                      viewport={state.viewport} 
                      setState={setState}
                      handleFilterChange={handleFilterChange}
                    />           
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
                title="Weekly Displacement Trend"
                action={
                  <Tooltip
                  title="Trend on IDP displacement on weekly basis."
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
    </React.Fragment>
  );
}

export default DashboardMain;
