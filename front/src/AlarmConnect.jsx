import React, { useEffect } from "react";
// import { useQueryClient } from "@tanstack/react-query";
import { EventSourcePolyfill } from "event-source-polyfill";
import toast, { Toaster } from "react-hot-toast";
import { BASE_URL } from "./util/commonFunction";
import AlarmToast from "./AlarmToast";
// import AlarmToast from "./BoardAlarmToast";
// import ReservationAlarmToast from "./ReservationAlarmToast";

const AlarmConnect = () => {
  const access = localStorage.getItem("access");
  useEffect(() => {
    const eventSource = new EventSourcePolyfill(
      `${BASE_URL}/api/alarms/subscribe`,
      {
        headers: {
          access: `${localStorage.getItem("access")}`,
          Connection: "keep-alive",
          Accept: "text/event-stream",
          "X-Accel-Buffering": "no",
        },
        heartbeatTimeout: 86400000,
        withCredentials: true,
      }
    );

    eventSource.onopen = () => {
      console.log("Connection opened");
    };

    eventSource.addEventListener("connect", (event) => {
      console.log("SSE CONNECTED");
      console.log("Event Data:", event.data);
    });

    eventSource.addEventListener("comment", (event) => {
      const comment = JSON.parse(event.data);
      toast.custom((t) => <AlarmToast t={t} comment={comment} />);
    });

    eventSource.addEventListener("FollowAlarm", (event) => {
      const comment = JSON.parse(event.data);
      toast.custom((t) => <AlarmToast t={t} comment={comment} />);
    });

    eventSource.addEventListener("reservation", (event) => {
      const reservation = JSON.parse(event.data);
      toast.custom((t) => (
        <ReservationAlarmToast t={t} comment={reservation} />
      ));
    });

    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
    };

    return () => {
      eventSource.close();
    };
  }, [access]);

  return <Toaster />;
};

export default AlarmConnect;
