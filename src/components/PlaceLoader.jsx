
import React, { Component } from 'react';

class ComponentLoader extends Component {

    constructor(props){
        super(props);
        this.state = {
            loaded: false,
        }
    }

    preLoad(props) {
        let preLoadMap = props.toPreLoadFn(props);
        let dataKeys = [];
        let dataProms = [];
        for (let i in preLoadMap) if (preLoadMap.hasOwnProperty(i)) {
            dataKeys.push(i);
            dataProms.push(preLoadMap[i]());
        }
        Promise.all(dataProms)
            .then(dataVals => {
                const dataZipped = Object.assign({},
                    ...dataKeys.map((n, index) => ({[n]: dataVals[index]}))
                );
                this.setState({
                    loaded: true,
                    loadedProps: dataZipped,
                });
            })
    }

    componentDidMount() {
        this.preLoad(this.props);
    }

    render() {
        const Comp = this.props.toLoadComponent;
        const LoaderComp = this.props.customLoader 
            || (() => <div>Please wait a moment...</div>);
        return this.state.loaded === false
            ? <LoaderComp loaded={false} {...this.props.thruProps}/>
            : <Comp
                loaded={true}
                {...this.props.thruProps}
                {...this.state.loadedProps}
            />;
    };
}

const PlaceLoader = Component => props => <ComponentLoader
        toLoadComponent={Component}
        customLoader={props.loaderComponent || null}
        toPreLoadFn={props.preLoad}
        thruProps={props}
    />;

export default PlaceLoader;
