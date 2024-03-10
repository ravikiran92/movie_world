import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainNavigator from './src/Navigation/MainNavigator'

const App = () => {

  return (
    <View style={{ flex: 1 }}>
      <StatusBar animated={true} backgroundColor="#000000" />
      <MainNavigator />
    </View>
  )
}

export default App

const styles = StyleSheet.create({})