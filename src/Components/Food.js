import React, { useState, useCallback } from 'react';
import Cards from './Cards';
import Skeleton from './Skeleton';
import useFetch from '../hooks/useFetch';

const Food = () => {
    const [search, setSearch] = useState("");
    const [meals, setMeals] = useState(null);
    const [searched, setSearched] = useState(false);
    const { loading, error, fetchData } = useFetch();

    const handleInputChange = useCallback((event) => {
        setSearch(event.target.value);
    }, []);

    const handleSearch = useCallback(async () => {
        if (search.trim() === "") {
            return;
        }

        setSearched(true);
        const result = await fetchData(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
        );

        if (result) {
            setMeals(result.meals);
        }
    }, [search, fetchData]);

    const handleKeyPress = useCallback((event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }, [handleSearch]);

    const getStatusMessage = () => {
        if (error) return { text: error, type: 'error' };
        if (!searched) return { text: "Search for delicious recipes", type: 'default' };
        if (loading) return { text: "Finding recipes...", type: 'loading' };
        if (!meals || meals.length === 0) return { text: "No recipes found. Try another search!", type: 'empty' };
        return { text: `Found ${meals.length} recipe${meals.length > 1 ? 's' : ''}`, type: 'success' };
    };

    const status = getStatusMessage();

    return (
        <div className="food-container">
            <div className="hero-section">
                <h1 className="hero-title">
                    Discover <span className="gradient-text">Delicious</span> Recipes
                </h1>
                <p className="hero-subtitle">
                    Search from thousands of recipes from around the world
                </p>

                <div className="search-container">
                    <div className="search-bar">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search for any meal..."
                            value={search}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                        />
                        <button
                            className="search-button"
                            onClick={handleSearch}
                            disabled={loading}
                        >
                            {loading ? 'Searching...' : 'Search'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="results-section">
                <p className={`status-message ${status.type}`}>{status.text}</p>

                {loading ? (
                    <Skeleton count={6} />
                ) : (
                    <Cards meals={meals} />
                )}
            </div>
        </div>
    );
};

export default Food;