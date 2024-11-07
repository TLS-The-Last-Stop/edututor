const Category = ({
                    categories,
                    selectedCategoryId,
                    onCategorySelect
                  }) => {
  const renderCategoryItem = (category) => (
    <div key={category.id} className="category-item">
      <button
        className={`category-button ${selectedCategoryId === category.id ? 'selected' : ''}`}
        onClick={() => onCategorySelect(category.id)}
      >
        {category.name}
      </button>
      {category.children && category.children.length > 0 && (
        <div className="subcategory-list">
          {category.children.map(child => renderCategoryItem(child))}
        </div>
      )}
    </div>
  );

  return (
    <div className="category-container">
      <button
        className={`category-button ${selectedCategoryId === null ? 'selected' : ''}`}
        onClick={() => onCategorySelect(null)}
      >
        전체
      </button>
      {categories.map(category => renderCategoryItem(category))}
    </div>
  );
};

export default Category;