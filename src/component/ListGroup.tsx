import React from 'react';

interface City {
  id: number;
  name: string;
  description: string;
}

interface ListGroupProps {
  cities: City[];
  selectedCity: number | null;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void; // New prop for delete functionality
}

const ListGroup: React.FC<ListGroupProps> = ({ cities, selectedCity, onSelect, onDelete }) => {
  return (
    <ul className="list-group">
      {cities.map((city) => (
        <li
          key={city.id}
          className={`list-group-item ${
            selectedCity === city.id ? 'list-group-item-primary' : ''
          } d-flex justify-content-between align-items-center`}
          onClick={() => onSelect(city.id)}
          style={{ cursor: 'pointer' }}
        >
          <span>{city.name}</span>
          <button
            className="btn btn-danger btn-sm"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the onSelect event
              onDelete(city.id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
