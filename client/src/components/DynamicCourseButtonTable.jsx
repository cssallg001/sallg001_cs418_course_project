import React, { useEffect, useState } from 'react';
import '../index.css';

function DynamicButtonTable() {
  const [rows, setRows] = React.useState([
    {
      input1: ''
    },
  ]);

  const handleInputChange = (e, index) => {
    const values = [...rows];
    if (e.target.name === 'input1') {
      values[index].input1 = e.target.value;
    }
    setRows(values);
  };

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        input1: ''
      },
    ]);
  };

  const handleSubmit = () => {
    console.log(rows);
  };



  const [courseOptions, setCourseOptions] = useState([]);
  var selectedCourseList = [];


  function AlreadySelectedCourses() {
      $('option')
  }




  useEffect(() => {
    const fetchData = async () => {
      //const response = await fetch('http://localhost:8080/course/advisingPortalRequest');
      //const response = await fetch('https://sallg001-cs418-course-project.onrender.com/course/advisingPortalRequest');
      const response = await fetch(import.meta.env.VITE_API_KEY + '/course/advisingPortalRequest');
        const data = await response.json();8
yt
        // Assuming your API response is an array of objects like [{ id: 1, name: 'Option 1' }, ...]
        const formattedOptions = data.data.map((courseData) => ({
            value: courseData.course_id,
            label: courseData.courseName,
        }));

        setCourseOptions(formattedOptions);
    };

    fetchData();
  }, []);








  return (
    <div>
    {rows.map((row, index) => (
        <div key={index}>

            <select>

            
                {courseOptions.map((courseOptions) => (
                    <option key={courseOptions.value} value={courseOptions.value}>
                        {courseOptions.label}
                    </option>
                    ))}

            </select>                           

            
        </div>
        ))}
      <button onClick={handleAddRow}>Add Course</button>
    </div>
  );
}

export default DynamicButtonTable;
