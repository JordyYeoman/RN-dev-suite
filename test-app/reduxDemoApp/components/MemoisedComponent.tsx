import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';

function MemoisedComponent() {
  const [inputState, setInputState] = useState('');
  // Because all of the values passed into 'RaceEntrant' component are primitive types,
  // We can memoize the component and stop them from rerendering if the props have not changed.
  return (
    <View>
      <Text>Parent Component</Text>
      <TextInput
        value={inputState}
        onChangeText={setInputState}
        placeholder={'Enter Text'}
      />
      <RaceEntrant entrantNumber={0} entrantName={'J-swizzle'} />
      <RaceEntrant entrantNumber={1} entrantName={'P-dizzle'} />
      <RaceEntrant entrantNumber={2} entrantName={'Big-dawg'} />
      <RaceEntrant entrantNumber={3} entrantName={'Midland-dawg'} />
    </View>
  );
}

export default MemoisedComponent;

const RaceEntrant = React.memo(
  ({
    entrantNumber,
    entrantName,
  }: {
    entrantNumber: number;
    entrantName: string;
  }) => {
    // Without React.memo, this component would be rerendered on every input state change of the parent component.
    // console.log('RaceEntrant Rendered: ', entrantNumber);
    return (
      <View>
        <Text>Race Entrant: #{entrantNumber}</Text>
        <Text>Race Entrant name: {entrantName}</Text>
      </View>
    );
  },
);
