import React from "react";

const VenueList = ({ venues, isFetching, fetchError }) => {
    
    return (
      <div className="eventList">
        <h2>Venue List</h2>
  
        {isFetching && <p>Loading venues...</p>}
        {fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}
  
        <table className="eventTable">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {venues.length > 0 ? (
              venues.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center' }}>
                  No venue found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
};
  
export default VenueList;