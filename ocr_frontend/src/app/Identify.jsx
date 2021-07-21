import React, { useEffect, useRef, useState } from 'react'
import CanvasDraw from 'react-canvas-draw'
import { useHistory } from 'react-router-dom'
import { submitCharacter, verifyResult } from '../common/api'
import Button from './Button'
import Spinner from './Spinner'

import './Identify.scss'
import { ROUTES } from '../common/constants'

const Identify = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [responseData, setResponseData] = useState(null)
    const [hasMarked, setHasMarked] = useState(false)

    const history = useHistory()

    const canvasRef = useRef(null)

    const clearImage = () => canvasRef?.current?.clear()

    const saveImage = () => setIsLoading(true)

    const goToStats = () => history.push(ROUTES.STATS_ROUTE)

    const markImageAsAccurate = () => {
        verifyResult(true, responseData.ref)
        setHasMarked(true)
    }

    const markImageAsInaccurate = () => {
        verifyResult(false, responseData.ref)
        setHasMarked(true)
    }

    const reset = () => {
        clearImage()
        setResponseData(null)
        setHasMarked(false)
    }

    useEffect(() => {
        const analyzeImage = async () => {
            if (isLoading) {
                const imageAsString = canvasRef?.current?.canvasContainer?.children[1]?.toDataURL()
                const response = await submitCharacter(imageAsString)

                setTimeout(() => {
                    setResponseData(response)
                    setIsLoading(false)
                }, 1000)
            }
        }

        analyzeImage()
    }, [isLoading])

    const renderDrawButtons = () =>
        <>
            <Button
                className="clear-button"
                icon="clear"
                label="clear"
                onClick={clearImage}
                secondary
            />
            <Button
                className="submit-button"
                icon="code"
                label="submit"
                onClick={saveImage}
            />
        </>

    const renderAnalysisButtons = () =>
        <>
            <div className={`identify-validity ${hasMarked ? 'hidden' : ''}`}>
                <Button
                    className="correct-button"
                    icon="check"
                    onClick={markImageAsAccurate}
                />
                <Button
                    className="incorrect-button"
                    icon="close"
                    onClick={markImageAsInaccurate}
                    secondary
                />
            </div>
            <Button
                className="again-button"
                icon="replay"
                label="identify another"
                onClick={reset}
                secondary
            />
            <Button
                className="see-stats-button"
                icon="insights"
                label="see statistics"
                onClick={goToStats}
            />
        </>

    return (
        <div className="identify">
            <div className="identify-header">
                identify character
            </div>
            <div className={`identify-canvas ${(!!responseData || isLoading) ? 'hidden' : ''}`}>
                <CanvasDraw
                    brushColor="#FFFFFF"
                    brushRadius={4}
                    canvasHeight={300}
                    canvasWidth={300}
                    catenaryColor="#000000"
                    hideGrid
                    lazyRadius={0}
                    ref={canvasRef}
                    style={{ backgroundColor: '#000000' }}
                />
            </div>
            <div className={`identify-results ${!responseData ? 'hidden' : ''}`}>
                <div className="identify-title">we identified your character as:</div>
                <div className="identify-char">
                    <p>{responseData?.character}</p>
                </div>
                <div className="identify-info">
                    with <strong>{responseData?.accuracy}%</strong> accuracy.
                </div>
                <div className="identify-alt-characters">
                    it may have also been:
                    {
                        responseData?.alt_characters.map(alt => (
                            <p key={alt.character}>
                                <strong>{alt.character}</strong> ({alt.accuracy}% chance)
                            </p>
                        ))
                    }
                </div>
            </div>
            <Spinner isVisible={isLoading} />
            <div className="identify-submit">
                {
                    isLoading
                        ? null
                        : !!responseData
                            ? renderAnalysisButtons()
                            : renderDrawButtons()
                }
            </div>
        </div>
    )
}

export default Identify
