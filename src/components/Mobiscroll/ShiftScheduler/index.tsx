import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import {
  CalendarNav,
  CalendarNext,
  CalendarPrev,
  CalendarToday,
  Checkbox,
  Eventcalendar,
  formatDate,
  MbscCalendarEvent,
  MbscEventcalendarView,
  MbscEventCreateEvent,
  MbscEventDeletedEvent,
  MbscEventUpdateEvent,
  MbscNewEventData,
  MbscResource,
  MbscSelectChangeEvent,
  MbscSlot,
  MbscSlotData,
  Select,
  setOptions,
  localeEs,
} from '@mobiscroll/react';
import { ChangeEvent, Fragment, useCallback, useMemo, useState } from 'react';

setOptions({
  locale: localeEs,
  theme: 'ios',
  themeVariant: 'light',
});

const myResources: MbscResource[] = [
  {
    id: 1,
    name: 'Barista',
    icon: '\u2615\uFE0F',
    eventCreation: false,
    children: [
      {
        id: 11,
        name: 'Jude Chester',
        color: '#1dab2f',
      },
      {
        id: 12,
        name: 'Willis Kane',
        color: '#1dab2f',
      },
      {
        id: 13,
        name: 'Ryan Melicent',
        color: '#1dab2f',
      },
    ],
  },
  {
    id: 2,
    name: 'Bartenders',
    icon: '\uD83C\uDF78',
    eventCreation: false,
    children: [
      {
        id: 21,
        name: 'Derek Austyn',
        color: '#4981d6',
      },
      {
        id: 22,
        name: 'Merv Kenny',
        color: '#4981d6',
      },
      {
        id: 23,
        name: 'Theo Calanthia',
        color: '#4981d6',
      },
    ],
  },
  {
    id: 3,
    name: 'Chefs',
    icon: '\uD83D\uDC69\u200D\uD83C\uDF73',
    eventCreation: false,
    children: [
      {
        id: 31,
        name: 'Ford Kaiden',
        color: '#d6d145',
      },
      {
        id: 32,
        name: 'Jewell Ryder',
        color: '#d6d145',
      },
      {
        id: 33,
        name: 'Dory Edie',
        color: '#d6d145',
      },
    ],
  },
  {
    id: 4,
    name: 'Cleaners',
    icon: '\uD83E\uDDF9',
    eventCreation: false,
    children: [
      {
        id: 41,
        name: 'Breanne Lorinda',
        color: '#ff1717',
      },
      {
        id: 42,
        name: 'Jenifer Kalyn',
        color: '#ff1717',
      },
      {
        id: 43,
        name: 'Natalie Racquel',
        color: '#ff1717',
      },
      {
        id: 44,
        name: 'Kaylin Toni',
        color: '#ff1717',
      },
      {
        id: 45,
        name: 'Gray Kestrel',
        color: '#ff1717',
      },
      {
        id: 46,
        name: 'Florence Amy',
        color: '#ff1717',
      },
    ],
  },
  {
    id: 5,
    name: 'Cooks',
    icon: '\uD83C\uDF72',
    eventCreation: false,
    children: [
      {
        id: 51,
        name: 'Meredith Chantelle',
        color: '#f7961e',
      },
      {
        id: 52,
        name: 'Jon Drake',
        color: '#f7961e',
      },
      {
        id: 53,
        name: 'Carlyn Dorothy',
        color: '#f7961e',
      },
      {
        id: 54,
        name: 'Isadora Lyric',
        color: '#f7961e',
      },
    ],
  },
  {
    id: 6,
    name: 'Hosts',
    icon: '\uD83D\uDECE',
    eventCreation: false,
    children: [
      {
        id: 61,
        name: 'Layton Candace',
        color: '#7056ff',
      },
      {
        id: 62,
        name: 'Sylvia Cale',
        color: '#7056ff',
      },
    ],
  },
  {
    id: 7,
    name: 'Managers',
    icon: '\uD83D\uDC69\u200D\uD83D\uDCBC',
    eventCreation: false,
    children: [
      {
        id: 71,
        name: 'Fred Valdez',
        color: '#3a8700',
      },
      {
        id: 72,
        name: 'Antonia Cindra',
        color: '#3a8700',
      },
      {
        id: 73,
        name: 'Gerry Irma',
        color: '#3a8700',
      },
    ],
  },
  {
    id: 8,
    name: 'Servers',
    icon: '\uD83E\uDD35',
    eventCreation: false,
    children: [
      {
        id: 81,
        name: 'Reg Izabelle',
        color: '#e25dd2',
      },
      {
        id: 82,
        name: 'Adrianna Sawyer',
        color: '#e25dd2',
      },
      {
        id: 83,
        name: 'Lou Andie',
        color: '#e25dd2',
      },
      {
        id: 84,
        name: 'Leon Porter',
        color: '#e25dd2',
      },
    ],
  },
  {
    id: 9,
    name: 'Sommeliers',
    icon: '\uD83C\uDF77',
    eventCreation: false,
    children: [
      {
        id: 91,
        name: 'Yancy Dustin',
        color: '#34c8e0',
      },
      {
        id: 92,
        name: 'Sierra Clark',
        color: '#34c8e0',
      },
    ],
  },
];

