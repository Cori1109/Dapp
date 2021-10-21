import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.button.primary.background,
    width: '50%',
    height: theme.spacing(5),
    borderRadius: '16px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  icon: {
    color: theme.palette.button.primary.foreground,
    '&:hover': {
      color: theme.palette.button.primary.hover.foreground,
    }
  }
}));

export default useStyles;
