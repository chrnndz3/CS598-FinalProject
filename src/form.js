import React from "react";
import "bootstrap/dist/css/bootstrap.css";

export const Form = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group mt-5">
        <label htmlFor="name">Name</label>
        <input
          className="form-control"
          id="name"
          placeholder="John Appleseed"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="name@example.com"
        />
      </div>
      <div className="form-group">
        <label htmlFor="report">Report Incident</label>
        <textarea
          class="form-control"
          id="report"
          placeholder="Summarize the incident"
          rows="4"
        ></textarea>
        {/* <input
          type="text"
          className="form-control"
          id="report"
          placeholder="What Happened?"
        /> */}
      </div>
      <div className="form-group">
        <label htmlFor="details">Details</label>
        <textarea
          class="form-control"
          id="details"
          placeholder="Details of incident"
          rows="4"
        ></textarea>
        {/* <input
          type="text"
          className="form-control"
          id="details"
          placeholder="Details of incident"
        /> */}
      </div>
      {/* <div className="form-group">
        <button className="form-control btn btn-primary" type="submit">
          Submit
        </button>
      </div> */}
    </form>
  );
};
export default Form;
