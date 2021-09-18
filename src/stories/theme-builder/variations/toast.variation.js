import React from 'react'
import { Toast } from 'baseui/toast'
import { Notification } from 'baseui/notification'

const notificationVariations = [
    {
        span: 3,
        colors: [
            'accent',
            'notificationInfoBackground',
            'notificationInfoBorder',
            'notificationInfoText',
        ],
        render: () => {
            return <Notification kind="info">Info</Notification>
        },
    },
    {
        span: 3,
        colors: [
            'accent',
            'notificationPositiveBackground',
            'notificationPositiveBorder',
            'notificationPositiveText',
        ],
        render: () => {
            return <Notification kind="positive">Positive</Notification>
        },
    },
    {
        span: 3,
        colors: [
            'accent',
            'notificationNegativeBackground',
            'notificationNegativeBorder',
            'notificationNegativeText',
        ],
        render: () => {
            return <Notification kind="negative">Negative</Notification>
        },
    },
    {
        span: 3,
        colors: [
            'accent',
            'notificationWarningBackground',
            'notificationWarningBorder',
            'notificationWarningText',
        ],
        render: () => {
            return <Notification kind="warning">Warning</Notification>
        },
    },
]

const sharedToastColors = ['toastText', 'accent']

const toastVariations = [
    {
        span: 3,
        colors: [...sharedToastColors, 'toastInfoBackground'],
        render: () => {
            return <Toast kind="info">Info</Toast>
        },
    },
    {
        span: 3,
        colors: [...sharedToastColors, 'toastInfoBackground'],
        render: () => {
            return (
                <Toast kind="info">
                    Long Text That Triggers Multiple Lines To Show
                </Toast>
            )
        },
    },
    {
        span: 3,
        colors: [...sharedToastColors, 'toastPositiveBackground'],
        render: () => {
            return <Toast kind="positive">Positive</Toast>
        },
    },
    {
        span: 3,
        colors: [...sharedToastColors, 'toastNegativeBackground'],
        render: () => {
            return <Toast kind="negative">Negative</Toast>
        },
    },
    {
        span: 3,
        colors: [...sharedToastColors, 'toastWarningBackground'],
        render: () => {
            return <Toast kind="warning">Warning</Toast>
        },
    },
]

export default [
    ...notificationVariations.map((variation) => ({
        ...variation,
        component: 'Notification',
    })),
    ...toastVariations.map((variation) => ({
        ...variation,
        component: 'Toast',
    })),
]
