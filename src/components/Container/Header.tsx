import { useState, useMemo } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Tabs,
  Tab,
  MenuItem
} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import pages from 'src/assets/defaults/pages';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from 'src/assets/images/vetheal-logo-transparent.png';

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleChange = (e, i) => {
    navigate(pages[i].path);
  };

  const currentTabIdx = useMemo(() => {
    let idx = pages.findIndex(({ path }) => location.pathname.startsWith(path));
    if (idx === -1) idx = 1;
    return idx;
  }, [location]);

  return (
    <AppBar color='transparent' position='static' sx={{ py: 0.3 }}>
      <Container maxWidth='xl'>
        <Toolbar>
          <img src={Logo} height='64px' />
          <Box sx={{ flexGrow: 1 }}>
            <Tabs centered value={currentTabIdx} onChange={handleChange}>
              {pages.map(({ name, path }) => (
                <Tab key={path} label={name} />
              ))}
            </Tabs>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
