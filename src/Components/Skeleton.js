import React from 'react';

/**
 * Skeleton loading component for recipe cards
 * Displays animated placeholders while content loads
 */
const Skeleton = ({ count = 6 }) => {
    return (
        <div className="meals">
            {[...Array(count)].map((_, index) => (
                <div className="skeleton-card" key={index}>
                    <div className="skeleton-image"></div>
                    <div className="skeleton-content">
                        <div className="skeleton-title"></div>
                        <div className="skeleton-button"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Skeleton;
