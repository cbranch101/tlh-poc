import { wait } from '@testing-library/react'
const getMockedHandler = (name) => {
    let callCount = 0
    const argsFromCalls = []

    const handler = (...args) => {
        argsFromCalls.push(args)
    }

    const waitFor = async () => {
        let foundArgs
        await wait(() => {
            const args = argsFromCalls[callCount]
            if (args === undefined) {
                throw new Error(`${name} was never called ${callCount} times`)
            }
            if (args !== undefined) {
                foundArgs = args
            }
        })
        callCount++
        return foundArgs
    }

    const confirmNotCalled = async () => {
        await wait(
            () => {
                const args = argsFromCalls[0]
                if (args) {
                    throw new Error(`${name} was called when it shouldn't be`)
                }
            },
            { timeout: 500 },
        )
    }

    return {
        handler,
        confirmNotCalled,
        waitFor,
    }
}

export default getMockedHandler
