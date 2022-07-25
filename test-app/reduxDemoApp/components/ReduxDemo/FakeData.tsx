import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

function FakeData() {
  const [data, setData] = useState<any>([getRandomNumberFromRange(10, 1000)]);

  useEffect(() => {
    setTimeout(() => {
      console.log('Do something');
      let newNumber = getRandomNumberFromRange(10, 1000);
      console.log(data);
      setData([...data, newNumber]);
    }, 5000);
  });

  return (
    <View>
      <Text>FakeData</Text>
      <View style={styles.bubblesContainer}>
        {data.map((d: number, index: number) => (
          <Text style={styles.textBubble} key={index}>
            {d}
          </Text>
        ))}
      </View>
    </View>
  );
}

export default FakeData;

const getRandomNumberFromRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const styles = StyleSheet.create({
  bubbleContainer: {flexDirection: 'row', flexWrap: 'wrap'},
  textBubble: {
    backgroundColor: 'white',
    padding: 4,
    margin: 10,
    borderRadius: 25,
  },
});
