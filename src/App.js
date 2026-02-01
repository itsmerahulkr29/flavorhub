import './App.css';
import { Route, Routes } from 'react-router-dom';
import Food from "./Components/Food";
import Recipe from './Components/Recipe';
import Header from './Components/Header';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path='/' element={<Food />} />
          <Route path='/:mealid' element={<Recipe />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
