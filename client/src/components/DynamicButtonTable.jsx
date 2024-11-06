import * as React from 'react';

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

  return (
    <div>
      {rows.map((row, index) => (
        <div key={index}>
          <input
            type="text"
            name="input1"
            value={row.input1}
            onChange={(e) => handleInputChange(e, index)}
          />

        </div>
      ))}
      <button onClick={handleAddRow}>Add Course</button>
    </div>
  );
}

export default DynamicButtonTable;
