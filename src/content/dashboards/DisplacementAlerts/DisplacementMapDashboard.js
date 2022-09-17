import React, { useState, useEffect } from 'react'
import { Box, Grid, Card, CardHeader, CardContent, Divider, Stack } from '@mui/material';
import { DEFAULT_VIEWPORT } from '../../../constants';
import Map from './Map';
import Notifications  from './Notifications';
import './index.css';

function DisplacementAlerts() {

  const [state, setState] = useState({
    viewport: DEFAULT_VIEWPORT,
    data: {features: []},
  });

  useEffect(() => {
    const getDisplacementData = async () => {
      const res = await fetch(
        '/daily_displacement_map'
      );
      const data = await res.json();
      setState((prevState) => ({
        ...prevState,
        data: data,
      }));
    };

    getDisplacementData();
  }, []);

 
  return (
    <>
      <Grid item xs={12} md={7}>
        <Stack spacing={2}>
          <Card>
            <Map data={state.data} viewport={state.viewport} setState={setState} />           
          </Card>
        </Stack>
      </Grid>
      <Grid item xs={12} md={5}>
        <Stack spacing={2}>
          <Card>
            <CardHeader title="Displacement Alerts" />
            <Divider />
            <CardContent>
              <Box
                overflow="auto"
                height="88vh"
                flexDirection="column"
                display="flex"
              >
                <Notifications data={state.data}  setState={setState} />
              </Box>
            </CardContent>
         </Card>
        </Stack>
      </Grid>
    </>
  )
}

export default DisplacementAlerts