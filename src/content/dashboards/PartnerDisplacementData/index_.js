import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import TransferWithinAStationTwoToneIcon from '@mui/icons-material/TransferWithinAStationTwoTone';
import Skeleton from '@mui/material/Skeleton';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import { red } from '@mui/material/colors';
import { DEFAULT_VIEWPORT } from '../../../constants';

import './index.css';

import Footer from 'src/components/Footer';
import FilterDrawer from '../../../components/FilterDrawer';


function PartnerDisplacementData() {
  const date = new Date();
  const daysAgo = new Date(date.getTime());
  const dateStr = (myDate = date, format='en-US') => myDate.toLocaleDateString(format).replace(/\//g, '-');
  const startDate = (period) => new Date(daysAgo.setDate(date.getDate() - period)).toLocaleDateString()
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);   

  const columns = [
    { field: 'CurentRegion', headerName: 'Current Region', width: 130 },
    { field: 'CurrentDistrict', headerName: 'Current District', width: 130 },
    { field: 'CurrentSettlement', headerName: 'Current Settlement', width: 130 },
    { field: 'PreviousRegion', headerName: 'Previous Region', width: 130 },
    { field: 'PreviousDistrict', headerName: 'Previous District', width: 130 },
    { field: 'PreviousSettlement', headerName: 'Previous Settlement', width: 130 },
    { field: 'AllPeople', headerName: 'Number of People', width: 130 },
    { field: 'Arrival', headerName: 'Arrival Date', width: 130 },
    { field: 'Week', headerName: 'yrWeek', width: 130 },
    { field: 'Reason', headerName: 'Reason', width: 130 },
    { field: 'Need1', headerName: 'Priority Need1', width: 130 },
    { field: 'Need2', headerName: 'Priority Need2', width: 130 },
    { field: 'Men', headerName: 'Men', width: 130 },
    { field: 'Women', headerName: 'Women', width: 130 },
    { field: 'ElderlyMen', headerName: 'Elderly Men', width: 130 },
    { field: 'ElderlyWomen', headerName: 'Elderly Women', width: 130 },
    { field: 'Boys', headerName: 'Boys', width: 130 },
    { field: 'Girls', headerName: 'Girls', width: 130 },
    { field: 'TotalM', headerName: 'Total Men', width: 130 },
    { field: 'TotalF', headerName: 'Total Women', width: 130 },
    { field: 'IntraRegion', headerName: 'Intra Region', width: 130 },
  ];

 const [tableData, setTableData] = useState({})
  const [state, setState] = useState({
    viewport: DEFAULT_VIEWPORT,
    data: {},
    todaysDate: new Date(),
    startDate: startDate(7),
    endDate: new Date().toLocaleDateString(),
  });

  const [filters, setFilters] = useState({
    filterByDates: false,
    period: '7',
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

  
 
  console.log("data", state.data);
 

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
                    title="Displacement Snapshot"
                    subheader={isLoading ? <Skeleton variant="text" width={300} /> : `${Number(state.data.total_arrivals).toLocaleString('en')} displaced between dates  ${filters.filterByDates ? dateStr(filters.start, 'en-GB') : state.startDate} to ${filters.filterByDates ? dateStr(filters.end, 'en-GB') : state.endDate }`}
                />
            </Card>
            <Grid container spacing={2}>
              <div style={{ height: 800, width: '98%', marginLeft: 20, marginTop: 30 }}>
                <DataGrid
                    getRowId={(row) => row.key}
                    rows={tableData}
                    columns={columns}
                    pageSize={25}
                    rowsPerPageOptions={[25]}
                />
              </div>
                
            </Grid>
            
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

export default PartnerDisplacementData;
