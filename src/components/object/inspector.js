import React from 'react'
import { ObjectInspector, chromeLight } from 'react-inspector'

const theme = {
  ...chromeLight,
  BASE_FONT_SIZE: '13px',
  BASE_LINE_HEIGHT: '19px',
  TREENODE_FONT_SIZE: '13px',
  TREENODE_LINE_HEIGHT: '19px',
  BASE_BACKGROUND_COLOR: 'transparent'
}

const Inspector = (props) => (
  <ObjectInspector theme={theme} {...props} />
)

export default Inspector
