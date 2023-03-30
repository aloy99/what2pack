import React from "react";
import DetailsView from "../views/detailsView";

function DetailsPresenter(props){
    function handleSearchInput(destination, startDate, endDate){
        const plan = {destination: destination, startDate: startDate, endDate: endDate};
        props.model.setCurrentPlan(plan);
        props.model.addPlan(plan);
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
            onSearchInput={handleSearchInput}
            onDestChanged={handleDestACB}
            onRangeChanged={handleRangeACB}/>;
}

export default DetailsPresenter;