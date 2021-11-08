const blue = '#4263EB'
const white = '#ffffff'
const pupple = '#6c56f9'
const grey = '#8b8a90'
const black = '#15141F'
const black_light = '#211F32'
const gold_light = '#F6A6091A'
const gold_dark = '#F6A609'
const dark_blue = '#223274'
const pink = '#c90076'
const primary_blue='#536dfe'
const secondary_blue='#3f51b5'
const primary_gray='#666666'
const secondary_gray='#808080'
const light_blue='#F5F7FE'
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
