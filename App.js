/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, useState, useEffect} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';

const App = () => {
  const key = '@asyncStorageSampleKey';
  const [status, setStatus] = useState('initial value');
  const [needsRedraw, setNeedsRedraw] = useState(1);

  useEffect(() => {
    (async () => {
      await AsyncStorage.removeItem(key);
    })();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          // value previously stored
          setStatus(value);
        }
      } catch (e) {
        // error reading value
        console.error(e);
      }
    };
    getData();
  }, [needsRedraw]);

  const handleButtonClick = () => {
    const storeData = async () => {
      try {
        await AsyncStorage.setItem(key, 'stored value');
        setNeedsRedraw(prev => ++prev);
      } catch (e) {
        // saving error
      }
    };
    storeData();
  };

  return (
    <Fragment>
      <StatusBar barStyle="default" />
      <View style={styles.mainView}>
        <Text>{status}</Text>
        <Button title="changeValue" onPress={handleButtonClick} />
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default App;
