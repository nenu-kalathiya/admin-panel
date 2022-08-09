import { BASE_URL } from "../../Base_url/Base_url";
import { deleteMedicineData, getAllMedicine, postMedicineData, putMedicineData } from "../../common/apis/medicine.api";
import * as ActionType from '../ActionType'


export const getMedicine = () => (dispatch) => {
  try {
    dispatch(medicineloading())

    setTimeout(function () {
      getAllMedicine()
        .then(data => dispatch(({ type: ActionType.MEDICINE_GETDATA, payload: data.data })))
        .catch(error => dispatch(errormedicine(error.message)));
      // fetch(BASE_URL + 'medicine')
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
      //   .then(data => dispatch(({ type: ActionType.MEDICINE_GETDATA, payload: data })))
      //   .catch(error => dispatch(errormedicine(error.message)));
    }, 2000);
  } catch (error) {
    dispatch(errormedicine(error.message))
  }
}

export const addmedicine = (data) => (dispatch) => {
  try {
    postMedicineData(data)
      .then(data => dispatch(({ type: ActionType.ADD_MEDICINE, payload: data.data })))
      .catch(error => dispatch(errormedicine(error.message)));
    // fetch(BASE_URL + 'medicine', {
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
    //   .then(data => dispatch(({ type: ActionType.ADD_MEDICINE, payload: data })))
    //   .catch(error => dispatch(errormedicine(error.message)));
  } catch (error) {
    dispatch(errormedicine(error.message))
  }
}

export const deleteMedicine = (id) => (dispatch) => {
  console.log(id);
  try {
    deleteMedicineData(id)
      .then(data => dispatch(({ type: ActionType.DELETE_MEDICINE, payload: id })))
      .catch(error => dispatch(errormedicine(error.message)));
    // fetch(BASE_URL + 'medicine/' + id, {
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
    //   .then(data => dispatch(({ type: ActionType.DELETE_MEDICINE, payload: id })))
    //   .catch(error => dispatch(errormedicine(error.message)));
  } catch (error) {
    dispatch(errormedicine(error.message))
  }
}

export const updateMedicine = (data) => (dispatch) => {
  // console.log(id);
  try {
    putMedicineData(data)
      .then(data => dispatch(({ type: ActionType.UPDATE_MEDICINE, payload: data.data })))
      .catch(error => dispatch(errormedicine(error.message)));
    // fetch(BASE_URL + 'medicine/' + data.id, {
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
    //   .then(data => dispatch(({ type: ActionType.UPDATE_MEDICINE, payload: data })))
    //   .catch(error => dispatch(errormedicine(error.message)));
  } catch (error) {
    dispatch(errormedicine(error.message))
  }
}

export const medicineloading = () => (dispatch) => {
  dispatch({ type: ActionType.MEDICINE_LOADING })
}

export const errormedicine = () => (dispatch) => {
  dispatch({ type: ActionType.MEDICINE_ERROR })
}



