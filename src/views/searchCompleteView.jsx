import usePlacesAutocomplete, { getLatLng, getGeocode } from "use-places-autocomplete";
import React, { useEffect, useRef } from "react";
import { Input, List } from 'antd';
import { GMAPS_BASE_URL, GMAPS_API_KEY } from "../apiConfig.jsx";

function SearchCompleteView(props){

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
        document.getElementById('googleMapsScript').onload = () => {props.onMapsLoad(); console.log('script loaded'); init()} 
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
    
    if (props.gmapsLoaded) {
        init();
    }
    
    // to do: getDetails, get country, and store country in model to use for holidays api

    function inputChangeACB(e){
        setValue(e.target.value);
        props.onChange(e);
    }

    function onLocationClickACB({description}) {
        return () => {
            setValue(description, false);
            clearSuggestions();
            getGeocode({ address: description }).then((results) => {
                const { lat, lng } = getLatLng(results[0]);
                props.onLocationClicked({description, 'latlng':{'latitude':lat, 'longitude':lng}});
            })    
        }
    }

    // const renderSuggestionsCB = function () {
    //     function suggestionListCB(suggestion) {
    //         const {
    //             place_id,
    //             structured_formatting: {main_text, secondary_text },
    //         } = suggestion;

    //         return (
    //             <li key={place_id} onClick={onLocationClickCB(suggestion)}>
    //                 <strong>{main_text}</strong> <small>{secondary_text}</small>
    //             </li>
    //         );
    //         }
    //     return data.map(suggestionListCB);
    // }

    // const listRenderCB = function(item) {
    //     console.log(item);
    //     const {
    //         place_id,
    //         structured_formatting: {main_text, secondary_text },
    //     } = item;
    //     console.log(main_text);

    //     return (<List.item>{main_text}</List.item>); 
    // }
    return (
        <div className="country-search">
            <Input
                placeholder="Destination"
                type="search"
                ng-model="$ctrl.pesquisa" 
                ng-disabled="'@ViewBag.EditaConteudo'"
                className="input-destination"
                defaultValue={props.defaultDest}
                value={value}
                onChange={inputChangeACB}
                // disabled={ready}
            />
            <div className="search-suggestions">
            {status === "OK" && <List
                bordered
                dataSource={data}
                renderItem={(item) => <List.Item onClick={onLocationClickACB(item)}><strong>{item.structured_formatting.main_text}</strong> <small>{item.structured_formatting.secondary_text}</small></List.Item>}
            />}
            </div>
        </div>
    )
}

export default SearchCompleteView;
