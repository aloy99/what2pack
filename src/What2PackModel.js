import resolvePromise from './resolvePromise';
import { getWeatherDetails } from './weatherSource';
import { suggestACB } from './utils';

class What2PackModel{
    constructor(plans = []) {
        this.plans = plans;
        this.currentPlan = null;
        this.currentItems = [];
        this.observers = [];
        this.searchParams = {};
        this.searchResultsPromiseState = {};
        this.currentPlanPromiseState = {};
    }

    setCurrentPlan(plan){
        if (this.currentPlan == null
            || plan.destination !== this.currentPlan.destination 
            || plan.startDate !== this.currentPlan.startDate
            || plan.endDate !== this.currentPlan.endDate){
            this.currentPlan = plan;
            this.notifyObservers({currentPlan: plan});
        }
    }

    setCurrentItems(items){
        const oldItems = this.currentItems;
        this.currentItems = items;
        if (this.currentItems !== oldItems){
            this.notifyObservers({currentItems: items});
        }
    }

    addPlan(planToAdd){
        for (const p of this.plans){
            if(p.destination === planToAdd.destination 
                && p.startDate === planToAdd.startDate 
                && p.endDate === planToAdd.endDate){
                    return;
                }
        }
        this.plans = [...this.plans, planToAdd];
        this.notifyObservers({planToAdd: planToAdd});
    }

    removePlan(planToRemove){
        const oldPlans = this.plans;
        this.plans = this.plans.filter(p => p !== planToRemove);
        if (this.plans.length !== oldPlans.length)
            this.notifyObservers({planToRemove: planToRemove});
    }
    
    addObserver(callback){
        this.observers.push(callback);
    }

    removeObserver(callback){
        function checkCallbackCB(param){
            return param !== callback;
        }
        this.observers = this.observers.filter(checkCallbackCB);
    }

    notifyObservers(payload){
        console.log(payload);
        function invokeObserverCB(obs){
            try{
                obs(payload);
            }catch(err){
                console.log(err);
            }
        }
        this.observers.forEach(invokeObserverCB);
    }

    setSearchDestination(info){
        this.searchParams.destination = info.description;
        this.searchParams.latlng = info.latlng;
    }

    setSearchDateRange(startDate, endDate){
        this.searchParams.startDate = startDate;
        this.searchParams.endDate = endDate;
    }

    doSearch(searchParams){
        if('latlng' in searchParams && 'startDate' in searchParams && 'endDate' in searchParams){
            resolvePromise(getWeatherDetails(searchParams).then(suggestACB), this.searchResultsPromiseState);
        }
    }
}

export default What2PackModel;