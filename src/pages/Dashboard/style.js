import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.main.background,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  avatarArea: {
    display: 'flex',
    alignItems: 'center'
  },
  badge: {
    backgroundColor: theme.palette.badge.background,
    color: theme.palette.badge.color,
    padding: '6px 10px 6px 10px'
  }
}));

export default useStyles;
