import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
  TextField,
  Paper,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { submitUrls } from '../services/jobs';

const UrlInput = ({ onSubmitSuccess }) => {
  const [googleSheetsUrl, setGoogleSheetsUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateGoogleSheetsUrl = (url) => {
    if (!url || url.trim() === '') return false;
    return url.includes('docs.google.com/spreadsheets') || url.includes('sheets.google.com');
  };

  const validateWebsiteUrl = (url) => {
    if (!url || url.trim() === '') return false;
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    // Reset messages
    setError('');
    setSuccess('');

    // Validation
    if (!googleSheetsUrl.trim()) {
      setError('Please enter a Google Sheets URL');
      return;
    }

    if (!validateGoogleSheetsUrl(googleSheetsUrl)) {
      setError('Please enter a valid Google Sheets URL (should contain docs.google.com/spreadsheets)');
      return;
    }

    if (!websiteUrl.trim()) {
      setError('Please enter a client website URL');
      return;
    }

    if (!validateWebsiteUrl(websiteUrl)) {
      setError('Please enter a valid website URL (must start with http:// or https://)');
      return;
    }

    setSubmitting(true);

    try {
      await submitUrls(
        googleSheetsUrl.trim(),
        websiteUrl.trim()
      );
      setSuccess('URLs submitted successfully! Processing has started.');
      // Clear form
      setGoogleSheetsUrl('');
      setWebsiteUrl('');
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <TextField
          fullWidth
          label="Google Sheets URL"
          placeholder="https://docs.google.com/spreadsheets/d/..."
          value={googleSheetsUrl}
          onChange={(e) => setGoogleSheetsUrl(e.target.value)}
          margin="normal"
          variant="outlined"
          disabled={submitting}
          helperText="Enter the URL of your Google Sheets containing keywords and locations"
          error={googleSheetsUrl.trim() !== '' && !validateGoogleSheetsUrl(googleSheetsUrl)}
        />

        <TextField
          fullWidth
          label="Client Website URL"
          placeholder="https://example.com"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          margin="normal"
          variant="outlined"
          disabled={submitting}
          helperText="Enter the client website URL you want to track rankings for"
          error={websiteUrl.trim() !== '' && !validateWebsiteUrl(websiteUrl)}
        />

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={submitting || !googleSheetsUrl.trim() || !websiteUrl.trim()}
            startIcon={submitting ? <CircularProgress size={20} /> : <SendIcon />}
            size="large"
          >
            {submitting ? 'Submitting...' : 'Submit URLs'}
          </Button>
        </Box>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {success}
        </Alert>
      )}
    </Box>
  );
};

export default UrlInput;

