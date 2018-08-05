
const getCurrentDateTime = () => {
    let today = new Date();
    //date
    let dd = today.getDate();
    let mm = today.getMonth()+1; 
    let yyyy = today.getFullYear();
    if(dd<10) 
        dd='0'+dd;
    if(mm<10) 
        mm='0'+mm;
    //time
    let hr = today.getHours();
    let min = today.getMinutes();
    if(hr<10) 
        hr='0'+hr;
    if(min<10) 
        min='0'+min;
    //final date
    let date = yyyy + '-' + mm + '-' + dd + ' ' + hr + ':' + min;

    return date;
}

const CommonStore = {
    getCurrentDateTime
};

export default CommonStore;