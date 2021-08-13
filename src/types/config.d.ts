interface Config {
    prefix: string,
    allowedCommandChannel: {
        obsninja: string[]
    },
    allowedCommandRole: {
        obsninja: string[]
    },
    token: string,
    ownerId: string,
    obsninja: {
        room: string,
        hash: string,
        password: string
    }
}