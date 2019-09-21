import React from 'react'
import { Button, FlatList, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

// import AbortController from "abort-controller"
// console.log(AbortController)
// const abortController = new AbortController()
// const abortSignal = abortController.signal

import apiKey from '../key.js'

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
        searchInput: '',
        searchResult: {},
        cachedMovies: [],
        resultPagesReceived: 0,
    }
    
    getMovieData = async () => {
        console.log("getting movie data: "+this.state.searchInput)
        try {
            // abort controller allows us to unsubscribe on unmount, closing a memory leak if fetch was left unattended
            const searchResult = await fetch(`
                http://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${this.state.searchInput}&page=1`
                // { signal: abortSignal, }
            )
            const json = await searchResult.json()
            const cachedMovies = [...json.Search]
            this.setState({ searchResult: json, cachedMovies, resultPagesReceived: 1 })
          } catch (error) {
            console.error(error)
          }
    }

    getAdditionalData = async () => {
        const totalNumberOfPages = this.state.searchResult.totalResults / 10 // API returns 10 results per page
        const remainingPagesOfResults = Math.ceil(totalNumberOfPages - this.state.resultPagesReceived)

        console.log("remaining pages of data: "+remainingPagesOfResults)
        if (remainingPagesOfResults >= 1) {
            try {
                const query = await fetch(`
                    http://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${this.state.searchInput}&page=${this.state.resultPagesReceived + 1}` 
                    // { signal: abortSignal, }
                )
                const json = await query.json()
                const newCachedMovies = [...this.state.cachedMovies, ...json.Search]
                this.setState({ cachedMovies: newCachedMovies, resultPagesReceived: this.state.resultPagesReceived + 1 })
              } catch (error) {
                console.error(error)
              }    
        }
    }

    onChangeText = (searchInput) => {
        this.setState({ searchInput })
    }
  
    render() {
      return (
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={[styles.screen, styles.center]}>
                <TextInput
                    placeholder="Search For Movies"
                    style={[styles.center, styles.search]}
                    onChangeText={text => this.onChangeText(text)}
                    onSubmitEditing={() => this.getMovieData()}
                    value={this.state.searchInput}
                />
            </KeyboardAvoidingView>

            <Text style={styles.divider}>{this.state.searchResult.totalResults || 0} results:</Text>

            <FlatList
                data={this.state.cachedMovies}
                ItemSeparatorComponent={SeparatorComponent}
                ListEmptyComponent={() => <Text>No results for that search!</Text>}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <TouchableOpacity 
                        onPress={() => this.props.navigation.push("MovieDetailsScreen", item)}
                        style={styles.results}
                        >
                        <Text>{index + 1}. {item.Title} [{item.Year}] </Text>
                    </TouchableOpacity>)}
            />

            {(((this.state.searchResult.totalResults / 10) - this.state.resultPagesReceived) > 0) &&
                <Button
                    onPress={() => this.getAdditionalData()}
                    title="Load More Results"
                    color="#444"
                />
            }
        </ScrollView>
      )    
    }  
  } 

const SeparatorComponent = props => {
    return (<View style={{marginBottom: 2,}} />)
}

//  Keys in searchResult:
//  Array [
//    "Search",
//    "totalResults",
//    "Response",
//  ]

//  Keys in searchResult[n]:
//  Object {
//  "Poster": "https://ia.media-imdb.com/images/M/MV5BOWNkZmVjODAtNTFlYy00NTQwLWJhY2UtMmFmZTkyOWJmZjZiL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg",
//  "Title": "Star Wars: Episode II - Attack of the Clones",
//  "Type": "movie",
//  "Year": "2002",
//  "imdbID": "tt0121765",
//   },
    