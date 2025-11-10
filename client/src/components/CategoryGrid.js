import React from 'react';

const CategoryGrid = ({ onCategorySelect }) => {
  const categories = [
    {
      name: 'Electronics',
      icon: '📱',
      color: '#4f46e5',
      description: 'Latest gadgets and tech',
      count: '25+ Items'
    },
    {
      name: 'Home',
      icon: '🏠',
      color: '#059669',
      description: 'Home essentials and decor',
      count: '15+ Items'
    },
    {
      name: 'Fitness',
      icon: '💪',
      color: '#dc2626',
      description: 'Health and fitness gear',
      count: '10+ Items'
    },
    {
      name: 'Accessories',
      icon: '👜',
      color: '#7c3aed',
      description: 'Style and accessories',
      count: '8+ Items'
    }
  ];

  return (
    <section className="category-section">
      <div className="section-header">
        <h2 className="section-title">Shop by Category</h2>
        <p className="section-subtitle">Explore our carefully curated collections</p>
      </div>
      
      <div className="category-grid">
        {categories.map((category) => (
          <div 
            key={category.name}
            className="category-card"
            onClick={() => onCategorySelect(category.name)}
            style={{ '--category-color': category.color }}
          >
            <div className="category-icon">{category.icon}</div>
            <h3 className="category-name">{category.name}</h3>
            <p className="category-description">{category.description}</p>
            <span className="category-count">{category.count}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;