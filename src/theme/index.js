import { createTheme } from '@mui/material/styles';

import palette from './palette';
import palette_dark from './palette_dark';
import typography from './typography';

const theme = (isBlack) => createTheme({
  palette : isBlack ? palette_dark : palette,
  typography: typography
});

export default theme;
