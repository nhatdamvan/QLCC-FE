import React from 'react';

import { Box, Button } from '@mui/material';
import { useThemeContext } from '@crema/context/ThemeContextProvider';
import { alpha } from '@mui/material/styles';
import { ReactComponent as Logo } from '../../../../assets/IC2logo.svg';
import { useNavigate } from "react-router-dom";
const AppLogo = () => {
  const navigate = useNavigate();
  const { theme } = useThemeContext();
  const routerhome=()=>{
    navigate("/")
  }
  return (
   
    <Box
      sx={{
        height: { xs: 56, sm: 70 },
        padding: 2.5,
        display: 'flex',
        flexDirection: 'row',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        '& svg': {
          height: { xs: 40, sm: 45 },
        },
      }}
      className="app-logo"
    >
       <Button type='button' onClick={routerhome}>
      <Logo fill={theme.palette.primary.main} />
      </Button>
      <Box
        sx={{
          mt: 1,
          display: { xs: 'none', md: 'block' },
          '& svg': {
            height: { xs: 25, sm: 30 },
          },
        }}
      >
      </Box>
    </Box>
  
  );
};

export default AppLogo;
