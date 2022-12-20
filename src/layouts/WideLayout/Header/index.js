import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { SidebarContext } from '../../../contexts/SidebarContext';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import { SignInButton }  from '../../../components/SignInButton';
import '../../../assets/fonts/arialmt.ttf';
import './index.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import HeaderMenu from './Menu';
import HeaderUserbox from './Userbox';
import Logo from '../../../components/Logo';
import { useAuth } from '../../../contexts/authContext1'
import { useIsAuthenticated } from "@azure/msal-react";
import { NavLink } from 'react-router-dom';

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
  const { mobileMenuToggle } = useContext(SidebarContext);
  const { token, user, logout } = useAuth();
  const isAuthenticated = useIsAuthenticated();
  console.log("Token is: ", token);

  const PRMNLogoText = styled(Box)(
    ({ theme }) => `
          font-family: 'ArialMTMedium';
          font-size: ${theme.typography.pxToRem(18)};
          font-weight: ${theme.typography.fontWeightBold};
  `
  );

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  

  return (
    <HeaderWrapper>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" flexDirection="row-reverse">
           <Box>
              <Logo />
           </Box>
           <Box>
            <Hidden lgUp>
              <Tooltip arrow title="Toggle Menu">
                <IconButton sx={{ mt: 1 }} color="primary" onClick={handleOpenNavMenu}>
                  {!mobileMenuToggle ? <MenuTwoToneIcon /> : <CloseTwoToneIcon />}
                </IconButton>
              </Tooltip>
            </Hidden>
           </Box>
          
        </Box>
        <PRMNLogoText sx={{ textAlign: 'right', mt: 2}}>
          <Hidden mdDown>
            Protection & Return Monitoring Network
          </Hidden>
        </PRMNLogoText>
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        {  isAuthenticated ? 
          <Box>
            <HeaderUserbox user={user} logout={logout} />
          </Box>
          :
          <SignInButton />
        }
       </Box>
      </Box>
      <MenuWrapper display="flex" flexDirection="row" alignItems="center">
        <Box>
          <Hidden mdDown>
            <HeaderMenu />
          </Hidden>
        </Box>
        <Box>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        {  isAuthenticated ? 
          <Box>
            <HeaderUserbox user={user} logout={logout} />
          </Box>
          :
          <SignInButton />
        }
       </Box>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'left', }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: 'block', md: 'none' },}}
           >
          
            <MenuItem component={NavLink} to="/dashboard/displacement-report">
                <Typography textAlign="center">Displacement</Typography>
            </MenuItem>
            <MenuItem component={NavLink} to="/dashboard/protection-report">
                <Typography textAlign="center">Protection</Typography>
            </MenuItem>
            <MenuItem component={NavLink} to="/publications">
                <Typography textAlign="center">Publications</Typography>
            </MenuItem>
            <MenuItem component={NavLink} to="/about">
                <Typography textAlign="center">About</Typography>
            </MenuItem>
            <MenuItem component={NavLink} to="/contcat">
                <Typography textAlign="center">Contact</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </MenuWrapper>
    </HeaderWrapper>
  );
}

export default Header;