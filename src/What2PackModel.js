class What2PackModel {
    constructor() {
        this.plans = [];
        this.currentPlan = null;
        this.observers = [];
    }

    setCurrentPlan(destination, startDate, endDate) {
        this.currentPlan = {"destination": destination, "startDate": startDate, "endDate": endDate};
    }

    addPlan(destination, startDate, endDate) {
        const planToAdd = {"destination": destination, "startDate": startDate, "endDate": endDate};
        if (!this.plans.some(e => e === planToAdd)){
            this.plans = [...this.plans, plan];
            this.notifyObservers({"planToAdd": planToAdd});
        }
    }

    removePlan(destination, startDate, endDate) {
        const planToRemove = {"destination": destination, "startDate": startDate, "endDate": endDate};
        const oldPlans = this.plans;
        this.plans = this.plans.filter(p => p !== planToRemove);
        if (this.plans.length !== oldPlans.length)
            this.notifyObservers();
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
}

export default What2PackModel;