import { Box, Container } from '@mui/material';
import React from 'react'
import { Outlet } from 'react-router-dom';
import notionLogo from "../../assets/images/notion-logo.png";

const AuthLayout = () => {
  return (
    <div>
        <Container component="main" maxWidth="xs">
            <Box sx={{
                marginTop: 6,
                display: "flex",
                alignItems: "center",
                flexDirection: "column"
            }}>
                <img src={notionLogo} alt=''
                    style={{width: 100, height: 100, marginBottom: 3}}
                />
                Memo App
            </Box>
            <Outlet/>
        </Container>
    </div>
  )
}

export default AuthLayout