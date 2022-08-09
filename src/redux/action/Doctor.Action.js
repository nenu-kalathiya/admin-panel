import { BASE_URL } from "../../Base_url/Base_url";
import { deleteDoctorData, getAllDoctorData, postDoctorData, putDoctorData } from "../../common/apis/doctor.api";
import * as ActionType from '../ActionType'

export const getDoctor = () => (dispatch) => {
  try {
    dispatch(doctorloading())

    setTimeout(function () {
      getAllDoctorData()
        .then(data => dispatch(({ type: ActionType.DOCTOR_GETDATA, payload: data.data })))
        .catch(error => dispatch(errordoctor(error.message)));
      // fetch(BASE_URL + 'doctor')
      //   .then(response => {
      //     if (response.ok) {
      //       return response;
      //     } else {
      //       var error = new Error('Error ' + response.status + ': ' + response.statusText);
      //       error.response = response;
      //       throw error;
      //     }
      //   },
      //     error => {
      //       var errmess = new Error(error.message);
      //       throw errmess;
      //     })
      //   .then(response => response.json())
      //   .then(data => dispatch(({ type: ActionType.DOCTOR_GETDATA, payload: data })))
      //   .catch(error => dispatch(errordoctor(error.message)));
    }, 2000);
  } catch (error) {
    dispatch(errordoctor(error.message))
  }
}

export const adddoctor = (data) => (dispatch) => {
  try {
    postDoctorData(data)
      .then(data => dispatch(({ type: ActionType.ADD_DOCTOR, payload: data.data })))
      .catch(error => dispatch(errordoctor(error.message))); 
    // fetch(BASE_URL + 'doctor', {
    //   method: 'POST',
    //   headers: {
    //     'content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then(response => {
    //     if (response.ok) {
    //       return response;
    //     } else {
    //       var error = new Error('Error ' + response.status + ': ' + response.statusText);
    //       error.response = response;
    //       throw error;
    //     }
    //   },
    //     error => {
    //       var errmess = new Error(error.message);
    //       throw errmess;
    //     })
    //   .then(response => response.json())
    //   .then(data => dispatch(({ type: ActionType.ADD_DOCTOR, payload: data })))
    //   .catch(error => dispatch(errordoctor(error.message)));
  } catch (error) {
    dispatch(errordoctor(error.message))
  }
}

export const deleteDoctor = (id) => (dispatch) => {
  console.log(id);
  try {
    deleteDoctorData(id)
      .then(data => dispatch(({ type: ActionType.DELETE_DOCTOR, payload: id })))
      .catch(error => dispatch(errordoctor(error.message)));
    // fetch(BASE_URL + 'doctor/' + id, {
    //   method: 'DELETE'
    // })
    //   .then(response => {
    //     if (response.ok) {
    //       return response;
    //     } else {
    //       var error = new Error('Error ' + response.status + ': ' + response.statusText);
    //       error.response = response;
    //       throw error;
    //     }
    //   },
    //     error => {
    //       var errmess = new Error(error.message);
    //       throw errmess;
    //     })
    //   .then(response => response.json())
    //   .then(data => dispatch(({ type: ActionType.DELETE_DOCTOR, payload: id })))
    //   .catch(error => dispatch(errordoctor(error.message)));
  } catch (error) {
    dispatch(errordoctor(error.message))
  }
}

export const updateDoctor = (data) => (dispatch) => {
  // console.log(id);
  try {
    putDoctorData(data)
      .then(data => dispatch(({ type: ActionType.UPDATE_DOCTOR, payload: data.data })))
      .catch(error => dispatch(errordoctor(error.message)));
    // fetch(BASE_URL + 'doctor/' + data.id, {
    //   method: 'PUT',
    //   headers: {
    //     'content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // })
    //   .then(response => {
    //     if (response.ok) {
    //       return response;
    //     } else {
    //       var error = new Error('Error ' + response.status + ': ' + response.statusText);
    //       error.response = response;
    //       throw error;
    //     }
    //   },
    //     error => {
    //       var errmess = new Error(error.message);
    //       throw errmess;
    //     })
    //   .then(response => response.json())
    //   .then(data => dispatch(({ type: ActionType.UPDATE_DOCTOR, payload: data })))
    //   .catch(error => dispatch(errordoctor(error.message)));
  } catch (error) {
    dispatch(errordoctor(error.message))
  }
}

export const doctorloading = () => (dispatch) => {
  dispatch({ type: ActionType.DOCTOR_LOADING })
}

export const errordoctor = () => (dispatch) => {
  dispatch({ type: ActionType.DOCTOR_ERROR })
}



