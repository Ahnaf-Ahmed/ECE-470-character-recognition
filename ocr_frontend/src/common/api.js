import { IDENTIFY_URL, REQUEST_METHODS, STATS_URL, VERIFY_URL } from './constants'

export const request = async (url, method = 'GET', params) =>
    await fetch(url, { body: params?.body, headers: params?.headers, method, mode: 'cors' })

export const fetchModelStats = async () => {
    const response = await request(STATS_URL, REQUEST_METHODS.GET)
    return await response.json()
}

export const submitCharacter = async (image) => {
    const response = await request(
        IDENTIFY_URL,
        REQUEST_METHODS.POST,
        { body: JSON.stringify({ image }) },
    )
    return await response.json()
}

export const verifyResult = async (isAccurate, ref) => {
    const response = await request(
        VERIFY_URL,
        REQUEST_METHODS.PATCH,
        {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ is_accurate: isAccurate, ref })
        },
    )
    return await response.json()
}