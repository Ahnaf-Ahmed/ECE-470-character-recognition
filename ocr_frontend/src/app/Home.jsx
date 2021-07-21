import React from 'react'
import { useHistory } from 'react-router-dom'
import { ROUTES } from '../common/constants'
import Button from './Button'

import './Home.scss'

const Home = () => {
    const history = useHistory()

    const goToIdentify = () => history.push(ROUTES.IDENTIFY_ROUTE)

    const goToStats = () => history.push(ROUTES.STATS_ROUTE)

    return (
        <div className="home">
            <div className="home-header">
                <div className="home-header-bg" />
                <div className="home-header-card">
                </div>
            </div>
            <div className="home-help">
                how can we help?
            </div>
            <div className="home-links">
                <Button
                    className="identify-button"
                    icon="search"
                    label="identify"
                    onClick={goToIdentify}
                />
                <Button
                    className="statistics-button"
                    icon="insights"
                    label="statistics"
                    onClick={goToStats}
                />
            </div>
        </div>
    )
}

export default Home
