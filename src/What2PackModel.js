import resolvePromise from './resolvePromise';
import { getWeatherDetails } from './weatherSource';
import { suggestACB } from './utils';
import isEqual from 'lodash.isequal';

class What2PackModel{
    constructor(plans = []) {
        this.plans = plans;
        this.currentPlan = null;
        this.observers = [];
        this.searchParams = {};
        this.searchResultsPromiseState = {};
        this.currentPlanPromiseState = {};
    }

    setCurrentPlan(plan){
        if (this.currentPlan == null || !isEqual(plan, this.currentPlan)){
            this.currentPlan = plan;
            this.notifyObservers({currentPlan: plan});
        }
    }

    setItemPacked(itemToCheck, ifPacked){
        for (const item of this.currentPlan.items){
            if(isEqual(item, itemToCheck)){
                item.ifPacked = ifPacked;
                break;
            }
        }
    }

    addItemToCurrentItems(itemToAdd){
        for (const item of this.currentPlan.items){
            if(isEqual(item, itemToAdd)){
                return;
            }
        }
        this.currentPlan.items = [...this.currentPlan.items, itemToAdd];
        this.notifyObservers({itemToAdd: itemToAdd});
    }

    removeItemFromCurrentItems(itemToRemove){
        const oldItems = this.currentPlan.items;
        this.currentPlan.items = this.currentPlan.items.filter(it => it !== itemToRemove);
        if (this.currentPlan.items.length !== oldItems.length){
            this.notifyObservers({itemToRemove: itemToRemove});
        }
    }

    addPlan(planToAdd){
        for (const p of this.plans){
            if(isEqual(p, planToAdd)){
                return;
            }
        }
        this.plans = [...this.plans, planToAdd];
        this.notifyObservers({planToAdd: planToAdd});
    }

    removePlan(planToRemove){
        const oldPlans = this.plans;
        this.plans = this.plans.filter(p => p !== planToRemove);
        if (this.plans.length !== oldPlans.length){
            this.notifyObservers({planToRemove: planToRemove});
        }
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