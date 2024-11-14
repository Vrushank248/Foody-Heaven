import React, { Component } from 'react';
import './RecipeFinder.css';
import Favorites from './Favorites';

class RecipeFinder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            recipes: [],
            favorites: [] // New state to store favorite recipes
        };
    }

    handleInputChange = (event) => {
        this.setState({ searchValue: event.target.value });
    };

    searchRecipes = async () => {
        const { searchValue } = this.state;
        if (searchValue.trim() !== '') {
            const response = await fetch(`https://api.edamam.com/search?q=${searchValue}&app_id=7aa516a5&app_key=dc836a223fb788b11ae390504d9e97ce&from=0&to=10`);
            const data = await response.json();
            this.setState({ recipes: data.hits });
        }
    };

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.searchRecipes();
        }
    };

    addToFavorites = (recipe) => {
        const { favorites } = this.state;
        if (!favorites.some(fav => fav.label === recipe.label)) {
            this.setState(prevState => ({
                favorites: [...prevState.favorites, recipe]
            }));
        }
    };

    removeFromFavorites = (recipe) => {
        this.setState(prevState => ({
            favorites: prevState.favorites.filter(fav => fav.label !== recipe.label)
        }));
    };

    render() {
        return (
            <div className="container">
                <div className="main">
                    <h1>Foody Heaven</h1>
                    <div className="search">
                        <input
                            placeholder="Search food or ingredients..."
                            className="input"
                            type="text"
                            value={this.state.searchValue}
                            onChange={this.handleInputChange}
                            onKeyPress={this.handleKeyPress}
                        />
                        <button className="search-button" onClick={this.searchRecipes}>Search</button>
                    </div>
                    <div className="recipe-result">
                        <ul id="results">
                            {this.state.recipes.map((recipe, index) => (
                                <li key={index} className="recipe-item">
                                    <div>
                                        <img src={recipe.recipe.image} alt={recipe.recipe.label} />
                                        <h3>{recipe.recipe.label}</h3>
                                        <button onClick={() => this.addToFavorites(recipe.recipe)}>Add to Favorites</button>
                                    </div>
                                    <div className="recipe-link">
                                        <a href={recipe.recipe.url} target="_blank" rel="noopener noreferrer">View Recipe</a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="sidebar">
                    <Favorites favorites={this.state.favorites} removeFromFavorites={this.removeFromFavorites} />
                </div>
            </div>
        );
    }
}

export default RecipeFinder;
