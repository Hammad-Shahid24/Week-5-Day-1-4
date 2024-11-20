import { FC, useEffect, useState } from "react";
import axios from "axios";
import pokemonSVG from "../assets/pokemon-23.svg";
import { useNavigate } from "react-router-dom";

interface Type {
  type: {
    name: string;
  };
}

interface PokemonDetails {
  sprites: {
    front_default: string;
  };
  types: Type[];
}

interface Pokemon {
  name: string;
  url: string;
  image: string;
  types: string[];
}

const PokemonPage: FC = () => {
  const navigate = useNavigate();

  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get<{
          results: { name: string; url: string }[];
        }>("https://pokeapi.co/api/v2/pokemon?limit=18");

        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const { data }: { data: PokemonDetails } = await axios.get(
              pokemon.url
            );

            return {
              name: pokemon.name,
              url: pokemon.url,
              image: data.sprites.front_default || "",
              types: data.types.map((type) => type.type.name),
            };
          })
        );

        setPokemonData(pokemonDetails);
      } catch (error) {
        const errorMessage = axios.isAxiosError(error)
          ? `Network error: ${error.message}`
          : "Some error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
        <div className="text-2xl text-white font-bold animate-pulse">
          Loading Pokémon...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-500">
        <div className="text-2xl text-white font-bold">{`Error: ${error}`}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 ">
      <div
        className=" flex items-center flex-col sm:flex-row sm:justify-center 
       sm:relative gap-8 px-12"
      >
        <img
          src={pokemonSVG}
          alt="Pokémon logo"
          className="w-40 mb-8 sm:mb-0"
        />
        <button
          onClick={() => navigate("/form")}
          className="sm:mt-1 flex justify-center items-center sm:absolute right-14 top-1 border border-white text-white font-semibold rounded-md px-4 h-fit w-full sm:w-fit py-1 hover:border-transparent hover:bg-white hover:text-blue-500 transition-all duration-300 text-lg"
        >
          To Form <span className="text-2xl pb-0.5">&rarr;</span>
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-6  mt-24">
        {pokemonData.map((pokemon, index) => (
          <div
            key={pokemon.name}
            className="relative bg-white rounded-lg shadow-lg p-6 w-80 transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <div className="absolute top-0 left-0 bg-gray-200 text-gray-700 font-bold px-3 py-1 rounded-tr-lg rounded-bl-lg">
              #{index + 1}
            </div>

            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-full h-64 object-contain mb-4 rounded-lg transform transition duration-300 hover:scale-110"
            />

            <h2 className="text-2xl font-semibold text-center capitalize mb-2">
              {pokemon.name}
            </h2>

            <p className="text-center text-gray-500 mb-4">
              {pokemon.types
                .map((type) => type.charAt(0).toUpperCase() + type.slice(1))
                .join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonPage;
