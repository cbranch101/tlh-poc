import React from 'react'
import {
    StatefulCalendar,
    StyledDay,
    StyledRoot,
    Datepicker,
} from 'baseui/datepicker'
import { useStyletron } from 'baseui'

const DayVariations = () => {
    const [css, theme] = useStyletron()
    const Day = ({ children, ...props }) => {
        return (
            <div className={css({ marginRight: '20px' })}>
                <StyledDay $theme={theme} {...props}>
                    {children}
                </StyledDay>
            </div>
        )
    }
    return (
        <StyledRoot>
            <div
                className={css({
                    display: 'flex',
                    justifyContent: 'space-evenly',
                })}
            >
                <Day $selected={true}>1</Day>
                <Day $selected={true} $isFocusVisible={true}>
                    2
                </Day>
            </div>
        </StyledRoot>
    )
}

const sharedCalendarColors = [
    'calendarForeground',
    'calendarBackground',
    'calendarHeaderForeground',
    'calendarHeaderBackground',
    'mono200',
    'mono400',
]

const variations = [
    {
        span: 4,
        colors: [
            ...sharedCalendarColors,
            'calendarDayForegroundPseudoSelected',
        ],
        render: () => {
            return <StatefulCalendar />
        },
    },
    {
        span: 4,
        colors: [
            ...sharedCalendarColors,
            'calendarHeaderForegroundDisabled',
            'calendarDayBackgroundSelectedHighlighted',
            'calendarDayForegroundSelectedHighlighted',
            'calendarForegroundDisabled',
        ],
        render: () => {
            return (
                <StatefulCalendar
                    initialState={{ value: new Date() }}
                    minDate={new Date()}
                    maxDate={new Date()}
                />
            )
        },
    },
    {
        span: 4,
        colors: [
            ...sharedCalendarColors,
            'mono400',
            'calendarDayForegroundPseudoSelected',
            'calendarDayForegroundSelectedHighlighted',
            'calendarDayBackgroundSelectedHighlighted',
            'calendarDayBackgroundSelected',
        ],
        render: () => {
            return (
                <StatefulCalendar
                    range
                    initialState={{
                        value: [
                            new Date(new Date().setDate(15)),
                            new Date(new Date().setDate(18)),
                        ],
                    }}
                />
            )
        },
    },
    {
        span: 2,
        colors: [
            'calendarDayForegroundSelected',
            'calendarDayBackgroundSelected',
            'accent',
        ],
        render: () => {
            return <DayVariations />
        },
    },
    {
        span: 3,
        colors: [
            'calendarDayForegroundSelected',
            'calendarDayBackgroundSelected',
            'accent',
        ],
        render: () => {
            return <Datepicker value={new Date()} />
        },
    },
]

export default variations.map((variation) => ({
    ...variation,
    component: 'DatePicker',
}))
