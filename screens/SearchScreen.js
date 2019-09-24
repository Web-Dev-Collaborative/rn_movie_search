import React from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet, TextInput, TouchableHighlight, View } from 'react-native'

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
        try {
            // (input phrase, api key, pages received so far)
            const results = await searchMovies(this.state.searchInput, apiKey, 0)
            const formattedResults = {
                searchInput: this.state.searchInput,
                searchResult: results.searchResult,
                cachedMovies: results.cachedMovies,
                resultPagesReceived: results.page,
            }
            this.props.navigation.navigate("ResultsScreen", formattedResults)
        } catch (err) {
            console.error(err)
            throw new Error(err.message)
        }
    }
  
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
                    <Text>Search</Text>
                </TouchableHighlight>
            </KeyboardAvoidingView>
        </ScrollView>
      )    
    }  
  } 
