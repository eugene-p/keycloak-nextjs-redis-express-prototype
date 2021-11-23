import { Feature, Position } from 'geojson';

export type featureProperties = {
    id?: string,
    name: string,
    description: string,
    type: 'truck' | 'other'
}

export const featurePropertiesDefaults:featureProperties = {
    name: '',
    description: '',
    type: 'truck'
}

export type featureStatus = {
    id?: string,
    speed: number,
    direction: number,
    timestamp: number
}

export const sleep = (ms: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

export const parceGeoJson = (str: string): Feature =>
    JSON.parse(str) as Feature

export const getFeaturePosition = (feature: Feature): Position =>
    feature.geometry.type === 'Point' ? feature.geometry.coordinates : []

export const getFeatureStatus =  (feature: Feature): featureStatus => {
    return {
        speed: feature.properties.speed,
        direction: feature.properties.direction,
        timestamp: (new Date()).getTime()
    }
}

export const getFeatureProperties = (feature:Feature):featureProperties => {
    return {
        ...featurePropertiesDefaults,
        name: feature.properties.name
    }
}