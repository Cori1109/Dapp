import { createTheme } from '@mui/material/styles';

import palette from './palette';
import palette_dark from './palette_dark';
import typography from './typography';
import typography_dark from './typography_dark';

const theme = (isBlack) => createTheme({
  palette : isBlack ? palette_dark : palette,
  typography: isBlack ? typography_dark : typography,
});

export default theme;
