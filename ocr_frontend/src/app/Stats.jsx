import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { fetchModelStats } from '../common/api'
import { ROUTES } from '../common/constants'
import Button from './Button'

import './Stats.scss'

const Stats = () => {
    const [statistics, setStatistics] = useState(null)

    const history = useHistory()

    const goToHome = () => history.push(ROUTES.HOME_ROUTE)

    const goToIdentify = () => history.push(ROUTES.IDENTIFY_ROUTE)

    useEffect(() => {
        const getStats = async () => {
            const response = await fetchModelStats()

            setStatistics(response?.data)
        }

        getStats()
    }, [])

    const getAccurate = () => {
        const accurate = statistics?.reduce((acc, curr) => curr.is_accurate === true ? acc += 1 : acc, 0) || 0
        return Math.round(accurate / (statistics?.length || 1) * 100)
    }

    const getInaccurate = () => {
        const inaccurate = statistics?.reduce((acc, curr) => curr.is_accurate === false ? acc += 1 : acc, 0) || 0
        return Math.round(inaccurate / (statistics?.length || 1) * 100)
    }

    const getUnknown = () => {
        const unknown = statistics?.reduce((acc, curr) => curr.is_accurate === 'UNKNOWN' ? acc += 1 : acc, 0) || 0
        return Math.round(unknown / (statistics?.length || 1) * 100)
    }

    return (
        <div className="statistics">
            <div className="statistics-header">
                statistics
            </div>
            <div className="statistics-graph">
                <svg viewBox="0 0 36 36">
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgb(164, 27, 227)" stopOpacity="1" />
                            <stop offset="60%" stopColor="rgb(26, 211, 236)" stopOpacity="1" />
                            <stop offset="90%" stopColor="rgba(236, 26, 201, 1)" stopOpacity="1" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#FFF"
                        strokeWidth="1"
                        strokeDasharray="100, 100"
                    />
                    {
                        !!getAccurate() && (
                            <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="url(#grad1)"
                                strokeWidth="1"
                                strokeDasharray={`${getAccurate()}, 100`}
                            />
                        )
                    }
                    <text
                        x="52%" y="54%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fontSize="10"
                        fill="#FFF"
                    >
                        {getAccurate()}%
                    </text>
                </svg>
                <div className="statistics-label">accurate guesses</div>
                <svg viewBox="0 0 36 36">
                    <defs>
                        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(236, 26, 201, 1)" stopOpacity="1" />
                            <stop offset="20%" stopColor="rgb(26, 211, 236)" stopOpacity="1" />
                            <stop offset="60%" stopColor="rgb(164, 27, 227)" stopOpacity="1" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#FFF"
                        strokeWidth="1"
                        strokeDasharray="100, 100"
                    />
                    {
                        !!getInaccurate() && (
                            <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="url(#grad2)"
                                strokeWidth="1"
                                strokeDasharray={`${getInaccurate()}, 100`}
                            />
                        )
                    }
                    <text
                        x="52%" y="54%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fontSize="10"
                        fill="#FFF"
                    >
                        {getInaccurate()}%
                    </text>
                </svg>
                <div className="statistics-label">inaccurate guesses</div>
                <svg viewBox="0 0 36 36">
                    <defs>
                        <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="20%" stopColor="rgb(164, 27, 227)" stopOpacity="1" />
                            <stop offset="40%" stopColor="rgb(26, 211, 236)" stopOpacity="1" />
                            <stop offset="80%" stopColor="rgba(236, 26, 201, 1)" stopOpacity="1" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#FFF"
                        strokeWidth="1"
                        strokeDasharray="100, 100"
                    />
                    {
                        !!getUnknown() && (
                            <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="url(#grad3)"
                                strokeWidth="1"
                                strokeDasharray={`${getUnknown()}, 100`}
                            />
                        )
                    }
                    <text
                        x="52%" y="54%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fontSize="10"
                        fill="#FFF"
                    >
                        {getUnknown()}%
                    </text>
                </svg>
                <div className="statistics-label">unknown</div>
            </div>
            <Button
                className="identify-button"
                icon="search"
                label="identify"
                onClick={goToIdentify}
            />
            <Button
                className="home-button"
                icon="house"
                label="home"
                onClick={goToHome}
                secondary
            />
        </div>
    )
}

export default Stats
