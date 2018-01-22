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

    // const CompWRouter = (Comp);

    class CompWithLocDirCust extends Component {

        constructor(cProps) {
            super(cProps);

            // this.theSearchTerm = this.theSearchTerm.bind(this);
            this.theSearchTerm = () => (
                this.props.match.params.locCode 
                    ? Helpers.fromUrlFriendly(this.props.match.params.locFriendly) 
                    : null
            );
            this.theSearchLocId = () => (
                this.props.match.params.locCode || null
            );
        }

        render() {
            return <Comp {...this.props} theSearchTerm={this.theSearchTerm} theSearchLocId={this.theSearchLocId} />
        }
    }

    return withRouter(CompWithLocDirCust);
};

export default withLocDirRouter;
