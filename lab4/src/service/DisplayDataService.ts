import axios from 'axios';
import IDisplayData from '../model/DisplayData';

const getDisplayData=()=>{
    return axios.get<IDisplayData[]>('http://localhost:3000/transact')
    .then(response => response.data)
};

export {
    getDisplayData
}
