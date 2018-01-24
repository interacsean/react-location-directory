import React from 'react';

import withLocDirRouter from '../components/withLocDirRouter';
import Header from '../components/Header';

const onBackClick = (props) => {
    props.history.push(
      `/search/${props.match.params.locFriendly}/${props.match.params.locCode}`
    );
}
const Listing = (props) => (
  <div className="pg-listing">
    <Header searchTerm={props.theSearchTerm()} />
    <h1>Listing Page</h1>
    <a onClick={() => onBackClick(props)}>Back to results</a>
    {console.log(props.match.params)}
  </div>
);

const preLoad = () => {
  return {};
}

export default placeLoader(preLoad)(withLocDirRouter(Listing));
