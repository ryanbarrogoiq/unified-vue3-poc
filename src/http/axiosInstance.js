import Axios from 'axios'
import * as StringUtils from '../utils/string/string-utils'
import AlertNotification from "../utils/alerts/alert-notification"
import {useCookies} from "vue3-cookies"
import {ERRORS, LS_KEY_USER_DATA, LS_KEY_USER_PERMISSIONS} from "../constants"

const {cookies} = useCookies()
const AUTH_TOKEN = cookies.get('token')

console.log(AUTH_TOKEN)

let axiosInstance = Axios.create({
    headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
    },
    // We do not set the base url since we define them on use since we are currently using multiple APIs
});

axiosInstance.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        // 401 - Unauthorized
        if (AUTH_TOKEN && error.response.status === 401) {
            this.$cookies.remove('token')
            localStorage.removeItem(LS_KEY_USER_DATA)
            localStorage.removeItem(LS_KEY_USER_PERMISSIONS)
            location.reload()
        }

        // 403 - Forbidden
        if (error.response && error.response.status === 403) {
            if (error.response?.data) {
                AlertNotification.showError(StringUtils.replaceWithParams(
                    ERRORS.PERMISSION.NOT_ENOUGH_PERMISSION_UNHANDLED,
                    {
                        permission: error.response.data.PermissionString,
                        errorMessage: error.response.data.Error,
                        forbiddenType: error.response.data.ForbiddenResponseType,
                    }
                ))
            }
        }

        // 404 - Not Found
        if (error.response && error.response.status === 404) {
            // TODO: deal with 404. VueRouter, when brought in, will have to handle this differently to API 404s
        }

        return Promise.reject(error)
    }
);

export default axiosInstance
