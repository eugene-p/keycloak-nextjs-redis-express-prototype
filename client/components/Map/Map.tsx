import React, { useState, useEffect, FC, useCallback} from 'react';

// openlayers
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Geometry from 'ol/geom/Geometry';
import GeoJSON from 'ol/format/GeoJSON';
import Style from 'ol/style/Style';
import TextStyle from 'ol/style/Text';
import Fill from 'ol/style/Fill';
import Icon from 'ol/style/Icon';
import RenderFeature from 'ol/render/Feature';
import { Feature } from 'ol';

import {getVehicalesString, fetchVehicles, getLoading} from '@slice/Vehicales'
import { useAppDispatch, useAppSelector as useSelector } from '@state/hooks'

const getFeatureStyle = (feature: RenderFeature | Feature<Geometry>): Style => {
  const title = `${feature.getProperties().name} by ${feature.getProperties().driver.name}`,
    rotation = feature.getProperties().state.direction * Math.PI/180

    return new Style({
      image: new Icon({
        src: '/img/arrow-up.svg'
        , rotation: rotation
      })
      , text: new TextStyle({
        text: title
        , fill: new Fill({color: '#fff'})
        , backgroundFill: new Fill({color: '#000'})
        , offsetY: 20
      })
    })
}

const MapWrapper:FC = () => {
  const dispatch = useAppDispatch()
  const [map, setMap] = useState<Map>()
  const [featureLayer, setFeatureLayer] = useState<VectorLayer<VectorSource<Geometry>>>()

  const cars = useSelector(getVehicalesString);
  const loading = useSelector(getLoading);

  // Loading vehicle data
  useEffect(() => {
    const timer=setInterval(() => {
      if (!loading) {
        dispatch(fetchVehicles())
      }
    }, 1000)
    return () => clearInterval(timer);
  }, [])

  // Updating vegicle layer state
  useEffect(() => {
    if (cars && cars != '') {
      const format = new GeoJSON({
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
      })
      featureLayer?.setSource(
        new VectorSource({
          features: format.readFeatures(cars)
        })
      )

      if (featureLayer && featureLayer.getSource()) {
        map?.getView().fit(featureLayer.getSource().getExtent(), {
          maxZoom: 16
        })
      }
    }
  }, [cars])

  // Setting up the map
  useEffect( () => {
    const initalFeaturesLayer = new VectorLayer({
      source: new VectorSource()
     , style: getFeatureStyle
      , visible: true
    })

    const initialMap = new Map({
      target: "map-container",
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        initalFeaturesLayer
      ],
      view: new View({
        center: fromLonLat([-123.478572, 48.469725]),
        zoom: 15
      }),
      controls: []
    })

    setMap(initialMap)
    setFeatureLayer(initalFeaturesLayer)
  },[])

  return (
    <div id="map-container" style={{height:'80vh'}}></div>
  )
}

export default MapWrapper