import { deleteRequest, getRequest, postRequest, putRequest } from "../Request";

export const getAllMedicine = () => {
    return getRequest('medicine')
}

export const postMedicineData = (data) =>{
    return postRequest('medicine', data)
}

export const deleteMedicineData = (id) =>{
    return deleteRequest('medicine/', id)
}

export const putMedicineData = (data) =>{
    return putRequest('medicine/', data)
}