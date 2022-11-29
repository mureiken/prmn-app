// import React, { useState, useEffect } from 'react';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import Skeleton from '@mui/material/Skeleton';
// import Alert from '@mui/material/Alert';
import PublicationCards from './PublicationCards'

// import useFetch from '../../../useFetch';

function PostPublications() {
  
//   const [query, setQuery] = useState('');  


//   useEffect(() => {
    
//   }, []);


//   const url = "api/donors";
//   const geoData = false;
  
//   const {
//     loading,  
//     error,
//     data
//   } = useFetch(url, geoData)
    

  return (
    <React.Fragment>
      <Helmet>
        <title>Post Publications</title>
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
                <PublicationCards />
            </div>
        </Grid>
      </Box>
    </React.Fragment>
    );
}

export default PostPublications;
