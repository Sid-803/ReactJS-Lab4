import axios from 'axios';
import IDisplayData from '../model/DisplayData';

const postData = (newpurchase:Omit<IDisplayData,'id'>) => {
    return axios.post<IDisplayData>(
        `http://localhost:3000/transact`,newpurchase
    )
    .then( response => response.data )
};

export {
    postData
};