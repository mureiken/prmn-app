// import { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardHeader,
  Divider,
  lighten,
  CardActionArea,
  CardContent,
  Tooltip,
  IconButton,
  
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
`
);

const CardLogo = styled('img')(
  ({ theme }) => `
      border: 1px solid ${theme.colors.alpha.black[30]};
      border-radius: ${theme.general.borderRadius};
      padding: ${theme.spacing(1)};
      margin-right: ${theme.spacing(2)};
      background: ${theme.colors.alpha.white[100]};
`
);

const CardAddAction = styled(Card)(
  ({ theme }) => `
        border: ${theme.colors.primary.main} dashed 1px;
        height: 100%;
        color: ${theme.colors.primary.main};
        box-shadow: none;
        
        .MuiCardActionArea-root {
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        
        .MuiTouchRipple-root {
          opacity: .2;
        }
        
        &:hover {
          border-color: ${theme.colors.alpha.black[100]};
        }
`
);

const IconButtonError = styled(IconButton)(
  ({ theme }) => `
     background: ${theme.colors.error.lighter};
     color: ${theme.colors.error.main};
     padding: ${theme.spacing(0.5)};

     &:hover {
      background: ${lighten(theme.colors.error.lighter, 0.4)};
     }
`
);

const CardCc = styled(Card)(
  ({ theme }) => `
     border: 1px solid ${theme.colors.alpha.black[30]};
     background: ${theme.colors.alpha.black[5]};
     box-shadow: none;
`
);

function PublicationCards() {

  const data = {
    savedCards: 1
  };




  const handleDelete = () => {
    
  };

  return (
    <Card>
      <CardHeader
        subheader={data.savedCards + ' saved publications'}
        title="Publications"
      />
      <Divider />
      <Box p={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <CardCc sx={{ px: 2, pt: 2, pb: 1 }}>
              <Box display="flex" alignItems="center">
                <CardLogo
                  src="https://data.unhcr.org/images/documents/c80e8a2c6b1b599b5888179f0a858a49fd678e4d.jpg"
                  alt="UNHCR Somalia PRMN Internal Displacements - 30 April 2022"
                />
                <Box>
                  <Typography variant="h3" fontWeight="normal">
                    UNHCR Somalia PRMN Internal Displacements - 30 April 2022
                  </Typography>
                </Box>
              </Box>
              <Box
                pt={3}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Tooltip arrow title="Remove this publication">
                  <IconButtonError onClick={() => handleDelete()}>
                    <DeleteTwoToneIcon fontSize="small" />
                  </IconButtonError>
                </Tooltip>
              </Box>
            </CardCc>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Tooltip arrow title="Click to add a new publication">
              <CardAddAction>
                <CardActionArea sx={{ px: 1 }}>
                  <CardContent>
                    <AvatarAddWrapper>
                      <AddTwoToneIcon fontSize="large" />
                    </AvatarAddWrapper>
                  </CardContent>
                </CardActionArea>
              </CardAddAction>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

export default PublicationCards;
