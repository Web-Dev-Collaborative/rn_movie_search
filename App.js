import React from 'react'
import { StyleSheet, Button, Text, View } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import SearchScreen from './screens/SearchScreen'
import MovieDetailsScreen from './screens/MovieDetailsScreen'

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  }
})

const RootStack = createStackNavigator(
  {
    "SearchScreen": SearchScreen,
    "MovieDetailsScreen": MovieDetailsScreen,
  },
  {
    initialRouteName: 'SearchScreen',
  }
)

export default class App extends React.Component {
  render() {
    return <RootStack style={styles.screen} />
  }
}