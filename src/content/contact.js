import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import Footer from '../components/Footer';

export default function About() {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] =useState(false);
  const [success, setSuccess] =useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);
    setFeedback("");
    const data = new FormData(e.currentTarget)
    
    let formData = {
        'email': data.get('email'),
        'subject':  data.get('subject'),
        'body':  data.get('body'),
      }

      console.log(formData);
    
    fetch('/api/feedback', {
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
                setFeedback("Thank you for your feedback");
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
    <>
      <Helmet>
        <title>PRMN - Contact </title>
      </Helmet>
      <Box sx={{mx: 5}}>
        <Grid
          container
          justifyContent="center"
          alignItems="stretch"
          spacing={1}
          sx={{ marginTop: 5}}
        >
            <Grid item xs={12}>
            <Paper sx={{p: 3}}>
                <Typography variant="h3" component="div" gutterBottom>
                   Contact PRMN / Give us your Feedback
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    { error && <Alert severity={"error"} >{feedback}</Alert> }
                    { success && <Alert severity={"info"} >{feedback}</Alert>}
                        <Box style={{display: 'flex', flexDirection: 'column'}}>
                            <TextField
                                id="email"
                                name="email"
                                label="Email address"
                                defaultValue="joe@doe.com"
                                variant="outlined"
                                size="large"
                            />
                            <TextField
                                id="subject"
                                name="subject"
                                label="Subject"
                                defaultValue="Feedback"
                                variant="outlined"
                                size="large"
                                sx={{ marginTop: 4}}
                            />
                            <TextField
                                id="body"
                                name="body"
                                label="body"
                                defaultValue=""
                                variant="outlined"
                                size="large"
                                multiline
                                rows={4}
                                sx={{ marginTop: 4}}
                            />
                        </Box>
                        <Box>
                            <Button 
                                type="submit"
                                sx={{ marginTop: 1 }} 
                                variant="contained"
                                disabled={loading}
                            >
                                Contact Us
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    </Box>
<Footer />
</>
  );
}
