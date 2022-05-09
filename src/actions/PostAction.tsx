export const enum HEADER_TYPE {
    INIT,
    SEARCH
}
export const HEADER = 'HEADER';
export const header = (value: HEADER_TYPE) => {
    return {
        type: HEADER,
        value: value
    }
}

export const SEARCH = 'SEARCH';
export const search = (value: string) => {
    return {
        type: SEARCH,
        value: value
    }
}

export const enum WRITE_ACTION_TYPE {
    INIT,
    WRITE
}
export const WRITE_ACTION = 'WRITE_ACTION';
export const write_action = (value: WRITE_ACTION_TYPE) => {
    return {
        type: WRITE_ACTION,
        value: value
    }
}