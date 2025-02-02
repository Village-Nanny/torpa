import React from 'react';
import { cn } from '@/src/lib/utils';
import { Select } from './select-field';

interface DatePickerProps {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  error?: string;
  className?: string;
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  ({ label, value, onChange, error, className }, ref) => {
    const [, setFocusedDay] = React.useState(false);
    const [, setFocusedMonth] = React.useState(false);
    const [, setFocusedYear] = React.useState(false);

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    const selectedDate = value || new Date();
    const [selectedDay, setSelectedDay] = React.useState(value ? selectedDate.getDate() : '');
    const [selectedMonth, setSelectedMonth] = React.useState(value ? selectedDate.getMonth() : '');
    const [selectedYear, setSelectedYear] = React.useState(value ? selectedDate.getFullYear() : '');

    const handleDateChange = (type: 'day' | 'month' | 'year', value: number | string) => {
      const newDay = type === 'day' ? value : selectedDay;
      const newMonth = type === 'month' ? value : selectedMonth;
      const newYear = type === 'year' ? value : selectedYear;

      if (newDay && newMonth !== '' && newYear) {
        const date = new Date(+newYear, +newMonth, +newDay);
        onChange(date);
      } else {
        onChange(null);
      }

      if (type === 'day') setSelectedDay(value);
      if (type === 'month') setSelectedMonth(value);
      if (type === 'year') setSelectedYear(value);
    };

    const monthOptions = months.map((month, index) => ({
      value: index,
      label: month.substring(0, 3),
    }));

    const dayOptions = days.map(day => ({ value: day, label: day.toString() }));
    const yearOptions = years.map(year => ({ value: year, label: year.toString() }));

    return (
      <div ref={ref} className={cn('relative w-full', className)}>
        <div className="space-y-1">
          <span className={cn('text-sm transition-colors', error ? 'text-red-500' : 'text-gray-600')}>{label}</span>

          <div className="flex items-center gap-2">
            <Select
              options={dayOptions}
              value={selectedDay}
              onChange={value => handleDateChange('day', value)}
              onFocus={() => setFocusedDay(true)}
              onBlur={() => setFocusedDay(false)}
              placeholder="Day"
              error={!!error}
              className="flex-1"
            />

            <Select
              options={monthOptions}
              value={selectedMonth}
              onChange={value => handleDateChange('month', value)}
              onFocus={() => setFocusedMonth(true)}
              onBlur={() => setFocusedMonth(false)}
              placeholder="Month"
              error={!!error}
              className="flex-1"
            />

            <Select
              options={yearOptions}
              value={selectedYear}
              onChange={value => handleDateChange('year', value)}
              onFocus={() => setFocusedYear(true)}
              onBlur={() => setFocusedYear(false)}
              placeholder="Year"
              error={!!error}
              className="flex-1"
            />
          </div>

          {error && <p className="mt-1.5 text-xs text-red-500 pl-1">{error}</p>}
        </div>
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';

export { DatePicker };
