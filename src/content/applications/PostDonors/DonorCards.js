import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { lighten } from '@mui/material';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import Modal from './SubmitFormModal'

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

function DonorCards() {

    const [state, setState] = useState({
        isOpen: false,
        donors: [],
        refresh: false
      });
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
  

  const handleDelete = (id) => {
    fetch(`/api/donors/${id}`, {
      method: 'delete',
      "headers": {
        "Content-Type": "application/json",
      },

    }).then(response => {
      if (!response.ok) {
          console.log(response);
        } else {
          const result = response.json();
          handleChange(true);
          return result;
        }
    })
  .catch(error => {
      console.log(error);

  })
    
  };

  const handleOpen = () => {
    setState((prevState) => {
      return {
        ...prevState,
        isOpen: true,
      };
    });
  };

  const handleClose = () => {
    setState((prevState) => {
      return {
        ...prevState,
        isOpen: false,
      };
    });
  };

  const handleChange = ( isSubmitted ) => {
    if (isSubmitted) {
      setState((prevState) => {
        return {
          ...prevState,
          refresh: true,
        };
      });
    }
  }

  useEffect(() => {
    const fetchData =  () => {
      setLoading(true);
      try {
        fetch('/api/donors')
        .then((response) => response.json())
            .then((data) => {
              setState((prevState) => {
                return {
                  ...prevState,
                  donors: data,
                };
              });
            })
      } catch (error) {
       console.log(error);
       setError(true);
      }
    };
    fetchData();
    setLoading(false);
  }, [state.refresh]);
  

 
    

  const SkeletonWrapper = () => {
    return(
      <Card>
        <CardHeader>
          <Skeleton variant="text" />
        </CardHeader>
        <Divider />
        <CardContent>
          <Skeleton variant="rectangular" height={218} width='100%' sx={{ color: 'secondary.light', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>loading...</Skeleton>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader
        subheader={'Donor logos appears at the footer of the PRMN App'}
        title="Donors"
      />
      {error && <Alert severity={"error"} >{error}</Alert>}
      <Divider />
      <Box p={3}>
        <Grid container spacing={3}>
        {loading ? (
          <SkeletonWrapper />
          ) : (
         
            state.donors.map((donor) => (
              <Grid item xs={12} sm={4}>
              <CardCc sx={{ px: 2, pt: 2, pb: 1 }}>
                <Box display="flex" alignItems="center">
                  <CardLogo
                    src={donor.logo_image}
                    alt={donor.donor_name}
                  />
                </Box>
                <Box
                  pt={3}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Tooltip arrow title="Remove this donor">
                    <IconButtonError onClick={() => handleDelete(donor.id)}>
                      <DeleteTwoToneIcon fontSize="small" />
                    </IconButtonError>
                  </Tooltip>
                </Box>
              </CardCc>
            </Grid>
              
            ))
          )}
          <Grid item xs={12} sm={4}>
            <Tooltip arrow title="Click to add a new donor">
              <CardAddAction>
                <CardActionArea sx={{ px: 1 }}>
                  <CardContent>
                    <AvatarAddWrapper>
                    <IconButton onClick={() => handleOpen()}>
                      <AddTwoToneIcon fontSize="large" />
                      </IconButton>
                    </AvatarAddWrapper>
                  </CardContent>
                </CardActionArea>
              </CardAddAction>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
      { <Modal {...state}  handleClose={handleClose} _isSubmitted={handleChange} />}
    </Card>
  );
}

export default DonorCards;
