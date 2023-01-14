const timestampToDateString = (timestamp)=>{
    let date = new Date(timestamp);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const timestampToDateTimeString = (timestamp)=>{
    console.log(typeof timestamp)
    let date = new Date(timestamp);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    let hours = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");
    let seconds = date.getSeconds().toString().padStart(2, "0");
    console.log(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

module.exports = {
    timestampToDateString: timestampToDateString,
    timestampToDateTimeString: timestampToDateTimeString,
};