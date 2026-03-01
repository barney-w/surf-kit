import {
  CalendarDate,
  createCalendar,
  type DateValue,
  getLocalTimeZone,
  today,
} from '@internationalized/date'
import { useRef } from 'react'
import { useButton, useCalendar, useCalendarCell, useCalendarGrid, useLocale } from 'react-aria'
import { useCalendarState } from 'react-stately'
import { twMerge } from 'tailwind-merge'

type CalendarProps = {
  value?: Date
  defaultValue?: Date
  onChange?: (date: Date) => void
  minDate?: Date
  maxDate?: Date
  isDisabled?: boolean
  className?: string
}

function toCalendarDate(date: Date): CalendarDate {
  return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
}

function toJSDate(calDate: CalendarDate): Date {
  return new Date(calDate.year, calDate.month - 1, calDate.day)
}

function CalendarCell({
  state,
  date,
}: {
  state: ReturnType<typeof useCalendarState>
  date: CalendarDate
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { cellProps, buttonProps, isSelected, isDisabled, isOutsideVisibleRange, formattedDate } =
    useCalendarCell({ date }, state, ref)

  const todayDate = today(getLocalTimeZone())
  const isToday = date.compare(todayDate) === 0

  return (
    <td {...cellProps} className="p-0">
      <div
        {...buttonProps}
        ref={ref}
        hidden={isOutsideVisibleRange}
        className={twMerge(
          'flex items-center justify-center w-9 h-9 text-sm rounded-full outline-none cursor-default',
          'focus-visible:ring-2 focus-visible:ring-accent/50',
          isSelected && 'bg-accent text-white',
          !isSelected && !isDisabled && 'hover:bg-surface-2',
          isDisabled && 'text-text-tertiary opacity-50',
          isToday && !isSelected && 'ring-1 ring-accent',
        )}
      >
        {formattedDate}
      </div>
    </td>
  )
}

function CalendarGrid({ state }: { state: ReturnType<typeof useCalendarState> }) {
  const { gridProps, headerProps, weekDays, weeksInMonth } = useCalendarGrid({}, state)

  return (
    <table {...gridProps} className="w-full border-collapse">
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, i) => (
            <th key={i} className="text-xs font-medium text-text-secondary p-1 text-center">
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: weeksInMonth }, (_, weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? <CalendarCell key={i} state={state} date={date} /> : <td key={i} />,
              )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function Calendar({
  value,
  defaultValue,
  onChange,
  minDate,
  maxDate,
  isDisabled,
  className,
}: CalendarProps) {
  const { locale } = useLocale()

  const calendarProps: Record<string, unknown> = { isDisabled }

  if (value !== undefined) {
    calendarProps.value = toCalendarDate(value)
  }
  if (defaultValue !== undefined) {
    calendarProps.defaultValue = toCalendarDate(defaultValue)
  }
  if (onChange) {
    calendarProps.onChange = (date: DateValue) => {
      onChange(toJSDate(date as CalendarDate))
    }
  }
  if (minDate !== undefined) {
    calendarProps.minValue = toCalendarDate(minDate)
  }
  if (maxDate !== undefined) {
    calendarProps.maxValue = toCalendarDate(maxDate)
  }

  const state = useCalendarState({
    ...calendarProps,
    locale,
    createCalendar,
  })

  const {
    calendarProps: ariaCalendarProps,
    prevButtonProps,
    nextButtonProps,
    title,
  } = useCalendar(calendarProps, state)

  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const { buttonProps: prevBtnProps } = useButton(prevButtonProps, prevRef)
  const { buttonProps: nextBtnProps } = useButton(nextButtonProps, nextRef)

  return (
    <div
      {...ariaCalendarProps}
      className={twMerge('inline-block p-4 bg-surface-1 rounded-lg', className)}
    >
      <div className="flex items-center justify-between mb-4">
        <button
          {...prevBtnProps}
          ref={prevRef}
          className={twMerge(
            'p-1.5 rounded-md text-text-secondary hover:bg-surface-2 transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50',
          )}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h2 className="text-sm font-semibold text-text-primary">{title}</h2>
        <button
          {...nextBtnProps}
          ref={nextRef}
          className={twMerge(
            'p-1.5 rounded-md text-text-secondary hover:bg-surface-2 transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50',
          )}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <CalendarGrid state={state} />
    </div>
  )
}

export { Calendar }
export type { CalendarProps }
