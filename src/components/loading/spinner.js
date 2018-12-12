import React from 'react'
import Loader from 'react-loader'
import Transition from 'react-transition-group/Transition'

const getSpinnerStyle = () => ({
  lines: 11, // The number of lines to draw
  length: 0, // The length of each line
  width: 3, // The line thickness
  radius: 17, // The radius of the inner circle
  scale: 1, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  color: '#9ad4db', // #rgb or #rrggbb or array of colors
  opacity: 0.1, // Opacity of the lines
  rotate: 55, // The rotation offset
  direction: 1, // 1: clockwise  -1: counterclockwise
  speed: 1.1, // Rounds per second
  trail: 76, // Afterglow percentage
  fps: 20, // Frames per second when using setTimeout() as a fallback for CSS
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  className: 'spinner', // The CSS class to assign to the spinner
  top: '50%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: false, // Whether to render a shadow
  hwaccel: true, // Whether to use hardware acceleration
  position: 'absolute' // Element positioning
})

const duration = 300 // fade in/out time in ms

const faderStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 }
}

class Spinner extends React.Component {
  render () {
    const {loading, style} = this.props
    const spinStyle = {...getSpinnerStyle(), ...style}
    return (
      <Transition in={loading} timeout={duration} appear>
        {(state) => (
          <div style={{...faderStyle, ...transitionStyles[state]}}>
            <Loader loaded={false} {...spinStyle} />
          </div>
        )}
      </Transition>
    )
  }
}

export default Spinner
