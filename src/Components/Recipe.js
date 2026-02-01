import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';

const Recipe = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { mealid } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!mealid) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }

        const data = await response.json();

        if (data.meals && data.meals.length > 0) {
          setRecipe(data.meals[0]);
        } else {
          setError('Recipe not found');
        }
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [mealid]);

  // Extract ingredients and measurements
  const getIngredients = () => {
    if (!recipe) return [];

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== '') {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure?.trim() || ''
        });
      }
    }
    return ingredients;
  };

  if (loading) {
    return (
      <div className="recipe-loading">
        <div className="loading-spinner"></div>
        <p>Loading recipe...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recipe-error">
        <h2>😕 Oops!</h2>
        <p>{error}</p>
        <NavLink to="/" className="back-home-btn">
          Back to Search
        </NavLink>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="recipe-error">
        <h2>Recipe not found</h2>
        <NavLink to="/" className="back-home-btn">
          Back to Search
        </NavLink>
      </div>
    );
  }

  const ingredients = getIngredients();

  return (
    <div className="recipe-page">
      <div className="recipe-hero">
        <div className="recipe-image-container">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="recipe-image"
          />
          {recipe.strCategory && (
            <span className="recipe-category">{recipe.strCategory}</span>
          )}
        </div>

        <div className="recipe-header">
          <h1 className="recipe-title">{recipe.strMeal}</h1>

          <div className="recipe-meta">
            {recipe.strArea && (
              <span className="meta-item">
                <span className="meta-icon">🌍</span>
                {recipe.strArea} Cuisine
              </span>
            )}
            {recipe.strTags && (
              <span className="meta-item">
                <span className="meta-icon">🏷️</span>
                {recipe.strTags.split(',').join(', ')}
              </span>
            )}
          </div>

          {recipe.strYoutube && (
            <a
              href={recipe.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="youtube-btn"
            >
              <span>▶</span> Watch Video
            </a>
          )}
        </div>
      </div>

      <div className="recipe-content">
        <div className="ingredients-section">
          <h2>
            <span className="section-icon">🥘</span>
            Ingredients
          </h2>
          <ul className="ingredients-list">
            {ingredients.map((item, index) => (
              <li key={index} className="ingredient-item">
                <span className="ingredient-measure">{item.measure}</span>
                <span className="ingredient-name">{item.ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="instructions-section">
          <h2>
            <span className="section-icon">📝</span>
            Instructions
          </h2>
          <div className="instructions-text">
            {recipe.strInstructions.split('\n').map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index}>{paragraph}</p>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;