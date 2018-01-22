import React from 'react';

const Listing = (p) => (
  <div className="pg-listing">
    <h1>Listing Page</h1>
    {console.log(p.match.params)}
  </div>
);

export default Listing;
