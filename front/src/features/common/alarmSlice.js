import React, { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { BASE_URL } from '../../util/commonFunction';
import { addAlarm, setAlarmConnection } from '../auth/authSlice';

export const NotificationComponent = () => {
  const dispatch = useDispatch();
  const { isLogin, access, nickname } = useSelector(state => state.auth);
  const eventSourceRef = useRef(null);

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
          // transport: 'xhr' // HTTP/1.1로 강제 ... 안되면 삭제
        }
      );

      eventSource.onopen = () => {
        console.log('Alarm connection opened');
        dispatch(setAlarmConnection(true));
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

        // 페이지 즉시 새로고침
        // setTimeout(() => {
        //   window.location.reload();
        // }, 300000);  // 5분 후에 새로고침 (300,000 밀리초)
      };

      eventSourceRef.current = eventSource;
    }
  }, [isLogin, access, nickname, dispatch]);

  const closeEventSource = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      dispatch(setAlarmConnection(false));
      console.log("Alarm SSE connection closed");
    }
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
