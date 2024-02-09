import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const CustomButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const CustomTextInput = ({ placeholder, value, onChangeText, keyboardType }) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    keyboardType={keyboardType}
  />
);

const Screen1 = ({ navigation }) => (
  <View style={styles.container}>
    <CustomButton title="Imagen 1" onPress={() => navigation.navigate('Screen2')} />
    <CustomButton title="Imagen 2" onPress={() => navigation.navigate('Screen3')} />
    <CustomButton title="Mayor o Igual" onPress={() => navigation.navigate('Screen4')} />
    <CustomButton title="Menor o Igual" onPress={() => navigation.navigate('Screen5')} />
  </View>
);

const Screen2 = ({ navigation }) => (
  <View style={styles.container}>
    <Image source={require('./assets/imagen1.jpg')} style={styles.image} />
    <CustomButton title="Imagen 2" onPress={() => navigation.navigate('Screen3')} />
  </View>
);

const Screen3 = ({ navigation }) => (
  <View style={styles.container}>
    <Image source={require('./assets/imagen2.jpg')} style={styles.image} />
    <CustomButton title=">=" onPress={() => navigation.navigate('Screen4')} />
  </View>
);

const Screen4 = ({ navigation }) => {
  
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [resultado, setResultado] = useState('');

  const handleMayorIgual = () => {
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    if (!isNaN(number1) && !isNaN(number2)) {
      setResultado(`Número mayor o igual: ${number1 >= number2}`);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: '#B6FFD8' }]}>
      <CustomTextInput
        placeholder="Número 1"
        value={num1}
        onChangeText={setNum1}
        keyboardType="numeric"
      />
      <CustomTextInput
        placeholder="Número 2"
        value={num2}
        onChangeText={setNum2}
        keyboardType="numeric"
      />
      <CustomButton title=">=" onPress={handleMayorIgual} />
      <Text style={styles.resultado}>{resultado}</Text>
      <CustomButton title="<=" onPress={() => navigation.navigate('Screen5')} />
    </View>
  );
};

const Screen5 = ({ navigation }) => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');

  const handleMenorIgual = () => {
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    if (!isNaN(number1) && !isNaN(number2)) {
      navigation.navigate('Resultado', { result: number1 <= number2 ? 'Menor o Igual' : 'Mayor' });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: '#B6FFFD' }]}>
      <CustomTextInput
        placeholder="Número 1"
        value={num1}
        onChangeText={setNum1}
        keyboardType="numeric"
      />
      <CustomTextInput
        placeholder="Número 2"
        value={num2}
        onChangeText={setNum2}
        keyboardType="numeric"
      />
      <CustomButton title="<=" onPress={handleMenorIgual} />
    </View>
  );
};

const ResultadoScreen = ({ route }) => (
  <View style={styles.container}>
    <Text style={styles.resultText}>{route.params.result}</Text>
  </View>
);

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Screen1">
      <Stack.Screen name="Screen1" component={Screen1} options={{ title: 'Screen 1' }} />
      <Stack.Screen name="Screen2" component={Screen2} options={{ title: 'Screen 2' }} />
      <Stack.Screen name="Screen3" component={Screen3} options={{ title: 'Screen 3' }} />
      <Stack.Screen name="Screen4" component={Screen4} options={{ title: 'Screen 4' }} />
      <Stack.Screen name="Screen5" component={Screen5} options={{ title: 'Screen 5' }} />
      <Stack.Screen name="Resultado" component={ResultadoScreen} options={{ title: 'Resultado' }} />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  button: {
    backgroundColor: '#4D09BE',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  image: {
    flex:1,
    width: 300,
    height: 300,
    aspectRatio: 1,
    marginBottom: 16,
    

  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  
});

export default App;
