import React from "react";
import StartView from '../views/startView.jsx';

function StartPresenter(props){
    function handleSearchInputACB(destination, startDate, endDate){
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
    return <StartView   
            model={props.model} 
            onSearchInput={handleSearchInputACB}
            onDestChanged={handleDestACB}
            onRangeChanged={handleRangeACB}/>;
}

export default StartPresenter;