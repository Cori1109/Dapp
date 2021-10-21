import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.main.background,
    padding: theme.spacing(2),
    height: '100vh'
  },
  navbar: {
    width: 'calc(100% - 32px)',
    position: 'fixed',
    bottom: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
  }
}));

export default useStyles;
