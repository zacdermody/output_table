import React, { useState, useEffect } from 'react';
import TableComponent from './TableComponent';
import './App.css'; // Import your CSS file

const App = () => {
  const [data, setData] = useState([]);
  const times = Array.from({ length: 60 }, (_, i) => `Week ${i + 1}`); // Now 60 weeks

  // Fetch data from the JSON file
  useEffect(() => {
    fetch('./residents_assignments.json')
      .then((response) => response.json())
      .then((jsonData) => {
        // Transform the JSON structure to match the format used in your table
        const transformedData = Object.entries(jsonData).map(([name, assignments]) => {
          // Convert the object to an array and fill up to 60 weeks with '-' for empty weeks
          const assignmentArray = Object.values(assignments);
          const filledAssignments = [...assignmentArray, ...Array(60 - assignmentArray.length).fill('-')]; // Fill remaining weeks with '-'
          return { name, assignments: filledAssignments };
        });
        setData(transformedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="table-container">
      <div className="schedule-table-wrapper">
        {/* Set weeksPerPage to 10 */}
        <TableComponent data={data} times={times} weeksPerPage={10} />
      </div>
    </div>
  );
};

export default App;

