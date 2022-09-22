import { Box, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        text-decoration: none;
        width: 53px;
        margin: 0 auto;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const LogoSignWrapper = styled(Box)(
  () => `
        width: 52px;
        height: 38px;
`
);


function Logo() {

  return (
    <Tooltip title="PRMN App" arrow>
      <LogoWrapper to="/">
        <LogoSignWrapper>
          
        </LogoSignWrapper>
      </LogoWrapper>
    </Tooltip>
  );
}

export default Logo;
