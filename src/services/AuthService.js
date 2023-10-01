import ApiService from './ApiService'

export async function apiSignIn(data) {
    return ApiService.fetchData({
        url: 'https://api.voagstech.com/api/auth/login',
        method: 'post',
        data,
    })
}

export async function apiSignUp(data) {
    return ApiService.fetchData({
        url: 'https://api.voagstech.com/api/auth/register',
        method: 'post',
        data,
    })
}

export async function apiSignOut(data) {
    return ApiService.fetchData({
        url: `https://api.voagstech.com/api/auth/logout/${data}`,
        method: 'post',
        data,
    })
}

export async function apiForgotPassword(data) {
    return ApiService.fetchData({
        url: '/forgot-password',
        method: 'post',
        data,
    })
}

export async function apiResetPassword(data) {
    return ApiService.fetchData({
        url: '/reset-password',
        method: 'post',
        data,
    })
}
