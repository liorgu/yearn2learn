import Typography from 'typography'
import altonTheme from 'typography-theme-alton'

altonTheme.overrideThemeStyles = () => ({
  a: {
    color: 'dimgrey',
    textDecoration: 'underline',
  },
  'h1, h2, h3, h4, h5, h6': {
    color: 'indigo',
    marginTop: '2rem',
  },
  hr: {
    margin: '2rem 0',
  },
  header: {
    textAlign: 'center',
  },
  'button:hover, a:hover': {
    cursor: 'pointer',
  },
  table: {
    width: 'auto',
  },
})

const typography = new Typography(altonTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
