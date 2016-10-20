const SECONDS = 1000
const MINUTES = 60 * SECONDS

const PRESETS = [
    {
        total: 30 * MINUTES,
        terminateCallback: context => {
            context.sound.playTwice()
            context.onTerminate()
        },
        notifications: {
            [15 * MINUTES]: context => context.sound.play(),
            [20 * MINUTES]: context => context.sound.playTwice(),
        },
    },
    {
        total: 15 * MINUTES,
        terminateCallback: context => {
            context.sound.playTwice()
            context.onTerminate()
        },
        notifications: {
            [10 * MINUTES]: context => context.sound.play(),
        },
    },
    {
        total: 10 * MINUTES,
        terminateCallback: context => {
            context.sound.playTwice()
            context.onTerminate()
        },
        notifications: {
            [7 * MINUTES]: context => context.sound.play(),
        },
    },
    {
        total: 5 * MINUTES,
        terminateCallback: context => {
            context.sound.playTwice()
            context.onTerminate()
        },
        notifications: {
            [4 * MINUTES]: context => context.sound.play(),
        },
    },
]

Object.freeze(PRESETS)

export default PRESETS
