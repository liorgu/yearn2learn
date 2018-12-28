import Typography from 'typography'
import ParnassusTheme from 'typography-theme-parnassus'

ParnassusTheme.overrideThemeStyles = () => ({
  a: {
    color: 'dimgrey',
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
})

const typography = new Typography(ParnassusTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
