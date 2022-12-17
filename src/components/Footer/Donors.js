import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton';
import useMediaQuery from '@mui/material/useMediaQuery'
import Nrc from './images/NRCLogoFull.png';

export default function DonorImageList(props) {

    const largeScreen = useMediaQuery(theme => theme.breakpoints.up('md'));
    
    return (
        <Box sx={{ width: 1 , display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Box>
                <Stack mb={2}>
                    <Typography variant="subtitle2">Partner.</Typography>
                </Stack>
                <Stack>
                    <img src={Nrc} alt="NRC" style={{ height: '44px', width: 'auto' }} />
                </Stack>
            </Box>
            
            <Box sx={{ display: largeScreen ? 'block' : 'none' }}>
                <Stack mb={2}>
                    <Typography variant="subtitle2">UNHCR is grateful for the generous contributions of donors who have directly contributed to the UNHCR Somalia Operation.</Typography>
                </Stack>

                <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
                    { props.oading ? 
                        <Skeleton variant="text" width={300} /> 
                        :
                         !props.error && props.data.map((donor) => 
                            <img 
                                src={donor.logo_image} 
                                alt={donor.donor_name} 
                                title={donor.donor_name} 
                                style={{ 
                                    height: '54px', 
                                    width: 'auto', 
                                    marginRight: 10 
                                }} 
                            />
                        )
                    }
                    
                </Stack>
            </Box>
        </Box>
    );
  }
  
  