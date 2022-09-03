import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const PlusIcon = (props: any) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="white"
    {...props}>
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </Svg>
);

export default PlusIcon;
