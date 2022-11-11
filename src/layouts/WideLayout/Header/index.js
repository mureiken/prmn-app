import { useContext } from 'react';
import Box from '@mui/material/Box';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { SidebarContext } from '../../../contexts/SidebarContext';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import Button from '@mui/material/Button';
import '../../../assets/fonts/arialmt.ttf';
import './index.css';


import HeaderMenu from './Menu';
//import HeaderButtons from './Buttons';
import HeaderUserbox from './Userbox';
import Logo from '../../../components/Logo';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext'

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 5;
        background-color: ${theme.header.background};
        box-shadow: ${theme.header.boxShadow};
        position: fixed;
        justify-content: space-between;
        width: 100%;        
`
);

const MenuWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(0)};
        justify-content: space-between;
`
);


function Header() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const { token, user, logout } = useAuth();
  console.log("Token is: ", token);

  const PRMNLogoText = styled(Box)(
    ({ theme }) => `
          font-family: 'ArialMTMedium';
          font-size: ${theme.typography.pxToRem(18)};
          font-weight: ${theme.typography.fontWeightBold};
  `
  );
  
  return (
    <HeaderWrapper>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Logo />
        </Box>
        <PRMNLogoText sx={{ textAlign: 'right', mt: 2}}>
          <Hidden mdDown>
            Protection & Return Monitoring Network
          </Hidden>
        </PRMNLogoText>
      </Box>
      <MenuWrapper display="flex" flexDirection="row" alignItems="center">
        <Box>
          <Hidden mdDown>
            <HeaderMenu />
          </Hidden>
        </Box>
        <Box>
        { token ? 
          <Box>
            <HeaderUserbox user={user} logout={logout} />
          </Box>
          :
          <Button 
            variant="outlined" 
            sx={{ my: 1, mx: 1.5 }}
            component={NavLink}
            to='/login'
          >
              Login
          </Button>
        }
          <Hidden lgUp>
            <Tooltip arrow title="Toggle Menu">
              <IconButton color="primary" onClick={toggleSidebar}>
                {!sidebarToggle ? <MenuTwoToneIcon /> : <CloseTwoToneIcon />}
              </IconButton>
            </Tooltip>
          </Hidden>
        </Box>
      </MenuWrapper>
    </HeaderWrapper>
  );
}

export default Header;
