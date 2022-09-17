import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
// import { useRef, useState } from 'react';
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

  // const ref = useRef(null);
  // const [isOpen, setOpen] = useState(false);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

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
              primary="Displacement Report"
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
              primary="Protection Report"
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
    </>
  );
}

export default HeaderMenu;
