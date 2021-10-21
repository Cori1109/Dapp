const blue = '#4263EB'
const white = '#ffffff'
const pink = '#c90076'
const pupple = '#6c56f9'

export default {
  main: {
    background: white,
  },
  sub: {
    background: blue,
  },
  button: {
    primary: {
      background: blue,
      foreground: white,
      hover: {
        foreground: pink
      }
    },
    secondary: {
      background: pupple,
      foreground: white,
    }
  }
};
