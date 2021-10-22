const blue = '#4263EB'
const white = '#ffffff'
const pupple = '#6c56f9'
const grey = '#8b8a90'
const black = '#000000'
const gold_light = '#F6A6091A'
const gold_dark = '#F6A609'
const dark_blue = '#223274'
const pink = '#c90076'

export default {
  main: {
    background: dark_blue,
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
        foreground: pink
      }
    },
    secondary: {
      background: pupple,
      foreground: white,
    },
    text: {
      foreground: blue
    }
  },
  badge: {
    background: gold_light,
    color: gold_dark
  }
};
