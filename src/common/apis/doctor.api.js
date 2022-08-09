import { deleteRequest, getRequest, postRequest, putRequest } from "../Request";

export const getAllDoctorData = () => {
    return getRequest('doctor')
}

export const postDoctorData = (data) =>{
    return postRequest('doctor', data)
}

export const deleteDoctorData = (id) =>{
    return deleteRequest('doctor/', id)
}

export const putDoctorData = (data) =>{
    return putRequest('doctor/', data)
}