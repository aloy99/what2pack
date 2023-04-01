import React from 'react';
import useModelProp from './useModelProp.jsx';
import DetailsView from "../views/detailsView.jsx";

function DetailsPresenter(props){
    useModelProp(props.model, ["currentPlan", "currentItems"]);
    function handleSearchInputACB(destination, startDate, endDate){
        const plan = {destination: destination, startDate: startDate, endDate: endDate};
        props.model.setCurrentPlan(plan);
        props.model.addPlan(plan);
        this.model.doSearch(this.model.searchParams);
        console.log(props.model);
    }
    function handleDestACB(dest){
        props.model.setSearchDestination(dest);
        console.log(props.model);
    }
    function handleRangeACB(startDate, endDate){
        props.model.setSearchDateRange(startDate, endDate);
        console.log(props.model);
    }
    return <DetailsView 
            model={props.model} 
            currentPlan={props.model.currentPlan}
            currentItems={props.model.currentItems}
            onSearchInput={handleSearchInputACB}
            onDestChanged={handleDestACB}
            onRangeChanged={handleRangeACB}/>;
}

export default DetailsPresenter;