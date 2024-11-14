import React from 'react';

const Favorites = ({ favorites, removeFromFavorites }) => {
    return (
        <div className="favorites-panel">
            <h2>My Favorites</h2>
            <ul>
                {favorites.map((recipe, index) => (
                    <li key={index}>
                        <div>
                            <img src={recipe.image} alt={recipe.label} />
                            <h3>{recipe.label}</h3>
                            <button onClick={() => removeFromFavorites(recipe)}>Remove</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Favorites;
