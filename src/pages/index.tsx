import React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import UselessAI from '../components/UselessAI';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },
});

const IndexPage: React.FC<PageProps> = () => {
  return (
    <ThemeProvider theme={theme}>
      <UselessAI />
    </ThemeProvider>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