const allShifts: MbscCalendarEvent[] = [
  {
    start: '2024-09-25T02:00',
    end: '2024-09-25T10:00',
    title: 'Derek',
    resource: 21,
    slot: 1,
  },
  {
    start: '2024-09-25T02:00',
    end: '2024-09-25T10:00',
    title: 'Florence',
    resource: 46,
    slot: 1,
  },
  {
    start: '2024-09-25T08:00',
    end: '2024-09-25T12:00',
    title: 'Willis',
    resource: 12,
    slot: 2,
  },
  {
    start: '2024-09-25T08:00',
    end: '2024-09-25T12:00',
    title: 'Jewell',
    resource: 32,
    slot: 2,
  },
  {
    start: '2024-09-25T08:00',
    end: '2024-09-25T12:00',
    title: 'Jenifer',
    resource: 42,
    slot: 2,
  },
  {
    start: '2024-09-25T08:00',
    end: '2024-09-25T12:00',
    title: 'Jon',
    resource: 52,
    slot: 2,
  },
  {
    start: '2024-09-25T08:00',
    end: '2024-09-25T12:00',
    title: 'Fred',
    resource: 71,
    slot: 2,
  },
  {
    start: '2024-09-25T08:00',
    end: '2024-09-25T12:00',
    title: 'Adrianna',
    resource: 82,
    slot: 2,
  },
  {
    start: '2024-09-25T08:00',
    end: '2024-09-25T12:00',
    title: 'Jude',
    resource: 11,
    slot: 3,
  },
  {
    start: '2024-09-25T11:00',
    end: '2024-09-25T15:00',
    title: 'Jewell',
    resource: 32,
    slot: 3,
  },
  {
    start: '2024-09-25T11:00',
    end: '2024-09-25T15:00',
    title: 'Gray',
    resource: 45,
    slot: 3,
  },
  {
    start: '2024-09-25T11:00',
    end: '2024-09-25T15:00',
    title: 'Isadora',
    resource: 54,
    slot: 3,
  },
  {
    start: '2024-09-25T11:00',
    end: '2024-09-25T15:00',
    title: 'Antonia',
    resource: 72,
    slot: 3,
  },
  {
    start: '2024-09-25T11:00',
    end: '2024-09-25T15:00',
    title: 'Adrianna',
    resource: 82,
    slot: 3,
  },
  {
    start: '2024-09-25T11:00',
    end: '2024-09-25T15:00',
    title: 'Leon',
    resource: 84,
    slot: 3,
  },
  {
    start: '2024-09-25T11:00',
    end: '2024-09-25T15:00',
    title: 'Yancy',
    resource: 91,
    slot: 3,
  },
  {
    start: '2024-09-25T16:00',
    end: '2024-09-25T23:00',
    title: 'Ryan',
    resource: 13,
    slot: 4,
  },
  {
    start: '2024-09-25T16:00',
    end: '2024-09-25T23:00',
    title: 'Merv',
    resource: 22,
    slot: 4,
  },
  {
    start: '2024-09-25T16:00',
    end: '2024-09-25T23:00',
    title: 'Ford',
    resource: 31,
    slot: 4,
  },
  {
    start: '2024-09-25T16:00',
    end: '2024-09-25T23:00',
    title: 'Dory',
    resource: 33,
    slot: 4,
  },
  {
    start: '2024-09-25T16:00',
    end: '2024-09-25T23:00',
    title: 'Breanne',
    resource: 41,
    slot: 4,
  },
  {
    start: '2024-09-25T16:00',
    end: '2024-09-25T23:00',
    title: 'Meredith',
    resource: 51,
    slot: 4,
  },
  {
    start: '2024-09-25T16:00',
    end: '2024-09-25T23:00',
    title: 'Carlyn',
    resource: 53,
    slot: 4,
  },
  {
    start: '2024-09-25T16:00',
    end: '2024-09-25T23:00',
    title: 'Layton',
    resource: 61,
    slot: 4,
  },
  {
    start: '2024-09-25T16:00',
    end: '2024-09-25T23:00',
    title: 'Gerry',
    resource: 73,
    slot: 4,
  },
  {
    start: '2024-09-25T16:00',
    end: '2024-09-25T23:00',
    title: 'Reg',
    resource: 81,
    slot: 4,
  },
  {
    start: '2024-09-25T16:00',
    end: '2024-09-25T23:00',
    title: 'Lou',
    resource: 83,
    slot: 4,
  },
  {
    start: '2024-09-25T16:00',
    end: '2024-09-25T23:00',
    title: 'Sierra',
    resource: 92,
    slot: 4,
  },
  {
    start: '2024-09-25T11:00',
    end: '2024-09-25T11:59',
    title: 'Derek',
    resource: 21,
    slot: 5,
  },
  {
    start: '2024-09-25T11:00',
    end: '2024-09-25T11:59',
    title: 'Natalie',
    resource: 43,
    slot: 5,
  },
  {
    start: '2024-09-25T11:00',
    end: '2024-09-25T11:59',
    title: 'Kaylin',
    resource: 44,
    slot: 5,
  },
  {
    start: '2024-09-25T11:00',
    end: '2024-09-25T11:59',
    title: 'Fred',
    resource: 71,
    slot: 5,
  }, // Showing partial data. Download full source.
];

