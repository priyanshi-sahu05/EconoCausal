import { useState } from "react";

function DataUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a CSV file first.");
      return;
    }

    alert(`Selected file: ${selectedFile.name}`);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Data Upload</h1>

        <p>
          Upload historical marketing campaign data for
          causal analysis.
        </p>
      </div>

      <div className="form-card">
        <h2>Historical Campaign Dataset</h2>

        <p className="form-description">
          Select a CSV file containing historical campaign
          information.
        </p>

        <div className="file-input-container">
          <label htmlFor="campaign-file">
            Select CSV File
          </label>

          <input
            id="campaign-file"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
          />
        </div>

        {selectedFile && (
          <div className="file-info">
            Selected file: <strong>{selectedFile.name}</strong>
          </div>
        )}

        <button onClick={handleUpload}>
          Upload Dataset
        </button>
      </div>

      <div className="info-card">
        <h3>Expected Dataset</h3>

        <p>
          The historical dataset will later contain campaign,
          treatment, outcome and customer feature information.
        </p>

        <div className="code-example">
          customer_id, treatment, revenue, age, previous_spend
        </div>
      </div>
    </div>
  );
}

export default DataUpload;