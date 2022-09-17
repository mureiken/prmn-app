import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';

import Header from './Header';

const MainWrapper = styled(Box)(
  ({ theme }) => `
        flex: 1 1 auto;
        display: flex;
        height: 100%;
`
);

const MainContent = styled(Box)(
  ({ theme }) => `
        margin-top: ${theme.header.height};
        flex: 1 1 auto;
        overflow: auto;
        padding: 0 0px;
`
);

const SidebarLayout = () => {
  return (
    <>
      <MainWrapper>
        <Header />
        <MainContent>
          <Outlet />
        </MainContent>
      </MainWrapper>
    </>
  );
};

export default SidebarLayout;
