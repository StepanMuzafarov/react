import type { JSX } from 'react';
import { useEffect, useRef, useMemo } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { FullOffer } from '../../types/offer';

const defaultIcon = leaflet.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const activeIcon = leaflet.icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

interface Props {
  offers: FullOffer[];
  activeOfferId?: string;
  type?: 'cities' | 'offer';
}

function Map({ offers, activeOfferId, type = 'cities' }: Props): JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<leaflet.Map | null>(null);
  const markerLayer = useRef<leaflet.LayerGroup | null>(null);

  const firstOffer = offers[0];
  const cityLat = firstOffer?.city?.location?.latitude;
  const cityLng = firstOffer?.city?.location?.longitude;
  const cityZoom = firstOffer?.city?.location?.zoom;

  const initialMapData = useMemo(() => {
    if (offers.length === 0) return null;
    
    return {
      center: [cityLat, cityLng] as [number, number],
      zoom: type === 'offer' ? 12 : cityZoom,
    };
  }, [offers.length, cityLat, cityLng, cityZoom, type]);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current && initialMapData) {
      const map = leaflet.map(mapRef.current, {
        center: initialMapData.center,
        zoom: initialMapData.zoom,
        scrollWheelZoom: false,
      });

      leaflet
        .tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        })
        .addTo(map);

      const layer = leaflet.layerGroup().addTo(map);
      
      mapInstance.current = map;
      markerLayer.current = layer;
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
        markerLayer.current = null;
      }
    };
  }, [initialMapData]);

  useEffect(() => {
    if (!markerLayer.current || offers.length === 0) return;

    markerLayer.current.clearLayers();

    if (firstOffer && mapInstance.current) {
      mapInstance.current.setView(
        [firstOffer.city.location.latitude, firstOffer.city.location.longitude],
        type === 'offer' ? 12 : firstOffer.city.location.zoom
      );
    }

    offers.forEach((offer) => {
      leaflet
        .marker([offer.location.latitude, offer.location.longitude], {
          icon: offer.id === activeOfferId ? activeIcon : defaultIcon,
        })
        .addTo(markerLayer.current!);
    });
  }, [offers, activeOfferId, type, firstOffer]);

  return <div ref={mapRef} style={{ height: '100%', width: '100%' }} />;
}

export default Map;