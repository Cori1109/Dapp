import palette from './palette';

export default {
  fontFamily: [
    'Overpass',
    'sans-serif',
  ].join(','),
  h1: {
    color: palette.text.primary,
    fontWeight: 800,
    fontSize: '35px',
    letterSpacing: '-0.24px',
    lineHeight: '41.6px'
  },
  h2: {
    color: palette.text.primary,
    fontWeight: 400,
    fontSize: '29px',
    letterSpacing: '-0.24px',
    lineHeight: '32px'
  },
  h3: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '1.5em',
    letterSpacing: '-0.06px',
    lineHeight: '28px'
  },
  h4: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '1.25em',
    letterSpacing: '-0.06px',
    lineHeight: '24px'
  },
  h5: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '1em',
    letterSpacing: '-0.05px',
    lineHeight: '20px'
  },
  h6: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '0.8750em',
    letterSpacing: '-0.05px',
    lineHeight: '20px'
  },
  sm_content_gray: {
    color: palette.primary_gray,
    fontFamily: 'Overpass',
    fontWeight: 600,
    fontSize: '1em',
    letterSpacing: '-0.5px',
    wordSpacing: '-3px',
    lineHeight: '25px',
    display: 'block'
  },
  sm_content: {
    color: palette.primary_blue,
    fontFamily: 'Overpass',
    fontWeight: 600,
    fontSize: '1em',
    letterSpacing: '-0.5px',
    wordSpacing: '-3px',
    lineHeight: '25px',
    display: 'block'
  },
  md_content: {
    color: palette.primary_gray,
    fontFamily: 'Overpass',
    fontWeight: 600,
    fontSize: '18px',
    letterSpacing: '-0.5px',
    wordSpacing: '-3px',
    lineHeight: '25px',
    display: 'block'
  },
  ss_content: {
    color: palette.secondary_gray,
    fontFamily: 'Overpass',
    fontWeight: 400,
    fontSize: '12px',
    letterSpacing: '-0.5px',
    wordSpacing: '-3px',
    lineHeight: '18px',
    display: 'block'
  },
  xs_content: {
    color: palette.white,
    fontFamily: 'Overpass',
    fontWeight: 800,
    fontSize: '14px',
    letterSpacing: '-0.01em',
    wordSpacing: '-3px',
    lineHeight: '140%',
    display: 'block'
  },
  xs_content_gray: {
    color: palette.secondary_gray,
    fontFamily: 'Overpass',
    fontWeight: 400,
    fontSize: '0.875em',
    letterSpacing: '-0.01em',
    wordSpacing: '-5px',
    lineHeight: '140%',
    display: 'block'
  },
  ss_title: {
    color: palette.secondary_gray,
    fontFamily: 'Montserrat Alternative',
    fontWeight: 400,
    fontSize: '0.875em',
    letterSpacing: '-0.5px',
    wordSpacing: '-3px',
    lineHeight: '28px',
    display: 'block'
  },
  sm_title: {
    color: palette.secondary_gray,
    fontFamily: 'Overpass',
    fontWeight: 500,
    fontSize: '1em',
    letterSpacing: '-0.5px',
    wordSpacing: '-3px',
    lineHeight: '25px',
    display: 'block'
  },
  sl_title: {
    color: palette.secondary_gray,
    fontFamily: 'Montserrat Alternative',
    fontWeight: 800,
    fontSize: '1.25em',
    letterSpacing: '-0.5px',
    lineHeight: '28px',
    display: 'block'
  },
  md_title: {
    color: palette.primary_gray,
    fontFamily: 'Montserrat Alternative',
    fontWeight: 800,
    fontSize: '1.5em',
    letterSpacing: '-0.3px',
    lineHeight: '32px',
    display: 'block'
  },
  lg_title: {
    color: palette.primary_gray,
    fontFamily: 'Montserrat Alternative',
    fontWeight: 800,
    fontSize: '2em',
    letterSpacing: '-0.3px',
    lineHeight: '41px',
    display: 'block'
  },
  subtitle1: {
    color: palette.text.primary,
    fontFamily: 'Montserrat Alternative',
    fontWeight: 700,
    fontSize: '1.5em',
    lineHeight: '36px'
  },
  subtitle2: {
    color: palette.text.secondary,
    fontFamily: 'Montserrat Alternative',
    fontWeight: 400,
    fontSize: '1em',
    lineHeight: '24px'
  },
  subtitle3: {
    color: palette.text.primary,
    fontFamily: 'Montserrat Alternative',
    fontWeight: 800,
    fontSize: '1.25em',
    lineHeight: '27px'
  },
  subtitle4: {
    color: palette.text.primary,
    fontFamily: 'Overpass',
    fontWeight: 700,
    fontSize: '0.875em',
    lineHeight: '19.6px'
  },
  subtitle5: {
    color: palette.text.secondary,
    fontFamily: 'Overpass',
    fontWeight: 700,
    fontSize: '0.875em',
    lineHeight: '19.6px'
  },
  subtitle1_dark: {
    color: palette.text.dark,
    fontFamily: 'Montserrat Alternative',
    fontWeight: 700,
    fontSize: '1.5em',
    lineHeight: '36px'
  },
  body1: {
    color: palette.text.primary,
    fontSize: '0.8750em',
    letterSpacing: '-0.05px',
    lineHeight: '21px'
  },
  body2: {
    color: palette.text.secondary,
    fontSize: '0.75em',
    letterSpacing: '-0.04px',
    lineHeight: '18px'
  },
  button: {
    color: palette.button.primary.background,
    fontSize: '1em'
  },
  caption: {
    color: palette.text.secondary,
    fontSize: '0.6875em',
    letterSpacing: '0.33px',
    lineHeight: '13px'
  },
  overline: {
    color: palette.text.secondary,
    fontSize: '0.6875em',
    fontWeight: 500,
    letterSpacing: '0.33px',
    lineHeight: '13px',
    textTransform: 'uppercase'
  },
	
};
