import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles';

import DonorImageList from './Donors'
import useFetch from '../../useFetch';

const FooterWrapper = styled(Grid)(
  ({ theme }) => `
        border-radius: 0;
        margin: ${theme.spacing(3)} 37px;
`
);



function Footer() {

  const url = '/api/donors';
  const geoData = false;

  const {
    loading,  
    error,
    data
  } = useFetch(url, geoData);

  return (
    <FooterWrapper xs>
        <DonorImageList loading={loading} error={error} data={data} />
        <Box
          mt={5}
          px={8}
          display={{ xs: 'block', md: 'flex' }}
          alignItems="center"
          textAlign={{ xs: 'center', md: 'left' }}
        >
          
          <Box>
            <Typography variant="subtitle1">
              &copy; 2022 - PRMN Portal
            </Typography>
          </Box>
        </Box>
    </FooterWrapper>
  );
}

export default Footer;
