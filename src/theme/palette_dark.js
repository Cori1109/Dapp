const blue = '#4263EB'
const white = '#ffffff'
const pupple = '#6c56f9'
const grey = '#ffffff'
const black = '#15141F'
const black_second = '#312c4d'
const black_light = '#211F32'
const gold_light = '#F6A6091A'
const gold_dark = '#F6A609'
const dark_blue = '#223274'
const pink = '#c90076'
const primary_blue='#536dfe'
const secondary_blue='#3f51b5'
const primary_gray='#ffffff'
const secondary_gray='#ffffff'
const light_blue='#F5F7FE'
const red = '#ff0000'
const light_grey = '#F5F7FE'
const orange = '#f6c16a'

export default {
  primary_blue,
  secondary_blue,
  light_blue,
  primary_gray,
  secondary_gray,
  white,
  main: {
    background: black,
  },
  sub: {
    background: black_light,
  },
  header: {
    background: blue,
  },
  dark: {
    background: black_light,
  },
  box: {
    background: black_second,
  },
  text: {
    primary: white,
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
