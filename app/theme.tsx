'use client';

import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const primary = {
  main: "rgb(241, 121, 75)",
  light: "rgb(241, 121, 75)",
  dark: 'rgb(241, 121, 75)',
  contrastText: 'rgb(253, 253, 253)',
};

const secondary = {
  main: "rgb(88, 88, 88)",
  light: "rgb(122, 122, 122)",
  dark: 'rgb(66, 66, 66)',
  contrastText: 'rgb(253, 253, 253)',
};

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    primary: primary,
    secondary: secondary,
  },
});

export default theme;
