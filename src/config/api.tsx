import axios from "axios";
import apiUrl from "../constant/apiConstant";

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'MyCustomHeader1': '1',
        'MyCustomHeader2': '2'
    }
});