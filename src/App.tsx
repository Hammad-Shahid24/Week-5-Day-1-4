import { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import PokemonPage from "./pages/PokemonPage";
import FormPage from "./pages/FormPage";

const App: FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<PokemonPage />} />
            <Route path="/form" element={<FormPage />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
