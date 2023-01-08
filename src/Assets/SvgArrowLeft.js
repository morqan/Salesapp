import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

const SvgArrowLeft = () => (
  <Svg width={16} height={12} fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M6.7.725c.2.2.296.442.288.725a1.035 1.035 0 0 1-.313.725L3.85 5H15c.283 0 .521.096.713.288A.967.967 0 0 1 16 6a.97.97 0 0 1-.287.713A.97.97 0 0 1 15 7H3.85L6.7 9.85c.2.2.3.438.3.713 0 .275-.1.512-.3.712-.2.2-.438.3-.713.3a.973.973 0 0 1-.712-.3L.7 6.7a.883.883 0 0 1-.213-.325A1.115 1.115 0 0 1 .425 6c0-.133.02-.258.062-.375A.883.883 0 0 1 .7 5.3L5.3.7a.932.932 0 0 1 .687-.275c.275 0 .513.1.713.3Z"
      fill="#555"
    />
  </Svg>
)

export default SvgArrowLeft
