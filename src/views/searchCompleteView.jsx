import usePlacesAutocomplete from "use-places-autocomplete";
import React from "react";
import { Input, List } from 'antd'
import { GMAPS_BASE_URL, GMAPS_API_KEY   } from "../apiConfig.jsx";

function SearchCompleteView(props){
    const {
        ready,
        value,
        suggestions: {status, data},
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            types: ['(cities)']
        },
        debounce: 500,
    });

    function inputChangeCB(e){
        setValue(e.target.value);
        props.onChange(e);
    }

    function onLocationClickCB({description}) {
        return () => {
        setValue(description, false);
        clearSuggestions();
        }
    }

    const renderSuggestionsCB = function () {
        function suggestionListCB(suggestion) {
            const {
                place_id,
                structured_formatting: {main_text, secondary_text },
            } = suggestion;

            return (
                <li key={place_id} onClick={onLocationClickCB(suggestion)}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
            }
        return data.map(suggestionListCB)
    }

    const listRenderCB = function(item) {
        console.log(item)
        const {
            place_id,
            structured_formatting: {main_text, secondary_text },
        } = item;
        console.log(main_text)

        return (<List.item>{main_text}</List.item>)
        
    }
    
    return (
        <div className="country-search">
            <Input
                placeholder="Destination"
                className="input-destination"
                value={value}
                onChange={inputChangeCB}
                disabled={!ready}
            />
            <div className="search-suggestions">
            {status === "OK" && <List
                bordered
                dataSource={data}
                renderItem={(item) => <List.Item onClick={onLocationClickCB(item)}><strong>{item.structured_formatting.main_text}</strong> <small>{item.structured_formatting.secondary_text}</small></List.Item>}
            />}
            </div>
        </div>
    )
}

export default SearchCompleteView;
