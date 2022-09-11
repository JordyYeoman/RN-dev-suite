import React from 'react';
import {LineChart, XAxis, YAxis} from 'react-native-svg-charts';
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
      <YAxis
        data={data}
        contentInset={{top: 5, bottom: 0}}
        svg={{
          fill: 'white',
          fontSize: 4,
        }}
        numberOfTicks={30}
        formatLabel={(value: any) => value}
      />
      <LineChart
        style={{flex: 1}}
        data={data}
        svg={{
          stroke: 'rgb(134, 65, 244)',
        }}>
        <CustomGrid belowChart={true} />
        <XAxis
          style={{marginHorizontal: 0, bottom: 0}}
          data={data}
          formatLabel={(value: any, index: number) => index}
          contentInset={{left: 10, right: 10, bottom: 0}}
          svg={{fontSize: 4, fill: 'white'}}
        />
      </LineChart>
    </View>
  );
};

export default DataLineChart;
