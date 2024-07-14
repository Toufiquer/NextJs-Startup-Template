export interface IProcess {
    status: boolean,
    processFor: string | null,
}

export interface IError {
    status: boolean,
    errFor: string | null,
    errMsg: string | null,
}

type weekday = {
    0: string | null,
    1: string | null,
    2: string | null,
    3: string | null,
    4: string | null,
    5: string | null,
    6: string | null,
}
export interface IOverviewTop {
    timetable: weekday,
    deliveryStatus: boolean,
    deliveryDistance: weekday,
    deliveryTime: weekday
}
