import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Nrc from './images/NRCLogoFull.png';
import Cerf from './images/cerf.png';
import Denmark from './images/denmark.png';
import Echo from './images/echo.png';
import Eu from './images/eu.png';
import France from './images/france.png';
import Germany from './images/germany.png';
import Italy from './images/italy.png';
import Japan from './images/japan.png';
import Koica from './images/koica.png';
import SouthKorea from './images/south-korea.png';
import Sweden from './images/sweden.png';
import Uae from './images/uae.png';
import Unhabitat from './images/unhabitat.png';
import Unpbso from './images/unpbso_1.png';
import Usa from './images/usa.png';

export default function DonorImageList() {
    return (
        <Box sx={{ width: 1 , display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Box>
                <Stack>
                    Partner.
                </Stack>
                <Stack>
                    <img src={Nrc} alt="NRC" style={{ height: '34px', width: 'auto' }} />
                </Stack>
            </Box>
            <Box>
                <Stack>
                    UNHCR is grateful for the generous contributions of donors who have directly contributed to the UNHCR Somalia Operation.
                </Stack>
                <Stack sx={{ display: 'flex', flexDirection: 'row', marginRight: 2 }}>
                    <img src={Cerf} alt="United Nations CERF" style={{ height: '34px', width: 'auto' }} />
                    <img src={Denmark} alt="Denmark" style={{ height: 34, width: 'auto' }}/>
                    <img src={Echo} alt="Echo" style={{ height: 34, width: 'auto' }}/>
                    <img src={Eu} alt="EU" style={{ height: 34, width: 'auto' }} />
                    <img src={France} alt="France" style={{ height: 34, width: 'auto' }} />
                    <img src={Germany} alt="Germany" style={{ height: 34, width: 'auto' }} />
                    <img src={Italy} alt="Italy" style={{ height: 34, width: 'auto' }} />
                    <img src={Japan} alt="Japan" style={{ height: 34, width: 'auto' }} />
                    <img src={Koica} alt="KOICA" style={{ height: 34, width: 'auto' }} />
                    <img src={SouthKorea} alt="South Korea" style={{ height: 34, width: 'auto' }} />
                    <img src={Sweden} alt="Sweden" style={{ height: 34, width: 'auto' }} />
                    <img src={Uae} alt="UAE" style={{ height: 34, width: 'auto' }} />
                    <img src={Unhabitat} alt="UN-HABITAT" style={{ height: 34, width: 'auto' }} />
                    <img src={Unpbso} alt="UN Peace Building Fund" style={{ height: 34, width: 'auto' }} />
                    <img src={Usa} alt="United States of America" style={{ height: 34, width: 'auto' }}/>
                </Stack>
            </Box>
        </Box>
    );
  }
  
  