import React from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Paper,
} from '@mui/material';
import UrlInput from './UrlInput';

const Dashboard = () => {

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SEO Rank Tracker
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Submit URLs
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Enter your Google Sheets URL (containing keywords and locations) and your client website URL. The system will process the data and track SEO rankings.
          </Typography>
          <UrlInput />
        </Paper>
      </Container>
    </>
  );
};

export default Dashboard;

