import React from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native'

// import AbortController from "abort-controller"
// console.log(AbortController)
// const abortController = new AbortController()
// const abortSignal = abortController.signal
import { searchMovies } from '../api'
import apiKey from '../key'

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
    },
    center: {
        justifyContent: 'center',
        margin: 6,
    },
    results: {
        textAlign: 'left',
        borderBottomWidth: 1,
        borderBottomColor: "teal",
        borderStyle: "dashed",
        marginLeft: 6,
        marginRight: 6,
        padding: 4,
    },
    divider: {
        borderBottomWidth: 4,
        borderBottomColor: "teal",
        borderStyle: "solid",
        padding: 4,
        margin: 4,
    },
    search: {
        marginRight: 8,
        marginLeft: 8,
        padding: 4,
        backgroundColor: "#eee",
        height: 40, 
        borderColor: '#ccc', 
        borderWidth: 1,
    }
})

export default class SearchScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Search Movies`,
        }
    }

    state = {
        searchInput: ''
    }

    onChangeText = (searchInput) => {
        this.setState({ searchInput })
    }

    initiateSearch = async () => {
      // console.log('initiating search...')
      // (input phrase, api key, pages received so far)
      try {
        const results = await searchMovies(this.state.searchInput, apiKey, 0)
        // console.log('getting results?',results)

        const formattedResults = {
          searchInput: this.state.searchInput,
          searchResult: results.searchResult,
          cachedMovies: results.cachedMovies,
          resultPagesReceived: results.page,
        }

        // console.log('formatted results:',formattedResults)

        this.props.navigation.navigate("ResultsScreen", formattedResults)
      }
      catch (err) {
        console.error(err)
      }
      // console.log('Should not get here?')
    }

    // componentDidMount(){
    //     return fetch('https://facebook.github.io/react-native/movies.json')
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //         console.log(responseJson.movies)
    //       })
    //       .catch((error) =>{
    //         console.error(error);
    //       });
    //   }
  
    render() {
      return (
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={[styles.screen, styles.center]}>
                <TextInput
                    placeholder="Search For Movies"
                    style={[styles.center, styles.search]}
                    onChangeText={text => this.onChangeText(text)}
                    onSubmitEditing={() => this.initiateSearch()}
                    value={this.state.searchInput}
                    returnKeyType='search'
                />
                <TouchableHighlight onPress={() => this.initiateSearch()}>
                    <Text style={[styles.center, {padding: 10}]}>Search</Text>
                </TouchableHighlight>
            </KeyboardAvoidingView>
        </ScrollView>
      )    
    }  
  } 
