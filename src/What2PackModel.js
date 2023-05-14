import resolvePromise from './resolvePromise';
import { getWeatherDetails } from './api/weatherSource';
import { getHolidayDetails } from './api/holidaySource';
import { getNewsDetails } from './api/newsSource';
import { getUnsplashImages } from './api/unsplashSource';
import { suggestACB, isPlanEqual } from './utils';

class What2PackModel{
    constructor(plans = []) {
        this.plans = plans;
        this.currentPlan = null;
        this.observers = [];
        this.searchParams = {};
        this.searchResultsPromiseState = {};
        this.currentPlanPromiseState = {};
        this.gmapsLoaded = false;
        this.user = null;
    }

    setCurrentPlan(plan){
        if (!this.currentPlan || !isPlanEqual(plan, this.currentPlan)){
            this.currentPlan = plan;
            this.notifyObservers({currentPlan: plan});
        }
    }

    setItemAmount(item, newAmount){
        for (const it of this.currentPlan.items){
            if(it.name === item.name){
                it.amount = newAmount;
                this.notifyObservers({item: it});
                break;
            }
        }
    }

    setItemRemark(item, newRemark){
        for (const it of this.currentPlan.items){
            if(it.name === item.name){
                it.remark = newRemark;
                this.notifyObservers({item: it});
                break;
            }
        }
    }

    setItemPacked(itemToCheck, ifPacked){
        for (const it of this.currentPlan.items){
            if(it.name === itemToCheck.name){
                it.ifPacked = ifPacked;
                this.notifyObservers({item: it});
                break;
            }
        }
    }

    addItemToCurrentItems(itemToAdd){
        function compareItemsCB(a,b){
            return a.index - b.index;
        }
        for (const item of this.currentPlan.items){
            if(item.name === itemToAdd.name){
                return;
            }
        }
        this.currentPlan.items = [...this.currentPlan.items, itemToAdd].sort(compareItemsCB);
        this.notifyObservers({itemToAdd: itemToAdd});
    }

    removeItemFromCurrentItems(itemToRemove){
        // console.log(this.currentPlan.items)
        const oldItems = this.currentPlan.items;
        this.currentPlan.items = this.currentPlan.items.filter(it => it.name !== itemToRemove.name);
        // console.log(this.currentPlan.items)
        if (this.currentPlan.items.length !== oldItems.length){
            this.notifyObservers({itemToRemove: itemToRemove});
        }
    }

    addPlan(planToAdd){
        function compareItemsCB(a,b){
            return a.index - b.index;
        }
        for (const p of this.plans){
            if(isPlanEqual(p, planToAdd)){
                return;
            }
        }
        this.plans = [...this.plans, planToAdd].sort(compareItemsCB);
        this.notifyObservers({planToAdd: planToAdd});
    }

    removePlan(planToRemove){
        // console.log("model remove plan", planToRemove)
        const oldPlans = this.plans;
        this.plans = this.plans.filter(p => !isPlanEqual(p, planToRemove));
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
        // console.log(payload);
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
        this.searchParams.destination = info.destination;
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
        }
    }

    // doMiniSearch(){
    //     getGeocode({address: dest_raw.description}).then((results) => {
    //         const { lat, lng } = getLatLng(results[0]);
    //         handleDestACB({'destination':dest_raw.description, 'latlng':{'latitude':lat, 'longitude':lng}});
    //     }).catch((err) => console.log(err))
    //     const searchParams = {
    //         latlng:getLatLng(),
    //         startDate: this.currentPlan.startDate,
    //         endDate: this.currentPlan.endDate
    //     };
    //     resolvePromise(Promise.all([
    //         getWeatherDetails(searchParams),
    //         getNewsDetails(searchParams)
    //     ]).then(suggestMiniACB), this.searchResultsPromiseState);
    // }
}

export default What2PackModel;