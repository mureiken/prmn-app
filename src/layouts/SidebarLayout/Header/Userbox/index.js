import { useRef, useState } from 'react';

import { NavLink } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
  styled
} from '@mui/material';

import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import TransferWithinAStationTwoToneIcon from '@mui/icons-material/TransferWithinAStationTwoTone';
import HealthAndSafetyTwoToneIcon from '@mui/icons-material/HealthAndSafetyTwoTone';
import { SignOutButton }  from '../../../../components/SignOutButton';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox({ logout }) {
  const user =
  {
    name: 'Kamau',
    avatar: '/static/images/avatars/4.jpg',
    jobtitle: 'Project Manager'
  };


  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar variant="rounded" alt={user.name} src={user.avatar} />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user.jobtitle}
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar variant="rounded" alt={user.name} src={user.avatar} />
          <UserBoxText>
            <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user.jobtitle}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
        <ListItem button to="/private/partner-displacement-data" component={NavLink}>
          <TransferWithinAStationTwoToneIcon fontSize="small" />
          <ListItemText primary="Partner Displacement Data" />
        </ListItem>
        <ListItem button to="/private/partner-protection-data" component={NavLink}>
          <HealthAndSafetyTwoToneIcon fontSize="small" />
          <ListItemText primary="Partner Protection Data" />
        </ListItem>
        <ListItem button to="//private/donors" component={NavLink}>
          <AccountBoxTwoToneIcon fontSize="small" />
          <ListItemText primary="Donors" />
        </ListItem>
        <ListItem
          button
          to="/private/publications"
          component={NavLink}
        >
          <AccountTreeTwoToneIcon fontSize="small" />
          <ListItemText primary="Publications" />
        </ListItem>
      </List>
        <Divider />
        <Box component="form" onSubmit={()=>logout()} sx={{ m: 1 }}>
          <SignOutButton />
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserbox;
