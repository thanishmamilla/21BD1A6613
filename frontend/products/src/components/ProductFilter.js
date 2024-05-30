import React, { useState } from 'react';

const Filters = ({ setFilters }) => {
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  // Add state for other filters

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilters({ category, company });
  };

  return (
    <div className="filters">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        {/* Add more filter inputs */}
        <button type="submit">Apply Filters</button>
      </form>
    </div>
  );
};

export default Filters;
