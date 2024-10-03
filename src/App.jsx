import React, { useState, useEffect } from 'react';
import TableComponent from './TableComponent';
import './App.css'; // Import your CSS file

const App = () => {
  const [data, setData] = useState([]);
  const [times, setTimes] = useState([]); // State for the date headers
  const totalWeeks = 60; // Total number of weeks you want

  // Fetch data from the JSON file
  useEffect(() => {
    fetch('./residents_assignments.json')
      .then((response) => response.json())
      .then((jsonData) => {
        // Extract the dates (keys) from the first resident's assignments
        const dates = Object.keys(jsonData[Object.keys(jsonData)[0]]); // Dates from the first resident
        
        // Fill the times array to have 60 items, using placeholders for any missing dates
        const filledTimes = [...dates, ...Array(totalWeeks - dates.length).fill(null)].map((date, index) => {
          return date ? date : `Week ${index + 1}`; // If no date, fallback to 'Week X'
        });

        // Transform the JSON structure to match the format used in your table
        const transformedData = Object.entries(jsonData).map(([name, assignments]) => {
          // Convert the object to an array of assignments
          const assignmentArray = Object.values(assignments);
          const filledAssignments = [...assignmentArray, ...Array(totalWeeks - assignmentArray.length).fill('-')]; // Fill missing assignments with '-'
          return { name, assignments: filledAssignments };
        });

        setData(transformedData);
        setTimes(filledTimes); // Set the filled times (dates and placeholders) as headers
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
