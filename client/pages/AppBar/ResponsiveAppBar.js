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
  
  const {connect, realEstate, address} = useStateContext();
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
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {realEstate}
          </Typography>
                <MenuItem >
                <Link href={{ pathname: "/Property/CreateProperty" }} legacyBehavior >
                  <a>Create Property</a>
                </Link>
                  
                </MenuItem>
                <MenuItem >
                <Link href={{ pathname: "/Property/PropertiesList" }} legacyBehavior >
                  <a>Properties List</a>
                </Link>
                </MenuItem> 
                <div className="wallet">
                {address ? <span className="wallet-address">{address}</span> :  <MenuItem  className="wallet-button" onClick = {() => connect()}> Connect Wallet </MenuItem> }                  
                </div>               
                
         </Toolbar>
             
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;