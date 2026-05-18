import { GET_USERS_SUCCESS, GET_USERS_REQUEST, GET_USERS_FAIL} from "./constans";

export const fetchUserSuccess = (requestParams) => {
    return (
        type: GET_USERS_SUCCESS,
        payload: requestParams
    )
};
