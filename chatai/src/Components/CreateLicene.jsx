import CIcon from "@coreui/icons-react";
import { cilHome } from "@coreui/icons";
import { Context } from "../context/contextApi";
import React, { useContext, useState, useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";

export default function CreateLicense() {
  const { active, createLicense } = useContext(Context);
  const [csvFile, setCsvFile] = useState(null);
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file?.type === "text/csv") {
      setCsvFile(file);
    } else {
      alert("Please drop a CSV file.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  const handleClick = () => {
    document.getElementById("file-input").click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file?.type === "text/csv") {
      setCsvFile(file);
    } else {
      toast.error("Please select the CSV file", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const submitForm = () => {
    if (csvFile || organization.length > 0 || email.length > 0) {
      const formData = new FormData();
      formData.append("csv_file", csvFile);
      formData.append("organization", organization);
      formData.append("email", email);
      console.log(formData);
      createLicense(formData);
      setCsvFile(null);
      setOrganization("");
        setEmail("");
    } else {
      toast.error("Please fill all the fields", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="create-license">
      <div className={`license-wrapper ${active ? "active" : ""}`}>
        <div className="header">
          <span>Create Licenses</span>
          <Link to={"/"} className="back-icon">
            <CIcon icon={cilHome} />
          </Link>
        </div>

        <div className="create-license-form mx-auto mt-4" {...getRootProps()}>
          <input
            {...getInputProps()}
            id="file-input"
            onChange={handleFileChange}
          />

          <div className="form w-50 mx-auto my-5 py-5">
            <div
              onClick={handleClick}
              className={` dragAndDrop ${isDragActive} ? "drag-active" : ""`}
            >
              {csvFile ? (
                <p>CSV file selected: {csvFile.name}</p>
              ) : isDragActive ? (
                <p>Drop the CSV file here...</p>
              ) : (
                <p>Drag and drop a CSV file here, or click to select file.</p>
              )}
            </div>

            <input
              type="text"
              className="form-control my-3"
              onChange={(e) => {
                setOrganization(e.target.value);
              }}
              value={organization}
              placeholder="ORGANIZATION"
            ></input>
            <input
              type="text"
              className="form-control my-3"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              placeholder="EMAIL"
            ></input>

            <button
              onClick={submitForm}
              type="submit"
              className="btn btn-dark w-100"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
