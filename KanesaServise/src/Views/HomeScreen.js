import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {socket} from '../Components/Config';

function HomeScreen() {
  const [response, setResponse] = useState('');

  useEffect(() => {
    socket.on('FromAPI', (data) => {
      setResponse(data);
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text>{response}</Text>
    </View>
  );
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
