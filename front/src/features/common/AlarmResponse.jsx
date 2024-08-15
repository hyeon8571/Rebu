import { useSelector } from "react-redux";

export const AlarmResponse = () => {
  const alarms = useSelector((state) => state.auth.alarms);

  return (
    <div>
      {alarms &&
        alarms.length > 0 &&
        alarms.map((alarm, index) => <div key={index}>{alarm.message}</div>)}
    </div>
  );
};

export default AlarmResponse;
