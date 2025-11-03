import React, { useState, useEffect } from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Paper,
} from '@mui/material';
import UrlInput from './UrlInput';
import JobTable from './JobTable';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { getJobs } = await import('../services/jobs');
        const jobsData = await getJobs();
        setJobs(jobsData);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };

    fetchJobs();

    // Poll every 5 seconds
    const interval = setInterval(fetchJobs, 5000);

    return () => clearInterval(interval);
  }, [refreshTrigger]);

  const handleUrlsSubmitted = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

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
          <UrlInput onSubmitSuccess={handleUrlsSubmitted} />
        </Paper>

        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Your Jobs
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Track the status of your jobs. Status updates automatically every 5 seconds.
          </Typography>
          <JobTable jobs={jobs} />
        </Paper>
      </Container>
    </>
  );
};

export default Dashboard;

