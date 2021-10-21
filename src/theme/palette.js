const blue = '#4263EB'
const white = '#ffffff'
const orange = '#f6c16a'
const pupple = '#6c56f9'
const grey = '#8b8a90'
const black = '#000000'
const gold_light = '#F6A6091A'
const gold_dark = '#F6A609'

export default {
  main: {
    background: white,
  },
  sub: {
    background: blue,
  },
  text: {
    primary: black,
    secondary: grey,
  },
  button: {
    primary: {
      background: blue,
      foreground: white,
      hover: {
        foreground: orange
      }
    },
    secondary: {
      background: pupple,
      foreground: white,
    }
  },
  badge: {
    background: gold_light,
    color: gold_dark
  }
};
