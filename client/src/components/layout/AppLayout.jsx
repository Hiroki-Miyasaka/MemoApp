import { Box, Container } from '@mui/material';
import React from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import notionLogo from "../../assets/images/notion-logo.png";
import { useEffect } from 'react';
import authUtils from '../../utils/authUtils';
import Sidebar from '../common/Sidebar';


const AppLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const user = await authUtils.isAuthenticated();
            if(!user){
                navigate("/login");
            }
        };
        checkAuth();
    }, [navigate]);
  return (
    <div>
        <Box sx={{display: "flex"}}>
            <Sidebar/>
            <Box sx={{flexGrow: 1, p: 1, width: "max-content"}}>
                <Outlet/>
            </Box>
        </Box>
    </div>
  )
}

export default AppLayout;