import { useContext, useState } from 'react';

import {
  Box,
  alpha,
  // Stack,
  lighten,
  // Divider,
  IconButton,
  Tooltip,
  styled,
  useTheme
} from '@mui/material';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { SidebarContext } from '../../../contexts/SidebarContext';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import Hidden from '@mui/material/Hidden';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import HeaderButtons from './Buttons';
import HeaderUserbox from './Userbox';
import HeaderMenu from './Menu';
import Logo from '../../../components/Logo';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 6;
        background-color: ${alpha(theme.header.background, 0.95)};
        backdrop-filter: blur(3px);
        position: fixed;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: ${theme.sidebar.width};
            width: auto;
        }
`
);

function Header() {
  const { mobileMenuToggle } = useContext(SidebarContext);
  const theme = useTheme();

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <HeaderWrapper
      display="flex"
      alignItems="center"
      sx={{
        boxShadow:
          theme.palette.mode === 'dark'
            ? `0 1px 0 ${alpha(
              lighten(theme.colors.primary.main, 0.7),
              0.15
            )}, 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)`
            : `0px 2px 8px -3px ${alpha(
              theme.colors.alpha.black[100],
              0.2
            )}, 0px 5px 22px -4px ${alpha(
              theme.colors.alpha.black[100],
              0.1
            )}`
      }}
    >
    <Box display="flex" justifyContent="space-between">
      <Box sx={{ display: {xs: 'block', md: 'none'} }}>
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
      </Box>
      <Hidden mdDown>
        <HeaderMenu />
      </Hidden>
      </Box>
      <Box display="flex" alignItems="center">
        <HeaderButtons />
        <HeaderUserbox />
        <Box
          component="span"
          sx={{
            ml: 2,
            display: { lg: 'none', xs: 'inline-block' }
          }}
        >
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
      </Box>
    </HeaderWrapper>
  );
}

export default Header;
