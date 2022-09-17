import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import { REGION_NAMES } from 'src/constants';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export default function SubscribeForm({ type }) {

  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] =useState(false);
  const [success, setSuccess] =useState(false);
  const [values, setValues] = useState([]);
  const [daily, setDaily] = React.useState(true);
  const [weekly, setWeekly] = React.useState(true);
  const [monthly, setMonthly] = React.useState(true);
    
  const handleChange = (event) => {
    event.preventDefault();
    console.log("something changed");
    const {
      target: { value },
    } = event;
    setValues(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleDailyCheck = (event) => {
    setDaily(event.target.checked);
  };

  const handleWeeklyCheck = (event) => {
    setWeekly(event.target.checked);
  };

  const handleMonthlyCheck = (event) => {
    setMonthly(event.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);
    setFeedback("");
    const data = new FormData(e.currentTarget)
    let daily, weekly;
    if (data.get('daily') === 'on') {
        daily=true;
    }
    if (data.get('weekly') === 'on') {
        weekly=true;
    }

    let formData = {
        'email': data.get('email'),
        'organisation':  data.get('organisation'),
        'region':  data.get('region'),
        'report_type': type,
        'daily':  daily,
        'weekly':  weekly,
        'active':  true
      }

      console.log(formData);
    
    fetch('/api/subscribers', {
            method: 'post',
            "headers": {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
          }).then(response => {
            if (!response.ok) {
                console.log(response);
                setError(true);
                setLoading(false);  
                setFeedback("Something went wrong, try again later");
              } else {
                const result = response.json();
                setSuccess(true);
                setFeedback("You are now subscibed to receive email notifications");
                setLoading(false);
                return result;
              }
          })
        .catch(error => {
            console.log(error);
            setError(true);
            setFeedback("Something went wrong, try again later");
            setLoading(false); 
        })
    }
    
  return (
    <Box height={250}>
        <Box component="form" onSubmit={handleSubmit} noValidate>
            { error && <Alert severity={"error"} >{feedback}</Alert> }
            { success && <Alert severity={"info"} >{feedback}</Alert>}
            <Box style={{display: 'flex', flexDirection: 'row'}}>
                <TextField
                    id="email"
                    name="email"
                    label="Email address"
                    defaultValue="joe@doe.com"
                    variant="standard"
                    size="small"
                />
                <TextField
                    id="organisation"
                    name="organisation"
                    label="Organisation"
                    defaultValue="Organisation"
                    variant="standard"
                    size="small"
                    sx={{ marginLeft: 2}}
                />
                <FormControl variant="standard" sx={{ marginLeft: 2, minWidth: 180, maxWidth: 180 }}>
                    <InputLabel id="select-standard-label">Region</InputLabel>
                    <Select
                        labelId="region"
                        multiple
                        id="region"
                        name="region"
                        value={values}
                        onChange={handleChange}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {REGION_NAMES.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={values.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box style={{display: 'flex', flexDirection: 'row'}}>
                
                <FormGroup style={{display: 'flex', flexDirection: 'row', alignContent: 'space-around' }}>
                    <FormControlLabel 
                        control={<Checkbox checked={daily}  onChange={handleDailyCheck}/>} 
                        label="Daily alerts" 
                        id="daily"
                        name="daily"
                        style={{marginTop: '10px'}}
                    />
                    <FormControlLabel 
                        control={<Checkbox checked={weekly} onChange={handleWeeklyCheck} />} 
                        label="Weekly alerts" 
                        id="weekly"
                        name="weekly"
                        style={{marginTop: '10px'}}
                    />
                    <FormControlLabel 
                      control={<Checkbox checked={monthly} onChange={handleMonthlyCheck} />} 
                      label="Monthly alerts" 
                      id="monthly"
                      name="monthly"
                      style={{marginTop: '10px'}}
                    />
                </FormGroup>
            </Box>
            <Box>
                <Button 
                    type="submit"
                    sx={{ marginTop: 1 }} 
                    variant="contained"
                    disabled={loading}
                >
                    Subscribe
                </Button>
            </Box>
        </Box>
    </Box>
  )
}
