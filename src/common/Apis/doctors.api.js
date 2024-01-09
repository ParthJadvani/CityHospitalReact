import { deleteRequest, getRequest, postRequest, putRequest } from "../Request"

export const getDocotorApiData = () => {
    return getRequest('doctors')
}

export const postDocotorApiData = (data) => {
    return postRequest('doctors', data)
}

export const deleteDocotorApiData = (id) => {
    return deleteRequest('doctors/' + id)
}

export const updateDocotorApiData = (data) => {
    return putRequest('doctors/' + data.id, data)
}
