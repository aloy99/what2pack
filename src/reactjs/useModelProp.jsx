import React from 'react';

function useModelProp(model, props){
    function lifeACB() {
        model.addObserver(observerACB);
        return function ripACB() {
            model.removeObserver(observerACB);
        };
    }
    React.useEffect(lifeACB, []);

    const setters = {};
    const values = {};
    for (let prop of props) {
        [values[prop], setters[prop]] = React.useState(model[prop]);
    }
    function observerACB() {
        for (let prop in setters) {
            setters[prop](model[prop]);
        }
    }
    return values;
}

export default useModelProp;
