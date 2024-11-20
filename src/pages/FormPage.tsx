import React from "react";
import Form from "../components/Form";
import pokemonSVG from "../assets/pokemon-23.svg";
import { useNavigate } from "react-router-dom";

const FormPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col  items-center justify-center py-8">
      <div
        className=" flex w-full items-center flex-col sm:flex-row sm:justify-center 
       sm:relative gap-8 px-12 "
      >
        <img
          src={pokemonSVG}
          alt="Pokémon logo"
          className="w-40 mb-8 sm:mb-0"
        />
        <button
          onClick={() => navigate("/")}
          className="sm:mt-1 flex justify-center items-center sm:absolute left-14 top-1 border border-white text-white font-semibold rounded-md px-4 h-fit w-full sm:w-fit py-1 hover:border-transparent hover:bg-white hover:text-blue-500 transition-all duration-300 text-lg"
        >
          <span className="text-2xl pb-1">&larr;</span> To Pokémons
        </button>
      </div>
      <Form />
    </div>
  );
};

export default FormPage;
