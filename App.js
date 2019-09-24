import React from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import SearchScreen from './screens/SearchScreen'
import ResultsScreen from './screens/ResultsScreen'
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
    "ResultsScreen": ResultsScreen,
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

// attempt to fix error: Uncaught Error: Module AppRegistry is not a registered callable module (calling runApplication)
// https://github.com/expo/expo/issues/2027
// import AppRegistry from 'react-native'
// AppRegistry.registerComponent('Movie Info', ()=>{App})
