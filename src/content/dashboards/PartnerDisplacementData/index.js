import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import TransferWithinAStationTwoToneIcon from '@mui/icons-material/TransferWithinAStationTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import { red } from '@mui/material/colors';
import FilterDrawer from '../../../components/FilterDrawer';

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
        fetchUrl = `/api/partner-displacement-data/${regions}/${needs}/${causes}/d/${dateStr(filters.start)}/${dateStr(filters.end)}`
      } else {
        fetchUrl =  `/api/partner-displacement-data/${regions}/${needs}/${causes}/${filters.period}D`
      }
      console.log("fetchUrl: ",fetchUrl);
      return fetchUrl
    }

    const getDisplacementData = async () => {
      setIsLoading(true);
      const res = await fetch(getUrl());
      const data = await res.json();
      setTableData(data);
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


  
console.log('ddd ', tableData)
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
                    title="Displacement Data"
                    subheader={isLoading ? <Skeleton variant="text" width={300} /> : `Displacement between dates  ${filters.filterByDates ? dateStr(filters.start, 'en-GB') : state.startDate} to ${filters.filterByDates ? dateStr(filters.end, 'en-GB') : state.endDate }`}
                />
            </Card>
            <Grid container spacing={2}>
              <div style={{ height: 800, width: '98%', marginLeft: 20, marginTop: 30 }}>
                <DataTable displacementData={tableData} />
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
