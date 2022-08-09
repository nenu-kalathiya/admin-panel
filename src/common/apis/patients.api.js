import { deleteRequest, getRequest, postRequest, putRequest } from "../Request";

export const getAllPatients = () => {
    return getRequest('patient')
}

export const postPatientsData = (data) =>{
    return postRequest('patient', data)
}

export const deletePatientsData = (id) =>{
    return deleteRequest('patient/', id)
}

export const putPatientsData = (data) =>{
    return putRequest('patient/', data)
}