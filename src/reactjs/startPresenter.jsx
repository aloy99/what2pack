import React, { useState } from "react";
import useModelProp from './useModelProp.jsx';
import useRerender from "./useRerender.jsx";
import StartView from '../views/startView.jsx';
import resolvePromise from "../resolvePromise.js";

function StartPresenter(props){
    const [promiseState,] = useState({});
    useModelProp(props.model, ["currentPlan","searchParams"]);
    const rerenderACB = useRerender();
    function handleSearchInputACB(destination, startDate, endDate){
        const plan = {destination: destination, startDate: startDate, endDate: endDate};
        props.model.setCurrentPlan(plan);
        props.model.doSearch(props.model.searchParams);
        resolvePromise(props.model.searchResultsPromiseState.promise, promiseState);
        if(props.model.searchResultsPromiseState.promise){
            props.model.searchResultsPromiseState.promise.then(rerenderACB).catch(rerenderACB);
            rerenderACB();
        }
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
    function handleClickedLogoACB(){
        props.model.setCurrentPlan(null);
        console.log(props.model);
    }
    return <StartView   
            model={props.model} 
            currentPlan={props.model.currentPlan}
            onSearchInput={handleSearchInputACB}
            onDestChanged={handleDestACB}
            onRangeChanged={handleRangeACB}
            onClickLogo={handleClickedLogoACB}/>;
}

export default StartPresenter;