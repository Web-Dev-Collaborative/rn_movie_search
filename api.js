// takes a query string, an api key, and the number of pages received thus far (starting at 0 for initial call)
export const searchMovies = async (query, apiKey, page) => {
    // console.log("getting movie data: "+query)
    try {
        // abort controller allows us to unsubscribe on unmount, closing a memory leak if fetch was left unattended
        const searchResult = await fetch(`
            http://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${query}&page=${page + 1}`
            // { signal: abortSignal, }
        )
        const json = await searchResult.json()
        const cachedMovies = [...json.Search]
        return { searchResult: json, cachedMovies, page: page + 1 }
      } catch (error) {
        console.error("something went wrong with fetching: "+error)
        throw new Error(error.message)
      }
}
