import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";

const Register = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const username = data.get("username").trim();
        const password = data.get("password").trim();
        const confirmPassword = data.get("confirmPassword").trim();
        console.log(username);
        console.log(password);
        console.log(confirmPassword);
    }

  return (
    <>
        <Box component="form" onSubmit={handleSubmit}>
            <TextField 
                fullWidth id='username' 
                label="name" 
                margin='normal' 
                name='username' 
                required
            />
            <TextField 
                fullWidth id='password' 
                label="password" 
                margin='normal' 
                name='password' 
                type='password'
                required
            />
            <TextField 
                fullWidth id='confirmPassword' 
                label="confirm password" 
                margin='normal' 
                name='confirmPassword' 
                type='password'
                required
            />
            <LoadingButton 
                sx={{mt: 3, mb: 2}} 
                fullWidth 
                type='submit' 
                loading={false}
                color='primary'
                variant='outlined'
                >
                    Sign Up
                </LoadingButton>
        </Box>
        <Button component={Link} to="/login">
        Already have an account? Login
        </Button>
    </>
  )
}

export default Register