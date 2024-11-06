import React, { useState, useEffect } from 'react';

function AdvisingPortalRequestPrereqDropdown() {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('YOUR_API_ENDPOINT');
      const data = await response.json();

      // Assuming your API returns an array of objects like: [{ id: 1, name: 'Option 1' }, ...]
      const formattedOptions = data.map(item => ({ value: item.id, label: item.name }));
      setOptions(formattedOptions);
    };

    fetchData();
  }, []);

  return (
    <select>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default AdvisingPortalRequestPrereqDropdown;