import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const BackArrowIcon = (props: any) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="white"
    {...props}>
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
    />
  </Svg>
);

export default BackArrowIcon;
