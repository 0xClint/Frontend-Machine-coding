import React from "react";

export const Applications = () => {
  return (
    <>
      <h1>Job application form</h1>
      <h2>Section 1</h2>
      <p>All fields are mandatory</p>
      <span title="close"> X</span>
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        alt="profile-img"
        width={100}
      />
      <div data-testid="custom-element">Custom html Element</div>
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" placeholder="FullName" value="Rajesh" />
        </div>
        <div>
          <label htmlFor="bio">Bio</label>
          <textarea id="bio" />
        </div>

        <div>
          <label htmlFor="job-location">Job location</label>
          <select id="job-location">
            <option value="">Select Country</option>
            <option value="US">US</option>
            <option value="India">India</option>
            <option value="London">London</option>=
          </select>
        </div>
        <div>
          <label>
            <input type="checkbox" /> I agree to the terms
          </label>
        </div>

        <button>Submit</button>
      </form>
    </>
  );
};
