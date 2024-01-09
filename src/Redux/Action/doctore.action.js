import { deleteDocotorApiData, getDocotorApiData, postDocotorApiData, updateDocotorApiData } from '../../common/Apis/doctors.api'
import * as ActionType from '../ActionTypes'

export const getDoctordata = () => (dispatch) => {
    // try {
    //     dispatch(loadingDoctor(true));

    //     setTimeout(function(){
    //         fetch("http://localhost:3004/doctors")
    //         // .then((response) => response.json())
    //         .then((response) => {
    //             if (response.ok) {
    //                 return response.json();
    //             }
    //             throw new Error('somthing went wrong');
    //         })
    //         .then((data) => dispatch({ type: ActionType.GET_DOCTOR, payload: data }))
    //         .catch((error) => dispatch(errorHandle(error.massage)))
    //     }, 3000)

    // } catch(error) {
    //     // console.log(error);
    //     dispatch(errorHandle(error))
    // }

    try {
        // dispatch(loadingDoctor(true));
            getDocotorApiData()
                .then((response) => dispatch({ type: ActionType.GET_DOCTOR, payload: response.data }))
                .catch((error) => console.log(error))
        
    } catch (error) {
        // console.log(error);
        dispatch(errorHandle(error))
    }
}

export const addDoctordata = (data) => (dispatch) => {
    // try {
    //     fetch("http://localhost:3004/doctors", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(data),
    //     })
    //         .then((response) => response.json())
    //         .then((data) => dispatch({ type: ActionType.ADD_DOCTOR, payload: data }))
    //         .catch((error) => console.log(error))
    // } catch (error) {
    //     console.log(error);
    // }

    try {
        postDocotorApiData(data)
            .then((response) => dispatch({ type: ActionType.ADD_DOCTOR, payload: response.data }))
            .catch((error) => console.log(error))
    } catch (error) {
        console.log(error);
    }
}

export const delDoctordata = (id) => (dispatch) => {
    // try {
    //     fetch("http://localhost:3004/doctors/" + id, {
    //         method: "DELETE",
    //     })
    //         .then(dispatch({ type: ActionType.DELETE_DOCTOR, payload: id }))
    //         .catch((error) => console.log(error))
    // } catch (error) {
    //     console.log(error);
    // }

    try {
        deleteDocotorApiData(id)
            .then(dispatch({ type: ActionType.DELETE_DOCTOR, payload: id }))
            .catch((error) => console.log(error))
    } catch (error) {
        console.log(error);
    }
}

export const updateDoctordata = (data) => (dispatch) => {
    // try {
    //     fetch("http://localhost:3004/doctors/" + data.id, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(data),
    //     })
    //         .then(dispatch({ type: ActionType.UPDATE_DOCTOR, payload: data }))
    //         .catch((error) => console.log(error))
    // } catch (error) {
    //     console.log(error);
    // }

    try {
        updateDocotorApiData(data)
            .then(dispatch({ type: ActionType.UPDATE_DOCTOR, payload: data }))
            .catch((error) => console.log(error))
    } catch (error) {
        console.log(error);
    }
}

export const loadingDoctor = (status) => (dispatch) => {
    dispatch({ type: ActionType.LOADING_DOCTOR, payload: status })
}

export const errorHandle = (errorMsg) => (dispatch) => {
    // console.log(errorMsg);
    dispatch({ type: ActionType.ERROR_DOCTOR, payload: errorMsg })
}