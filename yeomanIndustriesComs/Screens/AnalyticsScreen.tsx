import React, {useState} from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import LineChart from '../components/charts/LineChart';
import TopBarNavigation from '../components/TopBarNavigation';
import {GlobalStyles} from '../styles/GlobalStyles';
import {ScreenType} from '../Types/Globaltypes';
import {generateData} from '../utils/hooks/generateData';
import useInterval from '../utils/hooks/useInterval';

export const AnalyticsScreen = ({navigation}: any) => {
  const [count, setCount] = useState<number>(0);
  const [data, setData] = useState<number[]>([
    1498, 1225, 1516, 1769, 1542, 1487, 1531, 1484, 1879, 1330, 1232, 1432,
    1275, 1202, 1214, 1298, 1740, 1880, 1268, 1422, 1439, 1498, 1225, 1516,
    1769, 1542, 1487, 1531, 1484, 1879, 1330, 1232, 1432, 1275, 1202, 1214,
    1298, 1740, 1880, 1268, 1422, 1439, 1498, 1225, 1516, 1769, 1542, 1487,
    1531, 1484, 1879, 1330, 1232, 1432, 1275, 1202, 1214, 1298, 1740, 1880,
    1268, 1422, 1439, 1498, 1225, 1516, 1769, 1542, 1487, 1531, 1484, 1879,
  ]);

  // Poll the notification status:
  useInterval(() => {
    setCount((currentCount: number) => currentCount + 1);
    let newData = generateData(data);
    setData(newData);
  }, 50); // 50ms should mean 20 updates per second

  return (
    <View
      style={[GlobalStyles.rootBackgroundColor, GlobalStyles.screenContainer]}>
      <SafeAreaView>
        <TopBarNavigation
          navigation={navigation}
          screen={ScreenType.SECONDARY}
          title={'Analytics'}
        />
        <View>
          <Text>Refresh Count: {count}</Text>
          <LineChart data={data} />
        </View>
      </SafeAreaView>
    </View>
  );
};
