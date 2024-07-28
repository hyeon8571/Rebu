import React from 'react';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {Scheduler, WeekView, Toolbar, Appointments,TodayButton,DateNavigator } from '@devexpress/dx-react-scheduler-material-ui';

const CustomTimeScaleLayout = ({ children, style, ...restProps }) => (
  <WeekView.TimeScaleLayout
    {...restProps}
    style={{
      ...style,
      fontSize: "8px",
      width: '50px',
      minWidth: '50px',
    }}
  >
    {children}
  </WeekView.TimeScaleLayout>
);

const CustomDayScaleLayout = ({ children, style, ...restProps }) => (
  <WeekView.DayScaleLayout
    {...restProps}
      style={{
        ...style,
        width : "50px",
        fontSize: "8px",
      }}
    >
    {children}

  </WeekView.DayScaleLayout>
)

const CustomDayScaleRow = ({ children, style, ...restProps }) => (
  <WeekView.DayScaleRow
    {...restProps}
      style={{
        ...style,
        width : "50px",
        fontSize: "8px",
      }}
    >
    {children}

  </WeekView.DayScaleRow>
)


const CustomTimeScaleLabel = ({ children, style, ...restProps }) => (
  <WeekView.TimeScaleLabel
    {...restProps}
    style={{
      ...style,
      fontSize: "8px",
      width: "50px",
    }
    }
  >
    {children}
  </WeekView.TimeScaleLabel>
);

const CustomTimeTableLayout = ({ children, style, ...restProps }) => (
  <WeekView.TimeTableLayout
    {...restProps}
    style={{
      ...style,
      width: '70%',
      minWidth: '70%',
    }}
  >
    {children}
  </WeekView.TimeTableLayout>
);


const CustomTimeTableCell = ({ children, style, ...restProps }) => (
  <WeekView.TimeTableCell
    {...restProps}
    style={{
      ...style,
      width: 'auto',
      minWidth: 'auto',
    }}
  >
    {children}
  </WeekView.TimeTableCell>
);
const today = new Date();
const formattedToday = today.toISOString().split('T')[0];


const appointments = [
  { startDate: '2024-07-30T09:45', endDate: '2024-07-30T11:00', title: formattedToday },
  // 다른 일정 데이터 추가
];

const MyScheduler = () => (
  <Scheduler data={appointments} locale={"kr-KR"}>
    <ViewState />
    <WeekView
      dayScaleRowComponent={CustomDayScaleRow}
      dayScaleLayoutComponent={CustomDayScaleLayout}
      timeScaleLayoutComponent={CustomTimeScaleLayout}
      timeScaleLabelComponent={CustomTimeScaleLabel}
      timeTableLayoutComponent={CustomTimeTableLayout}
      timeTableCellComponent={CustomTimeTableCell}
    />
    <Appointments />
    <Toolbar/>
    <DateNavigator />
    <TodayButton
    />
  </Scheduler>
);

export default MyScheduler;

