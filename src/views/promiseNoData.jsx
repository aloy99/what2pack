export default
function promiseNoData(PromiseState){
    if(PromiseState === {}){
        return false;
    }
    if(!PromiseState.promise){ //1
        return <div>No data</div>;
    }
    if(PromiseState.data){ //4
        return false;
    }
    if(!PromiseState.error){ //2
        return <img src="\Spinner.gif" className="mainContent"/>;
    }
    return <div className="mainContent">{PromiseState.error.toString()}</div>;// 3
}