import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import SiteLogo from "../../assets/logo.svg";

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        padding: ${theme.spacing(0, 1, 0, 0)};
        display: flex;
        text-decoration: none;
        font-weight: ${theme.typography.fontWeightBold};
`
);


function Logo() {
  return (
    <LogoWrapper to="/">
      <Box
        component="img"
        sx={{
        height: 63,
        }}
        alt="UNHCR Logo"
        src={SiteLogo}
      />
    </LogoWrapper>
  );
}

export default Logo;