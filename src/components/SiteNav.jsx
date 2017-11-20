import React from 'react';

import { Link } from 'react-router-dom';

const SiteNav = () => (
  <div className="siteNav">
    <Link to="/about" className="dummyLink">About</Link>
    &nbsp;| <Link to="/start" className="dummyLink">Start</Link>
    &nbsp;| <Link to="/manage" className="dummyLink">Manage</Link>
  </div>
);

export default SiteNav;
