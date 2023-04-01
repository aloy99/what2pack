import React, { useState, useEffect } from 'react';
import useModelProp from './useModelProp.jsx';
import useRerender from './useRerender.jsx';
import DetailsView from "../views/detailsView.jsx";

function DetailsPresenter(props){
    const rerenderACB = useRerender();
    const currentDestination = useModelProp(props.model, "searchParams");
    console.log(currentDestination)
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
            onSearchInput={handleSearchInputACB}
            onDestChanged={handleDestACB}
            onRangeChanged={handleRangeACB}/>;
}

export default DetailsPresenter;