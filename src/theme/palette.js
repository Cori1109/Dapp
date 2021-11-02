const blue = '#4263EB'
const white = '#ffffff'
const orange = '#f6c16a'
const pupple = '#6c56f9'
const grey = '#8b8a90'
const light_grey = '#F5F7FE'
const black = '#000000'
const gold_light = '#F6A6091A'
const gold_dark = '#F6A609'
const pink = '#c90076'
const red = '#ff0000'

export default {
  main: {
    background: white,
  },
  sub: {
    background: blue,
  },
  dark: {
    background: white,
  },
  text: {
    primary: black,
    secondary: grey,
    third: blue,
    dark: white,
  },
  button: {
    primary: {
      background: blue,
      foreground: white,
      hover: {
        foreground: orange
      },
    },
    secondary: {
      background: pupple,
      foreground: white,
    },
    third: {
      background: light_grey,
      foreground: blue,
    },
    fourth: {
      background: light_grey,
      foreground: red,
    },
    text: {
      foreground: blue,
      secondary: pink
    }
  },
  badge: {
    background: gold_light,
    color: gold_dark
  }
};
