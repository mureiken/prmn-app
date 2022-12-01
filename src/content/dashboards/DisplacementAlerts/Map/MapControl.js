import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';

const MapLegendWrapper = styled(Card)({
    color: 'darkslategray',
    backgroundColor: 'transparent',
    padding: 0,
    borderRadius: 4,
    width: '15%',
    //zIndex: '999 !important',
    position: 'absolute', 
    left: 5,
    marginTop: 5
  });
  
  
  const Legend = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    display: 'flex',
    flexDirection: 'row',
  }));
  
  
const MapControlComponent = ({ handleFilter }) => {
    return (
      <MapLegendWrapper>
          <CardHeader
          sx={{  mb: 1, pb: 0 }}
          title="Legend"
          action={
            <Tooltip
              title="IDPs Settlements"
              placement="left-end"
              arrow
            >
              <IconButton aria-label="help">
                <HelpOutlineOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          }
        />
        <Divider />
        <CardContent>
          <Stack spacing={0}>
            <Legend component="Button" sx={{border: 0}} onClick={()=>handleFilter("Causes", ["Conflict/Insecurity"])}>
              <Avatar 
                sx={{ bgcolor: "#e7646a", width: 24, height: 24, mr: 2 }}>
                    &nbsp;
                </Avatar>
              Conflict/Insecurity
            </Legend>
            <Legend component="Button" sx={{border: 0}} onClick={()=>handleFilter("Causes", ["Drought"])}>
              <Avatar 
                sx={{ bgcolor: "#f7941d", width: 24, height: 24, mr: 2  }}>
                    &nbsp;
                </Avatar>
                Drought
            </Legend>
            <Legend component="Button" sx={{border: 0}} onClick={()=>handleFilter("Causes", ["Flood"])}>
              <Avatar 
                sx={{ bgcolor: "#a07b5e", width: 24, height: 24,  mr: 2 }}>
                    &nbsp;
                </Avatar>
                Flood
            </Legend>
            <Legend component="Button" sx={{border: 0}} onClick={()=>handleFilter("Causes", ["Other"])}>
              <Avatar 
                sx={{ bgcolor: "#c974a2", width: 24, height: 24, mr: 2 }}>
                    &nbsp;
                </Avatar>
                Other
            </Legend>
          </Stack>
        </CardContent>
        <CardActions disableSpacing sx={{  mt: 0, pt: 0 }}>
            <IconButton 
                onClick={()=>handleFilter("Causes", [])} 
                aria-label="Reset">
                <RestartAltOutlinedIcon />
            </IconButton>
        </CardActions>
      </MapLegendWrapper>
    )
  }
  
  export default MapControlComponent;