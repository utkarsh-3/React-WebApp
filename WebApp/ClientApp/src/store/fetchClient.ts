import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from "axios";

/*interface Payload {
    firstName: string;
    lastName: string;
    Email: string; 
}

type YourResponseType = any; 

const callApi = async ({
    firstName,
    lastName,
    Email
}: Payload): Promise<AxiosResponse<YourResponseType>> => {
    return await axios.get<YourResponseType>(
        "https://localhost:44325/api/Clients/" +
        firstName +
        "/" +
        lastName +
        "/" +
        Email 
    );
};
*/

const initialState = {
    loading: true,
    Client: {},
    error: "",
    valid:false
}

const Fetch_client_Request = "Fetch_Client_Request"
const Fetch_client_Success = "Fetch_client_Success"
const Fetch_client_Failure = "Fetch_client_Failure"
const Update_client_Request = "Update_Client_Request"
const Update_client_Success = "Update_client_Success"
const Update_client_Failure = "Update_client_Failure"
const Validate_client_Request = "Validate_client_Request"
const Validate_client_Success = "Validate_client_Success"
const Validate_client_Failure = "Validate_client_Failure"


const fetchClientRequest = () => {
   
    return {
        type: Fetch_client_Request
      
    };
};

const fetchClientSuccess = client => {

    return {
        type: Fetch_client_Success,
        payload: client
    }
}
const fetchClientfailure = error => {
    return {
        type: Fetch_client_Failure,
        payload: error
    }
}
const updateClientRequest = () => {

    return {
        type:Update_client_Request

    };
};

const updateClientSuccess = updatedclient => {

    return {
        type: Update_client_Success,
        payload: updatedclient
    }
}
const updateClientfailure = error => {
    return {
        type: Update_client_Failure,
        payload: error
    }
}
const validateClientRequest = () => {

    return {
        type: Validate_client_Request

    };
};

const validateClientSuccess = (data) => {
    if (data === 204)
        return {
            type: Validate_client_Success,
            payload: data
        }
    else {
        return {
            type: Validate_client_Failure,
            payload: data
        }
    }
}
const validateClientfailure = error => {
    return {
        type: Validate_client_Failure,
        payload: error
    }
}


export const getClient=()=> {
    return {
        type:'Get Client'
    }
}

export const updateClient = (updatedclient) => {
    return {
        type: 'Update Client',
        payload: updatedclient
    }
}


export function* watchGetClient() {
    yield takeEvery('Get Client', GetClient);
    yield takeEvery('Update Client', UpdateClient);
    yield takeEvery('Validate Client', ValidateClient);
}

export function* GetClient() {
    try {
        yield put(fetchClientRequest());
        const data = yield call(() => {
            return axios.get('https://localhost:44325/api/Clients/111')}
        );
        yield put(fetchClientSuccess(data));
    } catch (error) {
        yield put(fetchClientfailure(error));
    }
}

export function* UpdateClient(action) {
    try {
        yield put(updateClientRequest());
        console.log(action.payload)
        const data = yield call(() => {
            return axios.put('https://localhost:44325/api/Clients/111', action.payload)
        }
        );
        yield put(updateClientSuccess(action.payload));
    } catch (error) {
        yield put(updateClientfailure(error));
    }
}
/*
export function* ValidateClient(action) {
    try {
       
        yield put(validateClientRequest());
        console.log("2");
        const data = yield call(callApi, action.payload);
        console.log(data);
        console.log("3");
        yield put(validateClientSuccess(data.status));
        console.log("4");
      
    } catch (error) {
        yield put(validateClientfailure(error));
    }
        
    
}
*/

export function* ValidateClient(action) {
    try {
        console.log(action);
        yield put(validateClientRequest());
        const data = yield call(() => {
            return axios.get('https://localhost:44325/api/Clients/' + action.payload.firstName + "/" + action.payload.lastName + "/" + action.payload.Email)
        });
        console.log(data);
        if(data.data.clientId==='111')
            yield put(validateClientSuccess(204));
        else
            yield put(validateClientfailure(data));

    }catch(error){

    yield put(validateClientfailure(error));
           
    }
}


const ClientReducer = (state = initialState, action) => {
    switch (action.type) {
        case Fetch_client_Request:
            return {
                ...state,
                loading: true
            }
        case Fetch_client_Success:
            return {

                loading: false,
                Client: action.payload.data,

            }
        case Fetch_client_Failure:
            return {
                ...state,
                loading: false,
                client: {},
                error: action.payload

            }
        case Update_client_Request:
            return {
                ...state,
                loading: true
            }
        case Update_client_Success:
            return {
                ...state,
                loading: false,
                Client: action.payload,

            }
        case Update_client_Failure:
            return {
                ...state,
                loading: false,
                error: action.payload

            }
        case Validate_client_Request:
            return {
                ...state,
                valid:false
            }
        case Validate_client_Success:
            return {
                ...state,
                    valid: true
            }
        case Validate_client_Failure:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}



export default ClientReducer;
