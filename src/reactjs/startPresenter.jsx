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
        function updateCurrentPlanACB(){
            const plan = {
                index: props.model.plans.length,
                destination: destination, 
                startDate: startDate, 
                endDate: endDate, 
                items: props.model.searchResultsPromiseState.data.items,
                weathers: props.model.searchResultsPromiseState.data.weathers,
                holidays: props.model.searchResultsPromiseState.data.holidays,
                image: props.model.searchResultsPromiseState.data.image,
                news: props.model.searchResultsPromiseState.data.news.slice(0,3),
                ifDeleteConfirmOpen: false
            };
            for(const it of plan.items){
                it.ifDeleteConfirmOpen = false;
            }
            props.model.setCurrentPlan(plan);
            setCurrentPlanAdded(ifPlanAdded(plan, props.model.plans));
            console.log(props.model);
        }
        props.model.doSearch(props.model.searchParams);
        resolvePromise(props.model.searchResultsPromiseState.promise, promiseState);
        if(props.model.searchResultsPromiseState.promise){
            props.model.searchResultsPromiseState.promise.then(rerenderACB)
                                                         .then(updateCurrentPlanACB)
                                                         .catch(rerenderACB);
        }
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

    function mapsLoadedACB(){
        props.model.gmapsLoaded = true;
    }

    return <StartView   
            model={props.model} 
            currentPlan={props.model.currentPlan}
            gmapsLoaded = {props.model.gmapsLoaded}
            onMapsLoad={mapsLoadedACB}
            onSearchInput={handleSearchInputACB}
            onDestChanged={handleDestACB}
            onRangeChanged={handleRangeACB}
            onClickLogo={handleClickedLogoACB}/>;
}

export default StartPresenter;