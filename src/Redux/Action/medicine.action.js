import * as ActionType from '../ActionTypes';

export const getMedicine = () => (dispatch) => {
    try{
        fetch("http://localhost:3004/medicine")
        .then((response) => response.json())
        .then((data) => dispatch({type: ActionType.GET_MEDICINE, payload: data}))
        .catch((error) => console.log(error))
    } catch(error) {
        console.log(error);
    }
}

export const addMedicinedata = (data) => (dispatch) => {
    try {
        fetch("http://localhost:3004/medicine", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => dispatch({type: ActionType.ADD_MEDICINE, payload: data}))
        .catch((error) => console.log(error))
    } catch(error) {
        console.log(error);
    }
} 

export const delMedicinedata = (id) => (dispatch) => {
    try{
        fetch("http://localhost:3004/medicine/" + id, {
            method: "DELETE",
        })
        .then(dispatch({type: ActionType.DELETE_MEDICINE, payload: id}))
        .catch((error) => console.log(error))
    } catch(error) {
        console.log(error);
    }
} 

export const updateMedicinedata = (data) => (dispatch) => {
    try {
        fetch("http://localhost:3004/medicine/" + data.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(dispatch({type: ActionType.UPDATE_MEDICINE, payload: data}))
        .catch((error) => console.log(error))
    } catch(error) {
        console.log(error);
    }
}