import React, { Fragment } from 'react'
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalButton,
    SIZE,
    ROLE,
} from 'baseui/modal'
import { Button, KIND as ButtonKind } from 'baseui/button'

const sharedColors = []

const DemoModal = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    return (
        <Fragment>
            <Button onClick={() => setIsOpen(true)}>Show Modal</Button>
            <Modal
                onClose={() => setIsOpen(false)}
                closeable
                isOpen={isOpen}
                animate
                autoFocus //eslint-disable-line
                size={SIZE.default}
                role={ROLE.dialog}
            >
                <ModalHeader>Hello world</ModalHeader>
                <ModalBody>
                    Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla
                    ornare faucibus ex, non facilisis nisl. Maecenas aliquet
                    mauris ut tempus.
                </ModalBody>
                <ModalFooter>
                    <ModalButton kind={ButtonKind.tertiary}>Cancel</ModalButton>
                    <ModalButton>Okay</ModalButton>
                </ModalFooter>
            </Modal>
        </Fragment>
    )
}

const variations = [
    {
        span: 3,
        colors: [
            ...sharedColors,
            'backgroundPrimary',
            'modalCloseColor',
            'modalCloseColorHover',
            'accent',
            'mono400',
        ],
        render: () => {
            return <DemoModal />
        },
    },
]

export default variations.map((variation) => ({
    ...variation,
    component: 'Modal',
}))
