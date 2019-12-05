import axios from 'axios'

let BASE_URL = 'http://192.168.1.38/mandoob/api/';

export default {
    AUTH_ACCOUNT: 'admin/login',

    COMMON_GOVERNORATES: 'common/governorates',
    COMMON_STATUS: 'common/status',

    ALL_CLIENTS: 'client',
    DELETE_CLIENTS: 'client/delete',
    ADD_CLIENTS: 'client/create',
    UPDATE_CLIENTS: 'client/update',

    ALL_MANDOOBS: 'mandoob',
    DELETE_MANDOOBS: 'mandoob/delete',
    ADD_MANDOOBS: 'mandoob/create',
    UPDATE_MANDOOBS: 'mandoob/update',

    ALL_SUPERVISOR: 'supervisor',
    DELETE_SUPERVISOR: 'supervisor/delete',
    ADD_SUPERVISOR: 'supervisor/create',
    UPDATE_SUPERVISOR: 'supervisor/update',

    ALL_CUSTOMERS: 'customer',
    DELETE_CUSTOMERS: 'customer/delete',
    ADD_CUSTOMERS: 'customer/create',
    UPDATE_CUSTOMERS: 'customer/update',

    ADD_COUPONS_VALUES: 'coupon-value/create',
    ALL_COUPONS_VALUES: 'coupon-value',
    ALL_COUPONS: 'coupon',
    DELETE_COUPONS: 'coupon/delete',
    ADD_COUPONS: 'coupon/create',
    UPDATE_COUPONS: 'coupon/update',

    API: () => {
        let token = null;
        try {
            let auth_data = window.ls.getFromStorage('auth_data');
            auth_data = JSON.parse(auth_data);
            token = auth_data.token;
        } catch (e) {
            token = null
        }

        return axios.create({
            baseURL: BASE_URL,
            withCredentials: false,
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    },
}
