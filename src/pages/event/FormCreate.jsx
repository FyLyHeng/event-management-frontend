// import '../../style/Event.css';
import FileUpload from '../../component/FileUpload';

const CreateEventForm = ({ event, handleChange, handleCreateEvent, loading, venues }) => {

    const handleFileUpload = (url) => {
        handleChange("imageUrl", url);
    };


  return (
    <div className="eventForm">
      <h2>Create Event</h2>

      <input
        value={event.title}
        className="eventInput"
        placeholder="Title"
        onChange={(e) => handleChange('title', e.target.value)}
      />

      <input
        value={event.eventDate}
        className="eventInput"
        placeholder="Date"
        type="date"
        onChange={(e) => handleChange('eventDate', e.target.value)}
      />

      <textarea
        value={event.description}
        className="eventInput"
        placeholder="Description"
        onChange={(e) => handleChange('description', e.target.value)}
      />

      {/* Dropdown for selecting a venue */}
      <select
        value={event.description}
        className="eventInput"
        onChange={(e) => handleChange('description', e.target.value)}
      >
        <option value="">Select Venue</option>
        {venues && venues.length > 0 ? (
          venues.map((venue, index) => (
            <option key={index} value={venue.name+" - "+ venue.address}>
              {venue.name}
            </option>
          ))
        ) : (
          <option value="">No venues available</option>
        )}
      </select>


      <FileUpload onUpload={handleFileUpload} />


      <button disabled={loading} onClick={handleCreateEvent}>
        {loading ? 'Loading...' : 'Submit'}
      </button>
    </div>
  );
};

export default CreateEventForm;
