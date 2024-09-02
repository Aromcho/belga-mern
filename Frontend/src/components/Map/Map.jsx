import React, { useState, useRef, useEffect } from 'react';
import * as ol from 'ol';
import { XYZ } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import { Tile as TileLayer } from 'ol/layer';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { FaMapMarkerAlt } from 'react-icons/fa';
import './Map.css';
import { normalStyle, hgihStyle } from './helpers';

export const Map = ({ center, zoom, marker, markers }) => {
  const [stMap, setMap] = useState(null);
  const mapElement = useRef(null);
  const [mapVisible, setMapVisible] = useState(false);

  const [vectorLayer] = useState(
    new VectorLayer({
      source: new VectorSource({}),
      style: [normalStyle],
      zIndex: 20,
    })
  );

  useEffect(() => {
    if (markers) {
      const highlighted = markers.find(item => !!item.high);
      vectorLayer.getSource()?.getFeatures().forEach(ft => {
        if (ft.getId() === highlighted?.id) {
          ft.setStyle(hgihStyle);
        } else {
          ft.setStyle(normalStyle);
        }
      });
    }
  }, [markers, vectorLayer]);

  useEffect(() => {
    if (center && stMap) {
      stMap.getView().setCenter(fromLonLat([center.lon, center.lat]));
    }
    if (zoom && stMap) {
      stMap.getView().setZoom(zoom);
    }
  }, [center, zoom, stMap]);

  useEffect(() => {
    if (mapVisible && mapElement.current) {
      const initialMap = new ol.Map({
        layers: [
          new TileLayer({
            source: new XYZ({
              url: `https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png`,
            }),
            preload: Infinity,
            zIndex: 2,
            maxZoom: 28,
          }),
          vectorLayer,
        ],
        view: new ol.View({
          center: center ? fromLonLat([center.lon, center.lat]) : [0, 0],
          zoom: zoom ?? 4,
          maxZoom: 19,
        }),
        target: mapElement.current,
      });

      setMap(initialMap);

      if (marker) {
        const iconFeature = new ol.Feature({
          geometry: new Point(fromLonLat([marker.lon, marker.lat])),
        });
        vectorLayer.getSource()?.addFeature(iconFeature);
      }

      if (markers) {
        markers.forEach(item => {
          const iconFeature = new ol.Feature({
            geometry: new Point(fromLonLat([item.lon, item.lat])),
            id: item.id,
          });
          iconFeature.setId(item.id);
          vectorLayer.getSource()?.addFeature(iconFeature);
        });
      }

      return () => {
        initialMap.setTarget(undefined);
      };
    }
  }, [mapVisible, center, zoom, marker, markers, vectorLayer]);

  const handleToggleMap = () => {
    setMapVisible(true);
  };

  return (
    <div className="map-container">
      {!mapVisible && (
        <div className="placeholder-image" onClick={handleToggleMap}>
          <div className="map-icon">
            <FaMapMarkerAlt size={32} />
          </div>
        </div>
      )}

      {mapVisible && <div className="map-wrapper" ref={mapElement} />}
    </div>
  );
};

export default Map;
