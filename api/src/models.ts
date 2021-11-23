import {Feature, FeatureCollection, Point} from 'geojson'

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

export interface VehicleFeature extends Feature {
    properties: VehicleProperties,
    geometry: Point
}

export interface VehicleFeatureCollection extends FeatureCollection {
    features: VehicleFeature[]
}