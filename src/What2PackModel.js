import resolvePromise from './resolvePromise';

const PLAN_EXAMPLE = {
    destination: "Paris", 
    startDate: "2023-03-28", 
    endDate: "2023-04-01"
}

class What2PackModel {
    constructor(plans = []) {
        this.plans = plans;
        this.currentPlan = null;
        this.observers = [];
        this.searchParams = {};
        this.searchResultsPromiseState = {};
        this.currentPlanPromiseState = {};
    }

    setCurrentPlan(plan) {
        const oldPlan = this.currentPlan;
        this.currentPlan = plan;
        if (plan !== oldPlan){
            this.notifyObservers({currentPlan: plan});
        }
    }

    addPlan(planToAdd) {
        if (!this.plans.some(e => e === planToAdd)){
            this.plans = [...this.plans, planToAdd];
            this.notifyObservers({planToAdd: planToAdd});
        }
    }

    removePlan(planToRemove) {
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

    notifyObservers(payload)
    {
        function invokeObserverCB(obs){
            try{
                obs(payload);
            }catch(err){
                console.log(err);
            }
        }
        this.observers.forEach(invokeObserverCB);
    }

    setSearchDestination(dest){
        this.searchParams.destination = dest;
    }

    setSearchDateRange(startDate, endDate){
        this.searchParams.startDate = startDate;
        this.searchParams.endDate = endDate;
    }

    doSearch(searchParams){
        if(destination in searchParams && dateRange in searchParams){
            // TODO: need API functions
            // resolvePromise
        }
    }
}

export default What2PackModel;