import React, { useState, useEffect } from 'react';
import useModelProp from './useModelProp.jsx';
import useRerender from "./useRerender.jsx";
import DetailsView from "../views/detailsView.jsx";
import SuggestionView from "../views/suggestionView.jsx";
import promiseNoData from "../views/promiseNoData.jsx";
import resolvePromise from '../resolvePromise.js';

function DetailsPresenter(props){
    useEffect(() =>{
        setCurrentPlanAdded(ifPlanAdded(props.model.currentPlan, props.model.plans));
        console.log("current plan added: " + currentPlanAdded);
    },[window.location.href]);
    const plan = props.model.searchParams;
    const [msg, setMsg] = useState(plan.destination+', '+plan.startDate+','+plan.endDate);
    const [promiseState,] = useState({});
    useModelProp(props.model, ["currentPlan", "plans", "searchParams"]);
    const rerenderACB = useRerender();
    const [currentPlanAdded, setCurrentPlanAdded] = useState(false);
    function ifPlanAdded(planToAdd, plans){
        for (const p of plans){
            if(p.destination == planToAdd.destination
                && p.startDate == planToAdd.startDate
                && p.endDate == planToAdd.endDate){
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
        function updateCurrentPlanACB(){
            const plan = {
                destination: destination, 
                startDate: startDate, 
                endDate: endDate, 
                items: props.model.searchResultsPromiseState.data.items,                
                weathers: props.model.searchResultsPromiseState.data.weathers,
                holidays: props.model.searchResultsPromiseState.data.holidays
            };
            for(const it of plan.items){
                it.ifDeleteConfirmOpen = false;
            }
            props.model.setCurrentPlan(plan);
            setMsg(plan.destination+', '+plan.startDate+','+plan.endDate);
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
    function handleItemPackedACB(itemName, ifPacked){
        const itemToPack = props.model.currentPlan.items.find(item => item.name === itemName);
        props.model.setItemPacked(itemToPack, ifPacked);
        console.log(props.model);
    }
    function handleAllItemsPackedACB(ifCheckAll){
        for(const item of props.model.currentPlan.items){
            props.model.setItemPacked(item, ifCheckAll);
        }
        console.log(props.model);
    }
    function handleDeleteItemACB(item){
        props.model.removeItemFromCurrentItems(item);
        rerenderACB();
        console.log(props.model);
    }
    function handleAddItemACB(item){
        props.model.addItemToCurrentItems(item);
        rerenderACB();
        console.log(props.model);
    }
    function mapsLoadedACB(){
        props.model.gmapsLoaded = true;
    }
    function handleAmountChangeACB(item, newAmount){
        props.model.setItemAmount(item, newAmount);
        console.log(props.model);
    }
    function handleRemarkChangeACB(item, newRemark){
        props.model.setItemRemark(item, newRemark);
        console.log(props.model);
    }
    return (
        <>
            <DetailsView 
                plans={props.model.plans}
                currentPlan={props.model.currentPlan}
                gmapsLoaded = {props.model.gmapsLoaded}
                onAddPlan={handleAddPlanACB}
                onDeletePlan={handleDeletePlanACB}
                onMapsLoad={mapsLoadedACB}
                onSearchInput={handleSearchInputACB}
                onDestChanged={handleDestACB}
                onRangeChanged={handleRangeACB}
                onClickLogo={handleClickedLogoACB}
                currentPlanAdded={currentPlanAdded}
                planMsg={msg}/>
            {   promiseNoData(props.model.searchResultsPromiseState) ||
                <SuggestionView
                    currentPlanAdded={currentPlanAdded}
                    currentPlan={props.model.currentPlan}
                    onItemChecked={handleItemPackedACB}
                    onAllItemsChecked={handleAllItemsPackedACB}
                    onDeleteItem={handleDeleteItemACB}
                    onAddItem={handleAddItemACB}
                    onAmountChange={handleAmountChangeACB}
                    onRemarkChange={handleRemarkChangeACB}
                />
            }
        </>);
}

export default DetailsPresenter;