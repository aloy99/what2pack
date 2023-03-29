import React from "react";
import DetailsView from "../views/detailsView";

function DetailsPresenter(props){
    function handleSearchInput(destination, startDate, endDate){
        console.log(destination, startDate, endDate);
    }
    return <DetailsView id="details" model={props.model} onSearchInput={handleSearchInput}/>;
}

export default DetailsPresenter;