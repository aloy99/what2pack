import usePlacesAutocomplete, { getLatLng, getGeocode } from "use-places-autocomplete";
import React, { useState, useEffect } from 'react';
import useModelProp from './useModelProp.jsx';
import useRerender from "./useRerender.jsx";
import DetailsView from "../views/detailsView.jsx";
import SuggestionView from "../views/suggestionView.jsx";
import promiseNoData from "../views/promiseNoData.jsx";
import resolvePromise from '../resolvePromise.js';
import { GMAPS_BASE_URL, GMAPS_API_KEY } from "../apiConfig.jsx";

function DetailsPresenter(props){
    useModelProp(props.model, ["currentPlan", "plans", "searchParams", "searchResultsPromiseState", "gmapsLoaded","user"]);
    const rerenderACB = useRerender();
    useEffect(() =>{
        setDestMsg(props.model.currentPlan.destination);
        setDateMsg(props.model.currentPlan.startDate + " ~ " + props.model.currentPlan.endDate);
        setCurrentPlanAdded(ifPlanAdded(props.model.currentPlan, props.model.plans));
        rerenderACB();
    },[props.model.currentPlan]);
    console.log(props.model.currentPlan)
    const [destMsg, setDestMsg] = useState(props.model.currentPlan?props.model.currentPlan.destination:props.model.searchParams.destination);
    const [dateMsg, setDateMsg] = useState(props.model.currentPlan?props.model.currentPlan.startDate + " ~ " + props.model.currentPlan.endDate:props.model.searchParams.startDate + " ~ " + props.model.searchParams.endDate);
    const [promiseState,] = useState({});
    const [currentPlanAdded, setCurrentPlanAdded] = useState(false);
    function ifPlanAdded(planToAdd, plans){
        if(planToAdd){
            for (const p of plans){
                if(p.destination === planToAdd.destination
                && p.startDate === planToAdd.startDate
                && p.endDate === planToAdd.endDate){
                    return true;
                }
            }
        }
        return false;
    }
    function handleDestACB(dest){
        // console.log(dest)
        props.model.setSearchDestination(dest);
        // console.log(props.model);
    }
    function handleRangeACB(startDate, endDate){
        props.model.setSearchDateRange(startDate, endDate);
        // console.log(props.model);
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
            // console.log(props.model);
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
                if(p.destination === destination
                    && p.startDate === startDate
                    && p.endDate === endDate){
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
        // console.log(props.model);
    }
    function handleDeletePlanACB(){
        props.model.removePlan(props.model.currentPlan);
        setCurrentPlanAdded(false);
        // console.log(props.model);
    } 
    function handleClickedLogoACB(){
        props.model.setCurrentPlan(null);
        // console.log(props.model);
    }
    function handleItemPackedACB(itemName, ifPacked){
        const itemToPack = props.model.currentPlan.items.find(item => item.name === itemName);
        props.model.setItemPacked(itemToPack, ifPacked);
        // console.log(props.model);
    }
    function handleAllItemsPackedACB(ifCheckAll){
        for(const item of props.model.currentPlan.items){
            props.model.setItemPacked(item, ifCheckAll);
        }
        // console.log(props.model);
    }
    function handleDeleteItemACB(item){
        props.model.removeItemFromCurrentItems(item);
        rerenderACB();
        // console.log(props.model);
    }
    function handleAddItemACB(item){
        props.model.addItemToCurrentItems(item);
        rerenderACB();
        // console.log(props.model);
    }
    function handleAmountChangeACB(item, newAmount){
        props.model.setItemAmount(item, newAmount);
        // console.log(props.model);
    }
    function handleRemarkChangeACB(item, newRemark){
        props.model.setItemRemark(item, newRemark);
        // console.log(props.model);
    }
    function handleUndoDeleteItemACB(item){
        handleAddItemACB(item);
    }

    useEffect(() => {
        scriptLoader();
        return () => {
        };
    })

    const scriptLoader = () => {
        const url = GMAPS_BASE_URL + GMAPS_API_KEY + "&libraries=places&callback=initMap"
        // if (!document.getElementById('googleMapsScript').src) {
        //     document.getElementById('googleMapsScript').src = url;
        // }
        window.initMap = () => {};
        document.getElementById('googleMapsScript').src = url;
        document.getElementById('googleMapsScript').onload = () => {props.model.gmapsLoaded = true; console.log('script loaded'); init()} 
    }

    const {
        init,
        ready,
        value,
        suggestions: {status, data},
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        initOnMount: false,
        requestOptions: {
            types: ['(cities)']
        },
        debounce: 500,
    });
    
    if (props.model.gmapsLoaded) {
        init();
    }

    function handleLocationClickACB(dest_raw) {
        clearSuggestions();
        getGeocode({address: dest_raw.description}).then((results) => {
            const { lat, lng } = getLatLng(results[0]);
            handleDestACB({'destination':dest_raw.description, 'latlng':{'latitude':lat, 'longitude':lng}});
        }).catch((err) => console.log(err))
    }

    return (
        <>
            <DetailsView 
                plans={props.model.plans}
                currentPlan={props.model.currentPlan}
                onLocationClick={handleLocationClickACB}
                locationSuggestions = {{'status':status,'data':data}}
                destValue={value}
                setValue = {setValue}
                onSearchInput={handleSearchInputACB}
                onDestChanged={handleDestACB}
                onRangeChanged={handleRangeACB}
                onClickLogo={handleClickedLogoACB}
                currentPlanAdded={currentPlanAdded}
            />
            {   
                promiseNoData(props.model.searchResultsPromiseState) ||
                <SuggestionView
                //between view
                    user={props.model.user}
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