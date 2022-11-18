import { React, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
//import Footer from 'src/components/Footer';
import { useAuth } from '../../../../contexts/authContext1.js'
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const { login, user, token } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e){
      e.preventDefault()
      try {
        setError("");
        setLoading(true);
        const data = new FormData(e.currentTarget);
        await login(data.get("username"), data.get("password"));
        setLoading(false);
        navigate("/")
      } catch {
        setError("Failed to log in");
        setLoading(false);
      }   
    }
  

    console.log("User: ", user);
    console.log("Token: ", token);


  return (
    <>
      <Helmet>
        <title>PRMN - Login</title>
      </Helmet>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {error && <p><Alert severity={"error"} >{error}</Alert></p>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default SignIn;

