import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Cards component for displaying meal search results
 * Renders a grid of meal cards with images and recipe links
 */
const Cards = ({ meals }) => {
  if (!meals || meals.length === 0) {
    return null;
  }

  return (
    <div className="meals">
      {meals.map((meal) => (
        <article className="meal-card" key={meal.idMeal}>
          <div className="card-image-wrapper">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              loading="lazy"
            />
            <div className="card-overlay">
              <NavLink to={`/${meal.idMeal}`} className="view-recipe-btn">
                View Recipe
              </NavLink>
            </div>
          </div>
          <div className="card-content">
            <h3 className="card-title">{meal.strMeal}</h3>
            {meal.strCategory && (
              <span className="card-category">{meal.strCategory}</span>
            )}
          </div>
        </article>
      ))}
    </div>
  );
};

Cards.propTypes = {
  meals: PropTypes.arrayOf(
    PropTypes.shape({
      idMeal: PropTypes.string.isRequired,
      strMeal: PropTypes.string.isRequired,
      strMealThumb: PropTypes.string.isRequired,
      strCategory: PropTypes.string,
    })
  ),
};

Cards.defaultProps = {
  meals: null,
};

export default Cards;