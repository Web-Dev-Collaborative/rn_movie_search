// takes a query string, an api key, and the number of pages received thus far (starting at 0 for initial call)
export async function searchMovies(query, apiKey, page) {
    // console.log("getting movie data: ", query, apiKey, page)
    try {
        // abort controller allows us to unsubscribe on unmount, closing a memory leak if fetch was left unattended
        let searchResult = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${query}&page=${page + 1}`)
        const json = await searchResult.json()
        return { searchResult: json, cachedMovies: [...json.Search], page: page + 1 }
      } catch (error) {
        console.error("Something went wrong with fetching: "+error)
        throw new Error(error.message)
      }
}
