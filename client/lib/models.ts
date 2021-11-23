export type Driver = {
    name: string
    , description?: string
}

export type VehicleState = {
    speed: number
    , direction: number
    , timestamp: Date
}

export type VehicleProperties = {
    id: string
    , name: string
    , type: string
    , description?: string
    , driver?: Driver
    , state: VehicleState
}
