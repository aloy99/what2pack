import resolvePromise from './resolvePromise';
import { getWeatherDetails } from './weatherSource';
import { getHolidayDetails } from './holidaySource';
import { getNewsDetails } from './newsSource';
import { suggestACB } from './utils';
import isEqual from 'lodash.isequal';
import { getUnsplashImages } from './unsplashSource';

class What2PackModel{
    constructor(plans = []) {
        this.plans = plans;
        this.currentPlan = null;
        this.observers = [];
        this.searchParams = {};
        this.searchResultsPromiseState = {};
        this.currentPlanPromiseState = {};
        this.gmapsLoaded = false;
    }

    setCurrentPlan(plan){
        if (this.currentPlan == null || !isEqual(plan, this.currentPlan)){
            this.currentPlan = plan;
            this.notifyObservers({currentPlan: plan});
        }
    }

    setItemAmount(item, newAmount){
        for (const it of this.currentPlan.items){
            if(it.name === item.name){
                it.amount = newAmount;
                break;
            }
        }
    }

    setItemRemark(item, newRemark){
        for (const it of this.currentPlan.items){
            if(it.name === item.name){
                it.remark = newRemark;
                break;
            }
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

            resolvePromise(Promise.all([
                getWeatherDetails(searchParams),
                getHolidayDetails(searchParams),
                getNewsDetails(searchParams),
                getUnsplashImages(searchParams)
            ]).then(suggestACB), this.searchResultsPromiseState);
            console.log(this.searchResultsPromiseState)
        }
    }
}

export default What2PackModel;