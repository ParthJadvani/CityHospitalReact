import { deleteDepartmentApiData, getDepartmentApiData, postDepartmentApiData, updateDepartmentApiData } from '../../common/Apis/department.api';
import * as ActionType from '../ActionTypes';

export const getDepartment = () => (dispatch) => {
    // try {
    //     fetch("http://localhost:3004/department")
    //         .then((response) => response.json())
    //         .then((data) => dispatch({ type: ActionType.GET_DEPARTMENT, payload: data }))
    //         .catch((error) => console.log(error))
    // } catch (error) {
    //     console.log(error);
    // }
    try{
        getDepartmentApiData()
        .then((response) => dispatch({ type: ActionType.GET_DEPARTMENT, payload: response.data }))
        .catch((error) => console.log(error))
    } catch (error) {
        console.log(error);
    }
}

export const addDepartment = (data) => (dispatch) => {
    // try {
    //     fetch("http://localhost:3004/department", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(data)
    //     })
    //         .then((response) => response.json())
    //         .then((data) => dispatch({ type: ActionType.ADD_DEPARTMENT, payload: data }))
    //         .catch((error) => console.log(error))
    // } catch (error) {
    //     console.log(error);
    // }

    try {
        postDepartmentApiData(data)
            .then((response) => dispatch({ type: ActionType.ADD_DEPARTMENT, payload: response.data }))
            .catch((error) => console.log(error))
    } catch (error) {
        console.log(error);
    }
}

export const removeDepartment = (id) => (dispatch) => {
    // try {
    //     fetch("http://localhost:3004/department/" + id, {
    //         method: "DELETE",
    //     })
    //         .then((response) => response.json())
    //         .then(dispatch({ type: ActionType.DELETE_DEPARTMENT, payload: id }))
    //         .catch((error) => console.log(error))
    // } catch (error) {
    //     console.log(error);
    // }
    
    try {
        deleteDepartmentApiData(id)
            .then(dispatch({ type: ActionType.DELETE_DEPARTMENT, payload: id }))
            .catch((error) => console.log(error))
    } catch (error) {
        console.log(error);
    }
}

export const editDepartment = (data) => (dispatch) => {
    // try {
    //     fetch("http://localhost:3004/department/" + data.id, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(data)
    //     })
    //         .then((response) => response.json())
    //         .then(dispatch({ type: ActionType.UPDATE_DEPARTMENT, payload: data }))
    //         .catch((error) => console.log(error))
    // } catch (error) {
    //     console.log(error);
    // }

    try {
        updateDepartmentApiData(data)
            .then(dispatch({ type: ActionType.UPDATE_DEPARTMENT, payload: data }))
            .catch((error) => console.log(error))
    } catch (error) {
        console.log(error);
    }
}