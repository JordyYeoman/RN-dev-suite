import React, {useState} from 'react';
import {View, Text, SafeAreaView, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {GlobalStyles} from '../styles/GlobalStyles';
import {decrement, increment} from '../store/Counter/Slice';
import {RootState} from '../store/store';
import BoxLayout from '../components/BoxLayout';
import PieChartWithDynamicSlices from '../components/PieChartWithDynamicSlices';
import TopBarNavigation from '../components/TopBarNavigation';
import {Props, ScreenType} from '../Types/Globaltypes';

function HomeScreen({navigation}: Props) {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const [connected, setConnected] = useState<boolean>(true);

  return (
    <View
      style={[GlobalStyles.rootBackgroundColor, GlobalStyles.screenContainer]}>
      <SafeAreaView>
        <TopBarNavigation navigation={navigation} screen={ScreenType.HOME} />
        <BoxLayout marginTop={0}>
          <Text>Value: {count}</Text>
          <Button title={'Decrement'} onPress={() => dispatch(decrement())} />
          <Button title={'Increment'} onPress={() => dispatch(increment())} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, fontWeight: '700', color: 'white'}}>
              Analytics
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: 'white',
                  paddingRight: 4,
                }}>
                Status:
              </Text>
              <View
                style={{
                  borderRadius: 100,
                  backgroundColor: connected ? 'blue' : 'red',
                  height: 10,
                  width: 10,
                  marginTop: 2,
                }}></View>
            </View>
          </View>
          <PieChartWithDynamicSlices />
        </BoxLayout>
        <BoxLayout marginTop={16}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: 'white',
              paddingBottom: 16,
            }}>
            Recent Data
          </Text>
          <View style={{flexDirection: 'column'}}>
            <DataPoint text={'Heart Rate Variability'} dataPoint={144.1} />
            <DataPoint text={'Average Heart Rate'} dataPoint={71} />
            <DataPoint text={'Ectopic Beats'} dataPoint={12} />
            <DataPoint text={'Irregular Heart Beats'} dataPoint={3} />
            <DataPoint text={'Invalid Data Points /s'} dataPoint={428} />
          </View>
        </BoxLayout>
        <BoxLayout marginTop={16}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: 'white',
              paddingBottom: 16,
            }}>
            Connection Overview
          </Text>
          <View style={{flexDirection: 'column'}}>
            <DataPoint
              text={'Connection up-time (HOURS)'}
              dataPoint={parseFloat((168230 / 60 / 60).toFixed(2))}
            />
            <DataPoint text={'Average Heart Rate'} dataPoint={71} />
          </View>
        </BoxLayout>
      </SafeAreaView>
    </View>
  );
}

export default HomeScreen;

type DataPointProps = {
  text: string;
  dataPoint: number;
};

const DataPoint = ({text, dataPoint}: DataPointProps) => {
  return (
    <View style={{flexDirection: 'row', paddingVertical: 4}}>
      <Text style={{fontSize: 14, fontWeight: '700', color: 'white'}}>
        {text}:
      </Text>
      <Text
        style={{
          paddingLeft: 8,
          fontSize: 14,
          fontWeight: '700',
          color: 'white',
        }}>
        {dataPoint}
      </Text>
    </View>
  );
};
