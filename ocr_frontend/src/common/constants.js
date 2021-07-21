// TODO: Uncomment line 3, and comment line 4. Line 3 is just so I can test on an
// external device with ngrok
// export const BASE_API_URL = 'http://127.0.0.1:5000/ocr-api'
export const BASE_API_URL = 'http://6c4de3e902f8.ngrok.io/ocr-api'

export const STATS_URL = `${BASE_API_URL}/stats`
export const IDENTIFY_URL = `${BASE_API_URL}/identify`
export const VERIFY_URL = `${BASE_API_URL}/verify`

export const HOME_ROUTE = '/'
export const IDENTIFY_ROUTE = '/identify'
export const STATS_ROUTE = '/stats'

export const ROUTES = {
    HOME_ROUTE,
    IDENTIFY_ROUTE,
    STATS_ROUTE
}

export const REQUEST_METHODS = {
    GET: 'GET',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
    POST: 'POST',
    PUT: 'PUT'
}