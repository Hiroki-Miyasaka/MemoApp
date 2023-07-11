import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import authApi from '../api/authApi';
import { useState } from 'react';

const Login = () => {
    const navigate = useNavigate();

    const [usernameErrText, setUsernameErrText] = useState("");
    const [passwordErrText, setPasswordErrText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUsernameErrText("");
        setPasswordErrText("");


        const data = new FormData(e.target);
        const username = data.get("username").trim();
        const password = data.get("password").trim();
        
        console.log(username);
        console.log(password);

        let error = false;

        if(username === ""){
            error = true;
            setUsernameErrText("Enter your name");
        }
        if(password === ""){
            error = true;
            setPasswordErrText("Enter your password");
        }
        
        if(error) return;

        setLoading(true);

        //call api
        try{
            const res = await authApi.login({username, password});
            setLoading(false);
            localStorage.setItem("token", res.token);
            console.log("Success Login");
            navigate("/");
        } catch (err){
            const errors = err.data.errors;
            console.log(errors);
            errors.forEach((err) => {
                if(err.param === "username"){
                    setUsernameErrText(err.msg);
                }
                if(err.param === "password"){
                    setPasswordErrText(err.msg);
                }
            });
            setLoading(false);
        }
    }

  return (
    <>
        <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField 
                fullWidth id='username' 
                label="name" 
                margin='normal' 
                name='username' 
                required
                helperText={usernameErrText}
                error={usernameErrText !== ""}
                disabled={loading}
            />
            <TextField 
                fullWidth id='password' 
                label="password" 
                margin='normal' 
                name='password' 
                type='password'
                required
                helperText={passwordErrText}
                error={passwordErrText !== ""}
                disabled={loading}
            />
            
            <LoadingButton 
                sx={{mt: 3, mb: 2}} 
                fullWidth 
                type='submit' 
                color='primary'
                variant='outlined'
                loading={loading}
                >
                    Sign in
                </LoadingButton>
        </Box>
        <Button component={Link} to="/register">
          Don't have an account? New Registration
        </Button>
    </>
  )
}

export default Login