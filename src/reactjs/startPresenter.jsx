import usePlacesAutocomplete, { getLatLng, getGeocode } from "use-places-autocomplete";
import React, { useState, useEffect, useRef } from "react";
import useModelProp from './useModelProp.jsx';
import useRerender from "./useRerender.jsx";
import StartView from '../views/startView.jsx';
import resolvePromise from "../resolvePromise.js";
import { GMAPS_BASE_URL, GMAPS_API_KEY } from "../apiConfig.jsx";

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
            // console.log(props.model);
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
        // console.log(dest);
        props.model.setSearchDestination(dest);
        // console.log(props.model);
    }
    function handleRangeACB(startDate, endDate){
        props.model.setSearchDateRange(startDate, endDate);
        // console.log(props.model);
    }
    function handleClickedLogoACB(){
        props.model.setCurrentPlan(null);
        // console.log(props.model);
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
        // console.log(dest_raw)
        getGeocode({address: dest_raw.description}).then((results) => {
            const { lat, lng } = getLatLng(results[0]);
            handleDestACB({'destination':dest_raw.description, 'latlng':{'latitude':lat, 'longitude':lng}});
        }).catch((err) => console.log(err))
    }

    return <StartView   
            model={props.model} 
            currentPlan={props.model.currentPlan}
            gmapsLoaded = {props.model.gmapsLoaded}
            onLocationClick={handleLocationClickACB}
            locationSuggestions = {{'status':status,'data':data}}
            destValue = {value}
            setValue = {setValue}
            onSearchInput={handleSearchInputACB}
            onDestChanged={handleLocationClickACB}
            onRangeChanged={handleRangeACB}
            onClickLogo={handleClickedLogoACB}/>;
}

export default StartPresenter;