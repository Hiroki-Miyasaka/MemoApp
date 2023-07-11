import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import authApi from '../api/authApi';
import { useState } from 'react';

const Register = () => {
    const navigate = useNavigate();

    const [usernameErrText, setUsernameErrText] = useState("");
    const [passwordErrText, setPasswordErrText] = useState("");
    const [confirmErrText, setConfirmErrText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUsernameErrText("");
        setPasswordErrText("");
        setConfirmErrText("");


        const data = new FormData(e.target);
        const username = data.get("username").trim();
        const password = data.get("password").trim();
        const confirmPassword = data.get("confirmPassword").trim();
        console.log(username);
        console.log(password);
        console.log(confirmPassword);

        let error = false;

        if(username === ""){
            error = true;
            setUsernameErrText("Enter your name");
        }
        if(password === ""){
            error = true;
            setPasswordErrText("Enter your password");
        }
        if(confirmPassword === ""){
            error = true;
            setConfirmErrText("Enter your confirm password");
        }
        if(password !== confirmPassword){
            error = true;
            setConfirmErrText("Password and confirmation password are different");
        }

        if(error) return;

        setLoading(true);

        try{
            const res = await authApi.register({username, password, confirmPassword});
            setLoading(false);
            localStorage.setItem("token", res.token);
            console.log("User registered")
            navigate("/");
        } catch (err){
            const errors = err.data.errors;
            console.log(errors);
            errors.forEach((err) => {
                if(err.path === "username"){
                    setUsernameErrText(err.msg);
                }
                if(err.path === "password"){
                    setPasswordErrText(err.msg);
                }
                if(err.path === "confirmPassword"){
                    setConfirmErrText(err.msg);
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
            <TextField 
                fullWidth id='confirmPassword' 
                label="confirm password" 
                margin='normal' 
                name='confirmPassword' 
                type='password'
                required
                helperText={confirmErrText}
                error={confirmErrText !== ""}
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