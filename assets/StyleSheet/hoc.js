import combine from './combine'

function merge($styles, styles) {
  if (styles) {
    Object.keys($styles).forEach((key) => {
      if (key in styles) $styles[key] = $styles[key].concat(styles[key])
    })
  }
  $styles.all = combine($styles)
  return $styles
}

export default ($styles) => (mapProps) => (Target) => {
  const displayName = Target.displayName || Target.name
  const Component = ({styles, ...props}) => {
    const styleProps = mapProps ? mapProps(props) : props
    return <Target styles={merge($styles(styleProps), styles)} {...props} />
  }
  Component.displayName = `withStyleSheet(${displayName})`
  return Component
}
