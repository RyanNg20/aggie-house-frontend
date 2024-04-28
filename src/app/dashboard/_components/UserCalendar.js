'use client';
import React, { useState, useEffect } from 'react';
import Scheduler from 'devextreme-react/scheduler';
import 'devextreme/dist/css/dx.light.css';
import { withAuthInfo } from '@propelauth/react'

const UserCalendar = withAuthInfo((props) => {
  const [events, setEvents] = useState([]);
  console.log(props.user)
  useEffect(() => {
    fetch('https://aggie-house-backend.onrender.com/timeSlots/available')
      .then(response => response.json())
      .then(data => {
        const transformedData = data.map(item => ({
          id: item._id,
          text: 'Event', // You can customize the text as needed
          startDate: new Date(item.startTime),
          endDate: new Date(item.endTime)
        }));
        setEvents(transformedData);
      })
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    <div className='bg-grey rounded-2xl p-4 drop-shadow-lg gap-4 flex flex-col'>
      <h2 className="font-josefin_sans text-xl px-4 py-4 text-white">Calendar</h2>
      <Scheduler
        timeZone="America/Los_Angeles"
        dataSource={events}
        views={['week', 'month']}
        defaultCurrentView="week"
        defaultCurrentDate={new Date()}
        startDayHour={6}
        endDayHour={22}
        height={530}
        showAllDayPanel={false}
      />
    </div>
  );
});

export default UserCalendar;