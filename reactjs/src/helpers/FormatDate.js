import dateFormat from 'dateformat';

const getDate = prop => {
    if(prop !== undefined){
        var date = dateFormat(new Date(prop), "dd/mm/yyyy");
        return date;
    }
};

export default getDate;