import CIcon from "@coreui/icons-react";
import { cilHome } from "@coreui/icons";
import { Context } from "../context/contextApi";
import spinner from "../assets/Pulse-1s-200px.gif";
import React, { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export default function License() {
  const {
    active,
    getLicense,
    setNoOfLicenses,
    setOrganization,
    setEmail,
    loading,
    no_of_licenses,
    organization,
    email,
  } = useContext(Context);

  const submitForm = () => {
    getLicense();
  };

  return (
    <>
      <div className="license">
        <div className={`license-wrapper ${active ? "active" : ""}`}>
          <div className="header">
            <span>License</span>
            <Link to={"/"} className="back-icon">
              <CIcon icon={cilHome} />
            </Link>
          </div>

          <div className="license-form mx-auto mt-4">
            <p className="text-center text-white">GET LICENSE FORM</p>
            <div className="form w-50 mx-auto">
              <div className="form-group">
                <input
                  type="number"
                  className="form-control py-2 mb-3 rounded-0"
                  placeholder="NO OF LICENSE"
                  onChange={(event) => {
                    setNoOfLicenses(parseInt(event.target.value));
                  }}
                  value={no_of_licenses}
                />
              </div>
              <div className="form-group">
                <input
                  type="TEXT"
                  className="form-control py-2 mb-3 rounded-0"
                  placeholder="ORGANIZATION NAME"
                  onChange={(event) => {
                    setOrganization(event.target.value);
                  }}
                  value={organization}
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  className="form-control py-2 mb-3 rounded-0"
                  placeholder="EMAIL"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  value={email}
                />
              </div>

              <button
                type="submit"
                className="btn btn-dark w-100 rounded-0"
                onClick={submitForm}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
