import { useState } from "react";
import { uploadFile } from "../api/fileService";

export const useFileUpload = () => {

    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);
  
    const handleFileUpload = async (file) => {
      setIsUploading(true);
      setError(null);
  
      try {
        
        const response = await uploadFile(file);
        return response.url;

      } catch (err) {

        setError("Failed to upload file");
        console.error("File upload error:", err);

        throw err;
      } finally {
        setIsUploading(false);
      }
    };
  
    return { handleFileUpload, isUploading, error };
  };