import { useEffect, useState, useRef } from 'react';
import { AppState, BackHandler } from 'react-native';

const useIdleTimer = (idleTime = 5 * 60 * 1000) => {
    const [isIdle, setIsIdle] = useState(false); // Tracks if the user is idle
    const idleTimerRef = useRef(null);          // Stores the timer reference

    // Function to reset the idle timer
    const resetIdleTimer = () => {
        setIsIdle(false); // Reset idle state
        if (idleTimerRef.current) {
            clearTimeout(idleTimerRef.current);
        }
        // Start a new timer for idle detection
        idleTimerRef.current = setTimeout(() => {
            setIsIdle(true); // Mark as idle
        }, idleTime);
    };

    useEffect(() => {
        // Function to reset timer when the app comes back to the foreground
        const handleAppStateChange = (nextAppState) => {
            if (nextAppState === 'active') {
                resetIdleTimer();
            }
        };

        // Attach app state listener
        const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

        // Initialize the idle timer
        resetIdleTimer();

        return () => {
            // Cleanup app state listener and idle timer
            appStateSubscription.remove();
            if (idleTimerRef.current) {
                clearTimeout(idleTimerRef.current);
            }
        };
    }, [idleTime]);

    return [isIdle, resetIdleTimer];
};

export default useIdleTimer;
