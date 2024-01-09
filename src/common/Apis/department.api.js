import { deleteRequest, getRequest, postRequest, putRequest } from "../Request"

export const getDepartmentApiData = () => {
        return getRequest('department');
}

export const postDepartmentApiData = (data) => {
    return postRequest('department', data)
}

export const deleteDepartmentApiData = (id) => {
    return deleteRequest('department/' + id)
}

export const updateDepartmentApiData = (data) => {
    return putRequest('department/' + data.id , data)
}