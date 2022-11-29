//import React, { useState, useEffect } from 'react';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import DonorCards from './DonorCards'

function PostDonors() {
  return (
    <React.Fragment>
      <Helmet>
        <title>Post Donors</title>
      </Helmet>
      <Box sx={{mx: 5}}>
        <Grid
          container
          justifyContent="center"
          alignItems="stretch"
          spacing={1}
          sx={{ marginTop: 5}}
        >
            <div style={{ height: 800, width: '98%', marginLeft: 20, marginTop: 30 }}>
                <DonorCards />
            </div>
        </Grid>
      </Box>
    </React.Fragment>
    );
}

export default PostDonors;
