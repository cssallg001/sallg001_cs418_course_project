import React, { Component, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../index.css";

function DynamicPrereqButtonTable() {
  const [prereqOptions, setPrereqOptions] = useState([]);
  const [selectedPrereqOptions, setSelectedPrereqOptions] = useState([]);

  const [showTable, setShowTable] = useState(false);

  const [outputPrereqData, setOutputPrereqData] = useState([]);

  const [prereqRows, setRows] = React.useState([
    {
      prereqDropdown: "",
    },
  ]);

  const handleInputChange = (e, index) => {
    const prereqDropdownID = e.target.id;
    const selectedPrereqValue = e.target.value;
    const values = [...prereqRows]; 

    if (e.target.id === "prereqDropdown") {
      values[index].prereqDropdown = e.target.value;
    }
    setRows(values);
    console.log(prereqRows);
  };

  const [prereqStrignArray, setPrereqStrignArray] = useState([]);

  useEffect(() => {
    localStorage.setItem('prereqStringArray', JSON.stringify(prereqRows));
  }, [prereqRows]);

  const handleAddRow = () => {
    setRows([
      ...prereqRows,
      {
        prereqDropdown: "",
      },
    ]);
  };

  useEffect(() => {
  }, [prereqRows]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        //"http://localhost:8080/prerequisites/advisingPortalRequest"
        import.meta.env.VITE_API_KEY + "prerequisites/advisingPortalRequest"
        //"https://sallg001-cs418-course-project.onrender.com/prerequisites/advisingPortalRequest"
      );
      const data = await response.json();

      const formattedOptions = data.data.map((prereqData) => ({
        value: prereqData.prereq_id,
        label: prereqData.prereqName,
      }));

      setPrereqOptions(formattedOptions);
    };

    fetchData();
  }, []);

  const handleSubmit = () => {
    setShowTable(true);
    console.log("prereqRows: " + prereqRows);
  };

  return (
    <div>
      <div>
        {prereqRows.map((row, index) => (
          <div key={index}>
            <select
              id="prereqDropdown"
              onChange={(e) => handleInputChange(e, index)}
              defaultValue={"-- select an option --"}
            >
              <option disabled selected value>
                {" "}
              </option>
              {prereqOptions.map((prereqOptions) => (
                <option key={prereqOptions.value} value={prereqOptions.value}>
                  {prereqOptions.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <button onClick={handleAddRow}>Add Prerequisite</button>
    </div>
  );
}

export default DynamicPrereqButtonTable;
