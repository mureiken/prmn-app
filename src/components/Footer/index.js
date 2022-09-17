import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles';

import DonorImageList from './Donors'

const FooterWrapper = styled(Box)(
  ({ theme }) => `
        border-radius: 0;
        margin: ${theme.spacing(3)} 0;
`
);

function Footer() {
  return (
    <FooterWrapper>
      
        <DonorImageList />
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
