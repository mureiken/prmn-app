import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const ListWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }
        
        .MuiListItem-root {
            transition: ${theme.transitions.create(['color', 'fill'])};

            
            &.MuiListItem-indicators {
                padding: ${theme.spacing(1, 2)};
            
                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                            height: 4px;
                            width: 22px;
                            opacity: 0;
                            visibility: hidden;
                            display: block;
                            position: absolute;
                            bottom: -10px;
                            transition: all .2s;
                            border-radius: ${theme.general.borderRadiusLg};
                            content: "";
                            background: ${theme.colors.primary.main};
                        }
                    }
                }

                &.active,
                &:active,
                &:hover {
                
                    background: transparent;
                
                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                            }
                        }
                    }
                }
            }
        }
`
);

function HeaderMenu() {

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
      <ListWrapper sx={{ ml: 5}}>
        <List disablePadding component={Box} display="flex">
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/dashboard/displacement-report"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="Displacement"
            />
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/dashboard/protection-report"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="Protection"
            />
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            ref={ref}
            onClick={handleOpen}
          >
          <ListItemText
            primaryTypographyProps={{ noWrap: true }}
            primary={
              <Box display="flex" alignItems="center">
                Dashboards
                <Box display="flex" alignItems="center" pl={0.3}>
                  <ExpandMoreTwoToneIcon fontSize="small" />
                </Box>
              </Box>
            }
          />
        </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/publications"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="Publications"
            />
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/about"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="About"
            />
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/contact"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="Contact"
            />
          </ListItem>
         
        </List>
      </ListWrapper>
      <Menu anchorEl={ref.current} onClose={handleClose} open={isOpen}>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/yearly-displacement">
          Yearly Displacemement
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/bi-protection-dashboard">
          PowerBI Protection Dashboard
        </MenuItem>
      </Menu>
    </>
  );
}

export default HeaderMenu;
