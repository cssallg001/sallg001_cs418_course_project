import React, { useState, useEffect } from 'react';

function AdvisingPortalRequestCourseDropdown() {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8080/course/advisingPortalRequest');
      const data = await response.json();

      // Assuming your API returns an array of objects like: [{ id: 1, name: 'Option 1' }, ...]
      const formattedOptions = data.data.map(item => ({ value: course_id, label: courseName }));
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

export default AdvisingPortalRequestCourseDropdown;