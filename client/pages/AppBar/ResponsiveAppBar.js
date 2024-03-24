import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { ButtonGroup } from '@mui/material';
import { useStateContext } from '../../context';
import Link from 'next/link';

// Internal Imports

function ResponsiveAppBar() {
  
  const {connect, realEstate} = useStateContext();
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar >
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            sx={{
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {realEstate}
          </Typography>
                <MenuItem >
                <Link href={{ pathname: "/Create" }} legacyBehavior >
                  <a>Create Property</a>
                </Link>
                  
                </MenuItem>
                <MenuItem >
                  <Typography textAlign="center">List Property</Typography>
                </MenuItem>
                <MenuItem onClick = {() => connect()}>
                  <Typography textAlign="right">Connect Wallet</Typography>
                </MenuItem>
         </Toolbar>

      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;