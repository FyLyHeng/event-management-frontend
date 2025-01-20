import React, { useState } from "react";
import PropTypes from "prop-types";

const FileUpload = ({ onFileUploaded }) => {

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {

    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUploadClick = () => {

    if (selectedFile) {
      onFileUploaded(selectedFile);
      setSelectedFile(null);
    }

  };

  return (
    <div className="fileUpload">
      <input
        type="file"
        onChange={handleFileChange}
        className="eventInput"
        accept="image/*,application/pdf"
      />
      <button
        className="uploadButton"
        disabled={!selectedFile}
        onClick={handleUploadClick}
      >
        Upload
      </button>
    </div>
  );
};

FileUpload.propTypes = {
  onFileUploaded: PropTypes.func.isRequired,
};

export default FileUpload;
