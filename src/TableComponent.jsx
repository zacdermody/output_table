import React, { useState, useEffect } from 'react';
import './TableComponent.css';
import EditFeatureComponent from './EditFeatureComponent';
import FilterComponent from './FilterComponent';
import ResidentDetailsComponent from './ResidentDetailsComponent'; // Import ResidentDetailsComponent

const TableComponent = ({ data, times, weeksPerPage }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredData, setFilteredData] = useState(data);
  const [filterText, setFilterText] = useState('');
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [residentDetails, setResidentDetails] = useState(null); // State for selected resident details

  const totalPages = Math.ceil(times.length / weeksPerPage);

  const startWeek = currentPage * weeksPerPage;
  const endWeek = startWeek + weeksPerPage;
  const currentTimes = times.slice(startWeek, endWeek);

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCellClick = (person, weekIndex) => {
    setSelectedPerson(person);
    setSelectedWeek(weekIndex);
    setIsEditOpen(true);
  };

  const handleModalClose = () => {
    setIsEditOpen(false);
  };

  const handleFilterChange = (text) => {
    setFilterText(text);
  };

  const handleResidentClick = (resident) => {
    setResidentDetails(resident); // Show resident details when name is clicked
  };

  const handleCloseResidentDetails = () => {
    setResidentDetails(null); // Close resident details modal
  };

  useEffect(() => {
    if (filterText === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter((person) =>
        person.name.toLowerCase().includes(filterText.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [filterText, data]);

  return (
    <div>
      {/* Filter Component */}
      <FilterComponent onFilterChange={handleFilterChange} />

      {/* Table Component */}
      <table className="schedule-table">
        <thead>
          <tr>
            <th></th>
            {currentTimes.map((time, index) => (
              <th key={index}>
                <div>{time}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((person, rowIndex) => (
            <tr key={rowIndex}>
              <td
                className="resident-name"
                onClick={() => handleResidentClick(person)} // Trigger resident details on click
              >
                {person.name}
              </td>
              {currentTimes.map((_, colIndex) => {
                const assignment = person.assignments[startWeek + colIndex] || '-';
                return (
                  <td
                    key={colIndex}
                    data-assignment={assignment}
                    onClick={() => handleCellClick(person, startWeek + colIndex)}
                  >
                    {assignment}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          className="pagination-button"
          onClick={goToPreviousPage}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>

      {/* Edit Feature Component */}
      {isEditOpen && (
        <EditFeatureComponent
          selectedPerson={selectedPerson}
          selectedWeek={selectedWeek}
          data={data}
          onClose={handleModalClose}
        />
      )}

      {/* Resident Details Component */}
      {residentDetails && (
        <ResidentDetailsComponent
          resident={residentDetails}
          onClose={handleCloseResidentDetails}
        />
      )}
    </div>
  );
};

export default TableComponent;
