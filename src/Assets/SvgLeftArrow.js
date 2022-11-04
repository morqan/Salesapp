import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

const SvgLeftArrow = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="#fff"
    className="bi bi-chevron-left"
  >
    <Path
      fillRule="evenodd"
      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
    />
  </Svg>
)

export default SvgLeftArrow
