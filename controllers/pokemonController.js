import axios from 'axios'

const pokemonObj = {}

const pokemonController = async (req, res, next) => {
  const pokemonName = req.params.id
  // Function to retrieve all Pokémon evolutions
  async function getAllEvolutions() {
    try {
      // Fetch the Pokémon species data
      const speciesResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
      )
      const speciesData = speciesResponse.data

      // Fetch the evolution chain data
      const evolutionChainResponse = await axios.get(
        speciesData.evolution_chain.url
      )
      const evolutionChainData = evolutionChainResponse.data

      // Process the evolution chain
      console.log(`Evolution chain for ${speciesData.name}:`)

      pokemonObj.name = speciesData.name

      processEvolutionChain(evolutionChainData.chain)
      return pokemonObj
    } catch (error) {
      console.log('Error:', error.message)
    }
  }

  // Recursive function to process the evolution chain
  function processEvolutionChain(chainData) {
    pokemonObj.variations = []
    pokemonObj.variations.push({"name": chainData.species.name})
    console.log(chainData.species.name)
    if (chainData.evolves_to.length > 0) {
      console.log(chainData.evolves_to.length)
      for (const evolution of chainData.evolves_to) {
        processEvolutionChain(evolution)
      }
    }
  }

  // Call the function to retrieve all Pokémon evolutions

  res.status(200).json(await getAllEvolutions())
}

export { pokemonController }
