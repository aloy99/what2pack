import React from "react";
import DetailsView from "../views/detailsView";

function DetailsPresenter(props){
    function handleSearchInput(destination, startDate, endDate){
        console.log(destination, startDate, endDate);
    }
    return (
    <div>
        details
        <DetailsView id="details" model={props.model} onSearchInput={handleSearchInput}/>
    </div>);
}

export default DetailsPresenter;