import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Helpers from '../services/Helpers';

/**
 * Adds common props required, including theSearchTerm, which is derived from the params.
 * Wraps in react-router's withRouter
 * 
 * @param Component Comp
 * @return Component 
 */
const withLocDirRouter = Comp => {
    
    const CompWithLocDirCust = (props) => {
        
        const theSearchTerm = () => (
            props.match.params.locCode 
                ? Helpers.fromUrlFriendly(props.match.params.locFriendly) 
                : null
        );
        const theSearchLocId = () => (
            props.match.params.locCode || null
        );
        return <Comp {...props} theSearchTerm={theSearchTerm} theSearchLocId={theSearchLocId} />
    }

    return withRouter(CompWithLocDirCust);
};

export default withLocDirRouter;
