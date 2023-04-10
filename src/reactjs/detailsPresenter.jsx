import React, { useState } from 'react';
import useModelProp from './useModelProp.jsx';
import DetailsView from "../views/detailsView.jsx";

function DetailsPresenter(props){
    useModelProp(props.model, ["currentPlan", "currentItems", "plans"]);
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
        this.model.doSearch(this.model.searchParams);
        console.log(props.model);
    }
    function handleAddPlanACB(){
        props.model.addPlan(this.model.currentPlan);
        setCurrentPlanAdded(true);
        console.log(props.model);
    }
    function handleDeletePlanACB(){
        props.model.removePlan(this.model.currentPlan);
        setCurrentPlanAdded(false);
        console.log(props.model);
    }
    return <DetailsView 
            model={props.model} 
            plans={props.model.plans}
            currentPlan={props.model.currentPlan}
            currentItems={props.model.currentItems}
            currentPlanAdded={currentPlanAdded}
            onSearchInput={handleSearchInputACB}
            onDestChanged={handleDestACB}
            onRangeChanged={handleRangeACB}
            onAddPlan={handleAddPlanACB}
            onDeletePlan={handleDeletePlanACB}/>;
}

export default DetailsPresenter;