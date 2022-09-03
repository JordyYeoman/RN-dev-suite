import React from 'react';
import {Text, View, Dimensions} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import {themeStyles} from '../../styles/GlobalStyles';

class PieChartWithDynamicSlices extends React.PureComponent {
  constructor(props: {}) {
    super(props);
    this.state = {
      selectedSlice: {
        label: 'Data',
        value: 10,
      },
      labelWidth: 0,
    };
  }
  render() {
    const {levelOne, levelTwo, levelThree} = themeStyles.shade;
    const {labelWidth, selectedSlice} = this.state;
    const {label, value} = selectedSlice;
    const keys = ['google', 'youtube', 'Twitter'];
    const values = [15, 25, 35, 45, 55];
    const colors = [levelOne, levelTwo, levelThree];
    const data = keys.map((key, index) => {
      return {
        key,
        value: values[index],
        svg: {fill: colors[index]},
        arc: {
          outerRadius: 70 + values[index] + '%',
          padAngle: label === key ? 0.1 : 0,
        },
        onPress: () =>
          this.setState({selectedSlice: {label: key, value: values[index]}}),
      };
    });
    const deviceWidth = Dimensions.get('window').width;

    return (
      <View style={{justifyContent: 'center'}}>
        <PieChart
          style={{height: 200}}
          outerRadius={'80%'}
          innerRadius={'45%'}
          data={data}
          animate={true}
          animationDuration={600}
        />
        <Text
          onLayout={({
            nativeEvent: {
              layout: {width},
            },
          }) => {
            this.setState({labelWidth: width});
          }}
          style={{
            position: 'absolute',
            left: deviceWidth / 2 - labelWidth / 2,
            textAlign: 'center',
            fontSize: 10,
            color: 'white',
            fontWeight: 'bold',
          }}>
          {`${label} \n ${value}`}
        </Text>
      </View>
    );
  }
}

export default PieChartWithDynamicSlices;
