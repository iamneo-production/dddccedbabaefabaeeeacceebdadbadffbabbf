import './Stopwatch.css'
import {useState,useRef,} from 'react';

const Stopwatch=()=>{

    const useTimer = (initialState = 0) => {
      const [timer, setTimer] = useState(initialState)
      const [isActive, setIsActive] = useState(false)
      const [isPaused, setIsPaused] = useState(false)
      const countRef = useRef(null)
    
      const handleStart = () => {
        setIsActive(true)
        setIsPaused(true)
        countRef.current = setInterval(() => {
          setTimer((timer) => timer + 1)
        }, 1000)
      }
    
      const handlePause = () => {
        clearInterval(countRef.current)
        setIsPaused(false)
      }
    
      const handleResume = () => {
        setIsPaused(true)
        countRef.current = setInterval(() => {
          setTimer((timer) => timer + 1)
        }, 1000)
      }
    
      const handleReset = () => {
        clearInterval(countRef.current)
        setIsActive(false)
        setIsPaused(false)
        setTimer(0)
      }
    
      return { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset }
    }

    const formatTime = () => {
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes = `${Math.floor(timer / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
    
        return `${getHours} : ${getMinutes} : ${getSeconds}`
      }

    const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer(0)

    return(
            <div className="watch" >
            <div className="Main">
                <h1 className="head">React Stopwatch</h1>
                <div className="timer" data-testid="time">
                    <h1>{formatTime(timer)}</h1>
                </div>
                <div className="buttons">
                {
                !isActive && !isPaused ?
                <button className="btn" onClick={handleStart} data-testid="start" >Start</button>
                : (
                    
                    isPaused ? <button className="btn" onClick={handlePause} data-testid="pause">Pause</button> :
                    <button className="btn" onClick={handleResume}>Resume</button>
                )
                }
                <button className="btn" onClick={handleReset} disabled={!isActive} data-testid="reset" >Reset</button>
                </div>

            </div>
            </div>
        

    )
}

export default Stopwatch;