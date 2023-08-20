import React from 'react';
import { Form } from 'react-bootstrap';

interface SortOptionsProps {
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
}

const SortOptionsComponent: React.FC<SortOptionsProps> = ({ setSortOption }) => {
  const handleSortOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  return (
    <Form.Select onChange={handleSortOptionChange} aria-label="Default select example">
      <option value="">SORT BY</option>
      <option value="name_1">Name A-Z</option>
      <option value="name_-1">Name Z-A</option>
      {/* Add more sorting options if needed */}
    </Form.Select>
  );
};

export default SortOptionsComponent;
