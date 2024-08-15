import React, { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { BASE_URL } from '../../util/commonFunction';
import { addAlarm, setAlarmConnection } from '../auth/authSlice';


const MAX_RETRY_COUNT = 5;
const RETRY_INTERVAL = 5000;
const MAX_RETRY_DELAY = 30000;


export const NotificationComponent = () => {
  const dispatch = useDispatch();
  const { isLogin, access, nickname } = useSelector(state => state.auth);
  const eventSourceRef = useRef(null);
  const retryCountRef = useRef(0);
  const retryTimeoutRef = useRef(null);


  const setupEventSource = useCallback(() => {
    if (isLogin && access && !eventSourceRef.current) {
      const eventSource = new EventSourcePolyfill(
        `${BASE_URL}/api/alarms/subscribe`,
        {
          headers: {
            'access': access,
            'Connection': 'keep-alive',
            'Accept': 'text/event-stream',
            'X-Accel-Buffering': 'no',
          },
          heartbeatTimeout: 86400000,
          withCredentials: true,
          transport: 'xhr' // Force HTTP/1.1 <-안되면 지우기
        }
      );

      eventSource.onopen = () => {
        console.log('Alarm connection opened');
        dispatch(setAlarmConnection(true));
        retryCountRef.current = 0;
      };

      eventSource.onmessage = (event) => {
        console.log('Received alarm:', event.data);
        try {
          const alarmData = JSON.parse(event.data);
          dispatch(addAlarm(alarmData));
        } catch (error) {
          console.error('Error parsing alarm data:', error);
        }
      };

      eventSource.onerror = (error) => {
        console.error('Alarm EventSource failed:', error);
        dispatch(setAlarmConnection(false));
        eventSource.close();
        eventSourceRef.current = null;
        scheduleReconnect(); //

        // if (retryCountRef.current < MAX_RETRY_COUNT) {
        //   setTimeout(() => {
        //     retryCountRef.current++;
        //     setupEventSource();
        //   }, RETRY_INTERVAL);
        // } else {
        //   console.error('Max retry count reached. Please check your connection.');
        // }
      };

      eventSourceRef.current = eventSource;
    }
  }, [isLogin, access, nickname, dispatch]);

  const scheduleReconnect = useCallback(() => {
    if (retryCountRef.current < MAX_RETRY_COUNT) {
      const delay = Math.min(INITIAL_RETRY_DELAY * Math.pow(2, retryCountRef.current), MAX_RETRY_DELAY);
      console.log(`Attempting to reconnect in ${delay}ms...`);
      retryTimeoutRef.current = setTimeout(() => {
        retryCountRef.current++;
        setupEventSource();
      }, delay);
    } else {
      console.error('Max retry count reached. Please check your connection.');
    }
  }, [setupEventSource]);


  //promise handling
  const closeEventSource = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      dispatch(setAlarmConnection(false));
      console.log("Alarm SSE connection closed");
    }
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
    retryCountRef.current = 0;
  }, [dispatch]);

  useEffect(() => {
    if (isLogin && access) {
      setupEventSource();
    } else {
      closeEventSource();
    }

    return closeEventSource;
  }, [isLogin, access, nickname, setupEventSource, closeEventSource]);

  return null;
};

export default NotificationComponent;