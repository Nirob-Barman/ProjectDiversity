import React, { useState, useRef } from 'react';

const Main = () => {
  const [targetLanguage, setTargetLanguage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // Unique key for file input
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleLanguageChange = (e) => {
    setTargetLanguage(e.target.value);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setIsDragging(false); // Reset dragging state when a file is selected
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
    setIsDragging(false); // Reset dragging state when a file is dropped
  };

  const handleFileUpload = () => {
    // Implement file upload logic here
    if (selectedFile) {
      console.log(`File uploaded: ${selectedFile.name}`);
      // Implement translation logic with the selected language
      // Clear the selected file
      setSelectedFile(null);
      // Change the key to reset the file input
      setFileInputKey(Date.now());
    } else {
      console.log('No file selected');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
        <h1 className="text-3xl font-semibold mb-4">Translation App</h1>

        <label className="block mb-4">
          Select the language you want to translate to:
          <select
            className="mt-1 p-2 border rounded w-full"
            value={targetLanguage}
            onChange={handleLanguageChange}
          >
            {/* Add language options based on your requirements */}
            <option value="en">English</option>
            <option value="es">Spanish</option>
            {/* Add more language options as needed */}
          </select>
        </label>

        <div
          className={`border-2 border-dashed border-gray-300 p-4 mb-4 ${
            isDragging ? 'bg-gray-100' : ''
          }`}
          onDrop={handleFileDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <p className="mb-2">Drag and drop your file here or click to select:</p>
          <input
            key={fileInputKey}
            type="file"
            onChange={handleFileSelect}
            className="w-full"
            ref={fileInputRef}
          />
          {selectedFile && (
            <p className="mt-2">Selected File: {selectedFile.name}</p>
          )}
        </div>

        <button
          className="btn bg-blue-500 text-white hover:bg-blue-600"
          onClick={handleFileUpload}
        >
          Upload and Translate
        </button>
      </div>
    </div>
  );
};

export default Main;
