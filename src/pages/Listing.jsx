import React from 'react';

import ListingData from '../services/ListingData';
import withLocDirRouter from '../components/withLocDirRouter';
import PlaceLoader from '../components/PlaceLoader';

import Header from '../components/Header';
import ListingContent from '../components/ListingContent';
import {ListingContentLoader} from '../components/ListingContent';

const onBackClick = (props) => {
    props.history.push(
      `/search/${props.match.params.locFriendly}/${props.match.params.locCode}`
    );
}

const toPreLoad = (props) => ({
  listing: () => ListingData.getListing(props.id)
});

const ListingContentLoadered = PlaceLoader(ListingContent);

const Listing = (props) => (
  <div className="pg-listing">
    <Header searchTerm={props.theSearchTerm()} />
    <a onClick={() => onBackClick(props)}>Back to results</a>
    <ListingContentLoadered
      preLoad={toPreLoad}
      loaderComponent={ListingContentLoader}
    />
  </div>
);


// const LocDirListing = withLocDirRouter(Listing);
// const withPlaceLoader = PlaceLoader(toPreLoad);
// const PlaceLoadedListing = withPlaceLoader(LocDirListing);

export default withLocDirRouter(Listing);//PlaceLoadedListing;
