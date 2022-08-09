import { BASE_URL } from "../../Base_url/Base_url";
import { deletePatientsData, getAllPatients, postPatientsData, putPatientsData } from "../../common/apis/patients.api";
import * as ActionType from '../ActionType'

export const getPatient = () => (dispatch) => {
  try {
    dispatch(patientloading())

    setTimeout(function () {
      getAllPatients()
        .then(data => dispatch(({ type: ActionType.PATIENT_GETDATA, payload: data.data })))
        .catch(error => dispatch(errorpatient(error.message)));
      // fetch(BASE_URL + 'Patient')
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
      //   .then(data => dispatch(({ type: ActionType.PATIENT_GETDATA, payload: data })))
      //   .catch(error => dispatch(errorpatient(error.message)));
    }, 2000);


  } catch (error) {
    dispatch(errorpatient(error.message))
  }
}

export const addPatient = (data) => (dispatch) => {
  try {
    postPatientsData(data)
      .then(data => dispatch(({ type: ActionType.ADD_PATIENT, payload: data.data })))
      .catch(error => dispatch(errorpatient(error.message)));
    // fetch(BASE_URL + 'Patient', {
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
    //   .then(data => dispatch(({ type: ActionType.ADD_PATIENT, payload: data })))
    //   .catch(error => dispatch(errorpatient(error.message)));
  } catch (error) {
    dispatch(errorpatient(error.message
    ))
  }
}

export const deletePatient = (id) => (dispatch) => {
  console.log(id);
  try {
    deletePatientsData(id)
      .then(data => dispatch(({ type: ActionType.DELETE_PATIENT, payload: id })))
      .catch(error => dispatch(errorpatient(error.message)));
    // fetch(BASE_URL + 'Patient/' + id, {
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
    //   .then(data => dispatch(({ type: ActionType.DELETE_PATIENT, payload: id })))
    //   .catch(error => dispatch(errorpatient(error.message)));
  } catch (error) {
    dispatch(errorpatient(error.message))
  }
}

export const updatePatient = (data) => (dispatch) => {
  // console.log(id);
  try {
    putPatientsData(data)
      .then(data => dispatch(({ type: ActionType.UPDATE_PATIENT, payload: data.data })))
      .catch(error => dispatch(errorpatient(error.message)));
    // fetch(BASE_URL + 'Patient/' + data.id, {
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
    //   .then(data => dispatch(({ type: ActionType.UPDATE_PATIENT, payload: data })))
    //   .catch(error => dispatch(errorpatient(error.message)));
  } catch (error) {
    dispatch(errorpatient(error.message))
  }
}

export const patientloading = () => (dispatch) => {
  dispatch({ type: ActionType.PATIENT_LOADING })
}

export const errorpatient = () => (dispatch) => {
  dispatch({ type: ActionType.PATIENT_ERROR })
}



