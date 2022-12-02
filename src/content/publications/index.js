import { Helmet } from 'react-helmet-async';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Publication from './Publication';
import useFetch from '../../useFetch';

import Footer from '../../components/Footer';
function Publications() {

  const url = '/api-content/documents.json?API_KEY=464c9e68-ebc3-4972-81d5-784909c404c1&order[created]=desc&country=som';
  const geoData = false;

  
  const {
    loading,  
    error,
    data
  } = useFetch(url, geoData);

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
        <title>PRMN Publications</title>
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
          {error && <Alert severity={"error"} >{error}</Alert>}
          { loading ? (
            <SkeletonWrapper />
            ) : (
            <Publication publications={data} />
            )}
          </Grid>
        </Grid>
        </Box>
        <Footer />
      </>
  );
}

export default Publications;
