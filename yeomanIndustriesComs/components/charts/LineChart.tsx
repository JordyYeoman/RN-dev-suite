import React from 'react';
import {LineChart} from 'react-native-svg-charts';
import {View} from 'react-native';
import {G, Line} from 'react-native-svg';

export type LineChartProps = {
  data: number[];
};

const DataLineChart = ({data}: LineChartProps) => {
  const CustomGrid = ({x, y, data, ticks}) => (
    <G>
      {
        // Horizontal grid
        ticks.map(tick => (
          <Line
            key={tick}
            x1={'0%'}
            x2={'100%'}
            y1={y(tick)}
            y2={y(tick)}
            stroke={'rgba(0,0,0,0.2)'}
          />
        ))
      }
      {
        // Vertical grid
        data.map((_, index) => (
          <Line
            key={index}
            y1={'0%'}
            y2={'100%'}
            x1={x(index)}
            x2={x(index)}
            stroke={'rgba(0,0,0,0.2)'}
          />
        ))
      }
    </G>
  );
  return (
    <View style={{height: 200, flexDirection: 'row'}}>
      <LineChart
        style={{flex: 1}}
        data={data}
        svg={{
          stroke: 'rgb(134, 65, 244)',
        }}>
        <CustomGrid belowChart={true} />
      </LineChart>
    </View>
  );
};

export default DataLineChart;
