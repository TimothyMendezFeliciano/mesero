import React, { useState } from 'react';
import moment from 'moment';
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from 'react-calendar-timeline/lib';
import generateFakeData from './generate-fake-data';
import 'react-calendar-timeline/lib/Timeline.css';

const keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start',
  itemTimeEndKey: 'end',
  groupLabelKey: 'title',
};

export default function ReactCalendarTimeline() {
  const { groups, items } = generateFakeData(150);
  const defaultTimeStart = moment().startOf('day').toDate();
  const defaultTimeEnd = moment().startOf('day').add(1, 'day').toDate();

  const [state] = useState({
    groups,
    items,
    defaultTimeStart,
    defaultTimeEnd,
  });

  return (
    <Timeline
      groups={state.groups}
      items={state.items}
      keys={keys}
      sidebarContent={<div>Above The Left</div>}
      itemsSorted
      itemTouchSendsClick={true}
      stackItems
      itemHeightRatio={0.75}
      showCursorLine
      canMove={true}
      canResize={true}
      defaultTimeStart={state.defaultTimeStart}
      defaultTimeEnd={state.defaultTimeEnd}
    >
      <TimelineHeaders className="sticky">
        <SidebarHeader>
          {({ getRootProps }) => {
            return <div {...getRootProps()}>Employees</div>;
          }}
        </SidebarHeader>
        <DateHeader unit="primaryHeader" />
        <DateHeader />
      </TimelineHeaders>
    </Timeline>
  );
}
