import React from 'react';
import { Link } from 'react-router-dom';

const NewPageTest = () => {
  return (
    <div>
      <h1>This is the NEWPAGETEST</h1>
      {/* Add your content for the new page here */}
      <Link to="/">Home</Link> {/* Add a link to the Home screen */}
    </div>
  );
};

export default NewPageTest;
