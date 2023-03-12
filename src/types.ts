export type Command = {
    run: () => ({any?: any})
};

export type Commands = {
    [name: string]: Command
}