const allSlots: MbscSlot[] = [
  {
    id: 1,
    name: 'Night',
    time: '2AM - 10AM',
  },
  {
    id: 2,
    name: 'Breakfast',
    time: '8AM - 12PM',
  },
  {
    id: 3,
    name: 'Lunch',
    time: '11AM - 3PM',
  },
  {
    id: 4,
    name: 'Dinner',
    time: '4PM - 11PM',
  },
  {
    id: 5,
    name: 'After hours',
    time: '11PM - 1AM',
  },
];

const views = [
  {
    text: 'Day',
    value: 'day',
  },
  {
    text: 'Week',
    value: 'week',
  },
];

export function ShiftScheduler() {
  const [shifts, setShifts] = useState<MbscCalendarEvent[]>(allShifts);
  const [mySlots, setSlots] = useState<MbscSlot[]>(allSlots);
  const [shiftTimes, setShiftTimes] = useState([
    {
      id: 1,
      name: 'Night',
      checked: true,
      disabled: false,
    },
    {
      id: 2,
      name: 'Breakfast',
      checked: true,
      disabled: false,
    },
    {
      id: 3,
      name: 'Lunch',
      checked: true,
      disabled: false,
    },
    {
      id: 4,
      name: 'Dinner',
      checked: true,
      disabled: false,
    },
    {
      id: 5,
      name: 'After hours',
      checked: true,
      disabled: false,
    },
  ]);

  const [selectedView, setView] = useState<string>('week');
  const myView = useMemo<MbscEventcalendarView>(
    () =>
      selectedView === 'day'
        ? {
            timeline: {
              type: 'day',
              eventList: true,
            },
          }
        : {
            timeline: {
              type: 'week',
              eventList: true,
              startDay: 1,
              endDay: 5,
            },
          },
    [selectedView],
  );

  const getEmployeeName = useCallback((event: MbscCalendarEvent) => {
    for (const item of myResources) {
      for (const employee of item.children) {
        if (employee.id === event.resource) {
          return employee.name.substr(0, employee.name.indexOf(' '));
        }
      }
    }
  }, []);

  const extendDefaultEvent = useCallback(
    (event: MbscNewEventData) => ({
      title: getEmployeeName(event),
    }),
    [getEmployeeName],
  );

  const formatMyDate = useCallback(
    (date: Date) => formatDate('YYYY-MM-DD', new Date(date)),
    [],
  );

  const getShiftsNrs = useCallback(
    (date: string, slotId: number) => {
      const shiftList: number[] = [];

      for (const shift of shifts) {
        // get slot id from resource id
        const resourceNr = +shift.resource.toString().charAt(0);
        if (
          shift.slot === slotId &&
          date === formatMyDate(new Date(shift.start as string))
        ) {
          shiftList[resourceNr - 1] = (shiftList[resourceNr - 1] || 0) + 1;
        }
      }
      return shiftList;
    },
    [shifts, formatMyDate],
  );

  const renderMyResource = (resource: MbscResource) => {
    const parent = resource.children;
    return (
      <div
        className={parent ? 'md-shift-resource' : ''}
        style={{ color: parent ? parent[0].color : '' }}
      >
        {parent && (
          <span className="md-shift-resource-icon">{resource.icon}</span>
        )}
        {resource.name}
      </div>
    );
  };

  const renderMySlot = (args: MbscSlotData) => {
    const slot = args.slot;
    const date = formatMyDate(args.date);
    const shiftList = getShiftsNrs(date, slot.id as number);
    let length = 0;

    return (
      <div className="md-shift-header">
        <div className="md-shift-name">
          {slot.name}
          <span className="md-shift-time">{slot.time}</span>
        </div>
        <div className={'md-shift-counts-' + date + '-' + slot.id}>
          {shiftList.length > 0 &&
            shiftList.map((shift: number, i: number) => {
              ++length;
              return (
                <Fragment key={i}>
                  <div className="md-shift-count">
                    <span className="md-shift-icon">{myResources[i].icon}</span>
                    <span
                      className={
                        'md-shift-nr md-shift-nr-' +
                        date +
                        '-' +
                        slot.id +
                        '-' +
                        (i + 1)
                      }
                    >
                      {shift}
                    </span>
                  </div>
                  {length === 4 && <br />}
                </Fragment>
              );
            })}
          {shiftList.length === 0 && (
            <div className="md-shift-count">{'\uD83D\uDE36'} empty...</div>
          )}
        </div>
      </div>
    );
  };

  const checkboxChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      const value = +ev.target.value;
      const checked = ev.target.checked;
      const filteredSlots: MbscSlot[] = [];
      let updatedTimes = shiftTimes.map((cs) =>
        cs.id === value ? { ...cs, checked } : cs,
      );

      for (const slot of allSlots) {
        if (updatedTimes.find((us) => us.id === slot.id && us.checked)) {
          filteredSlots.push(slot);
        }
      }

      if (filteredSlots.length === 1) {
        updatedTimes = updatedTimes.map((ut) =>
          ut.checked ? { ...ut, disabled: true } : ut,
        );
      } else {
        updatedTimes = updatedTimes.map((ut) => ({ ...ut, disabled: false }));
      }

      setSlots(filteredSlots);
      setShiftTimes(updatedTimes);
    },
    [shiftTimes],
  );

  const viewChange = useCallback((event: MbscSelectChangeEvent) => {
    setView(event.value);
  }, []);

  const renderMyHeader = () => (
    <>
      <CalendarNav />
      <div className="mbsc-flex mbsc-flex-1-0 mbsc-justify-content-end">
        {shiftTimes.map((cs) => (
          <Checkbox
            key={cs.id}
            value={cs.id}
            checked={cs.checked}
            disabled={cs.disabled}
            onChange={checkboxChange}
            theme="windows"
          >
            {cs.name}
          </Checkbox>
        ))}
      </div>
      <Select
        data={views}
        value={selectedView}
        onChange={viewChange}
        inputStyle="box"
      />
      <CalendarPrev />
      <CalendarToday />
      <CalendarNext />
    </>
  );

  const isDouble = useCallback(
    (event: MbscCalendarEvent, inst: Eventcalendar) => {
      const date = new Date(event.start as string).setHours(0);
      const events = inst.getEvents(new Date(date));
      const ev = events.find(
        (e) =>
          new Date(e.start as string).setHours(0) === date &&
          e.resource === event.resource &&
          e.slot === event.slot,
      );
      return ev;
    },
    [],
  );

  const handleCreateEvent = useCallback(
    (args: MbscEventCreateEvent, inst: Eventcalendar) => {
      if (isDouble(args.event, inst)) {
        return false;
      } else {
        setTimeout(() => {
          setShifts([...shifts, args.event]);
        });
      }
    },
    [shifts, isDouble],
  );

  const handleEventUpdate = useCallback(
    (args: MbscEventUpdateEvent, inst: Eventcalendar) => {
      const event = args.event;

      if (isDouble(event, inst)) {
        return false;
      } else {
        const newName = getEmployeeName(event);
        if (newName) {
          const index = shifts.findIndex((x) => x.id === event.id);
          const newShifts = [...shifts];
          newShifts[index].title = newName;
          setShifts(newShifts);
        }
      }
    },
    [shifts, getEmployeeName, isDouble],
  );

  const handleDeleteEvent = useCallback(
    (args: MbscEventDeletedEvent) => {
      setShifts(shifts.filter((item) => item.id !== args.event.id));
    },
    [shifts],
  );

  return (
    <Eventcalendar
      view={myView}
      data={shifts}
      resources={myResources}
      slots={mySlots}
      clickToCreate={true}
      dragToMove={true}
      extendDefaultEvent={extendDefaultEvent}
      renderResource={renderMyResource}
      renderSlot={renderMySlot}
      renderHeader={renderMyHeader}
      onEventUpdate={handleEventUpdate}
      onEventCreate={handleCreateEvent}
      onEventDeleted={handleDeleteEvent}
      cssClass="md-shift-management-calendar"
    />
  );
}
export default ShiftScheduler;
