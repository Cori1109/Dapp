import { createTheme } from '@mui/material/styles';

import palette from './palette';
import palette_dark from './palette_dark';

const theme = (isBlack) => createTheme({
  palette : isBlack ? palette_dark : palette,
});

export default theme;
