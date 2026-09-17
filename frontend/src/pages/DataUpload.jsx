import { useState } from "react";

function DataUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      setMessage("Please select a CSV file.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setMessage("");
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setMessage("");
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setMessage("Please select a CSV file before uploading.");
      return;
    }

    setMessage(
      `File "${selectedFile.name}" is ready for upload.`
    );
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Historical Campaign Data</h1>

        <p>
          Upload historical marketing campaign data for
          causal analysis and treatment effect estimation.
        </p>
      </div>

      <div className="form-card">
        <h2>Upload Dataset</h2>

        <p className="form-description">
          Upload your historical campaign data in CSV format.
        </p>

        <div className="upload-area">
          <div className="upload-icon">📁</div>

          <h3>Select your CSV file</h3>

          <p>
            Supported format: CSV
          </p>

          <label
            htmlFor="campaign-file"
            className="file-select-button"
          >
            Choose File
          </label>

          <input
            id="campaign-file"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            hidden
          />
        </div>

        {selectedFile && (
          <div className="selected-file-card">
            <div>
              <strong>{selectedFile.name}</strong>

              <p>
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>

            <button
              type="button"
              className="remove-button"
              onClick={handleRemoveFile}
            >
              Remove
            </button>
          </div>
        )}

        {message && (
          <div className="upload-message">
            {message}
          </div>
        )}

        <button
          type="button"
          onClick={handleUpload}
          disabled={!selectedFile}
        >
          Upload Dataset
        </button>
      </div>

      <div className="info-card">
        <h3>Expected Dataset Information</h3>

        <p>
          The historical campaign dataset will later contain
          information required for causal machine learning.
        </p>

        <div className="dataset-fields">
          <span>Customer ID</span>
          <span>Treatment</span>
          <span>Revenue</span>
          <span>Customer Features</span>
          <span>Campaign Features</span>
        </div>
      </div>
    </div>
  );
}

export default DataUpload;