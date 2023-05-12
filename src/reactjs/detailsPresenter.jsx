import React, { useState, useEffect } from 'react';
import useModelProp from './useModelProp.jsx';
import useRerender from "./useRerender.jsx";
import DetailsView from "../views/detailsView.jsx";
import SuggestionView from "../views/suggestionView.jsx";
import promiseNoData from "../views/promiseNoData.jsx";
import resolvePromise from '../resolvePromise.js';
// import { addTrip } from '../firestoreModel.js';
import {useAuth} from "../reactjs/firebase-auth-hook.jsx";

function DetailsPresenter(props){
    useModelProp(props.model, ["currentPlan", "plans", "searchParams", "searchResultsPromiseState", "gmapsLoaded"]);
    const rerenderACB = useRerender();
    const currentUser = useAuth();
    useEffect(() =>{
        setCurrentPlanAdded(ifPlanAdded(props.model.currentPlan, props.model.plans));
        rerenderACB();
    },[window.location.href]);
    const [destMsg, setDestMsg] = useState(props.model.searchParams.destination);
    const [dateMsg, setDateMsg] = useState(props.model.searchParams.startDate + " ~ " + props.model.searchParams.endDate);
    const [promiseState,] = useState({});
    const [currentPlanAdded, setCurrentPlanAdded] = useState(false);
    function ifPlanAdded(planToAdd, plans){
        if(planToAdd){
        for (const p of plans){
                if(p.destination == planToAdd.destination
                && p.startDate == planToAdd.startDate
                && p.endDate == planToAdd.endDate){
                    return true;
                }
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
            setCurrentPlanAdded(ifPlanAdded(props.model.currentPlan, props.model.plans));
            console.log(props.model);
        }
        setDestMsg(destination);
        setDateMsg(startDate + ' ~ ' + endDate);
        rerenderACB();
        const tmp = {
            destination: destination, 
            startDate: startDate, 
            endDate: endDate
        };
        const ifPlanExists = ifPlanAdded(tmp, props.model.plans);
        if(!ifPlanExists){ // if the searched plan is not in my plans
            props.model.doSearch(props.model.searchParams);
            resolvePromise(props.model.searchResultsPromiseState.promise, promiseState);
            if(props.model.searchResultsPromiseState.promise){
                props.model.searchResultsPromiseState.promise.then(rerenderACB)
                                                            .then(updateCurrentPlanACB)
                                                            .catch(rerenderACB);
            }
        }
        else{ // if the searched plan is already in my plans
            let currentPlan = {};
            for(const p of props.model.plans){
                if(p.destination == destination
                    && p.startDate == startDate
                    && p.endDate == endDate){
                        currentPlan = p;
                        break;
                    }
            }
            props.model.setCurrentPlan(currentPlan);            
            for(const it of currentPlan.items){
                it.ifDeleteConfirmOpen = false;
            }
            setCurrentPlanAdded(ifPlanAdded(props.model.currentPlan, props.model.plans));
            rerenderACB();
        }
    }
    function handleAddPlanACB(){
        // handleSubmit();
        props.model.addPlan(props.model.currentPlan);
        setCurrentPlanAdded(true);
        console.log(props.model);
    }
    //add data to database
    // const handleSubmit = async () => {
    //     try {
    //     await addTrip(currentUser?.uid, props.model.currentPlan.destination, props.model.currentPlan.startDate, props.model.currentPlan.endDate, props.model.currentPlan.items);
    //     } catch (error) {
    //     }
    //   };
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
    function handleUndoDeleteItemACB(item){
        handleAddItemACB(item);
    }
    return (
        <>
            <DetailsView 
                plans={props.model.plans}
                currentPlan={props.model.currentPlan}
                gmapsLoaded = {props.model.gmapsLoaded}
                onMapsLoad={mapsLoadedACB}
                onSearchInput={handleSearchInputACB}
                onDestChanged={handleDestACB}
                onRangeChanged={handleRangeACB}
                onClickLogo={handleClickedLogoACB}
                currentPlanAdded={currentPlanAdded}
            />
            {   
                promiseNoData(props.model.searchResultsPromiseState) ||
                <SuggestionView
                    currentPlanAdded={currentPlanAdded}
                    currentPlan={props.model.currentPlan}
                    onAddPlan={handleAddPlanACB}
                    onDeletePlan={handleDeletePlanACB}
                    onItemChecked={handleItemPackedACB}
                    onAllItemsChecked={handleAllItemsPackedACB}
                    onDeleteItem={handleDeleteItemACB}
                    onAddItem={handleAddItemACB}
                    onAmountChange={handleAmountChangeACB}
                    onRemarkChange={handleRemarkChangeACB}
                    destMsg={destMsg}
                    dateMsg={dateMsg}
                    onUndoDeleteItem={handleUndoDeleteItemACB}
                />
            }
        </>
    );
}

export default DetailsPresenter;