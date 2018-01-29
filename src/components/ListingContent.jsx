import React from 'react';

const ListingContent = props => {
    const listing = props.listing || {};
    return (
        <div className={['cmp-listing', props.loading ? 'loading':''].join(' ')}>
            <h1>{listing.listing_name || null}</h1>
            <div>{listing.desc || null}</div>
        </div>
    )
};

export const ListingContentLoader = () => (<ListingContent
    listing={{
        desc: "Please wait a moment",
    }}
/>);

export default ListingContent;