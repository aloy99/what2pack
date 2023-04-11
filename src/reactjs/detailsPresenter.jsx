import React, { useState } from 'react';
import useModelProp from './useModelProp.jsx';
import useRerender from "./useRerender.jsx";
import DetailsView from "../views/detailsView.jsx";
import SuggestionView from "../views/suggestionView.jsx";
import promiseNoData from "../views/promiseNoData.jsx";

function DetailsPresenter(props){
    const [promiseState,] = useState({});
    useModelProp(props.model, ["currentPlan", "currentItems", "plans", "searchParams"]);
    const rerenderACB = useRerender();
    const [currentPlanAdded, setCurrentPlanAdded] = useState(false);
    function ifPlanAdded(planToAdd, plans){
        for (const p of plans){
            if(p.destination === planToAdd.destination 
                && p.startDate === planToAdd.startDate 
                && p.endDate === planToAdd.endDate){
                    return true;
                }
            }
        return false;
    }
    function handleDestACB(dest){
        props.model.setSearchDestination(dest);
        console.log(props.model);
    }
    function handleRangeACB(startDate, endDate){
        props.model.setSearchDateRange(startDate, endDate);
        console.log(props.model);
    }
    function handleSearchInputACB(destination, startDate, endDate){
        console.log(destination);
        const plan = {destination: destination, startDate: startDate, endDate: endDate};
        props.model.setCurrentPlan(plan);
        setCurrentPlanAdded(ifPlanAdded(plan, props.model.plans));
        props.model.doSearch(props.model.searchParams);
        resolvePromise(props.model.searchResultsPromiseState.promise, promiseState);
        if(props.model.searchResultsPromiseState.promise){
            props.model.searchResultsPromiseState.promise.then(rerenderACB).catch(rerenderACB);
            rerenderACB();
        }
        console.log(props.model);
    }
    function handleAddPlanACB(){
        props.model.addPlan(props.model.currentPlan);
        setCurrentPlanAdded(true);
        console.log(props.model);
    }
    function handleDeletePlanACB(){
        props.model.removePlan(props.model.currentPlan);
        setCurrentPlanAdded(false);
        console.log(props.model);
    }
    function handleClickedLogoACB(){
        props.model.setCurrentPlan(null);
        console.log(props.model);
    }
    return (
        <>
            <DetailsView 
                plans={props.model.plans}
                currentPlan={props.model.currentPlan}
                onSearchInput={handleSearchInputACB}
                onDestChanged={handleDestACB}
                onRangeChanged={handleRangeACB}
                onClickLogo={handleClickedLogoACB}/>
            {   promiseNoData(props.model.searchResultsPromiseState) ||
                <SuggestionView
                    currentItems={props.model.searchResultsPromiseState.data}
                    currentPlanAdded={currentPlanAdded}
                    onAddPlan={handleAddPlanACB}
                    onDeletePlan={handleDeletePlanACB}/>}
        </>);
}

export default DetailsPresenter;