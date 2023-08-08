import React from 'react';
import { Calendar, CalendarProps } from 'primereact/calendar';

const AnttCalendar: React.FC<CalendarProps> = ({ ...rest }) => {
  return (
    <Calendar
      className="antt-calendar"
      mask="99/99/9999"
      dateFormat="dd/mm/yy"
      showButtonBar
      {...rest}
      autoZIndex={true}
      baseZIndex={99999}
    />
  );
};
export default AnttCalendar;
