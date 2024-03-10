import type { NextPage } from "next";
import { useRef } from "react";
import Map, { Layer, MapRef, Marker, Source } from "react-map-gl/maplibre";

const locations = [
  {
    latitude: 1.4332513,
    longitude: 103.7874458,
    name: "Woodlands",
  },
  {
    latitude: 1.3030376,
    longitude: 103.8226847,
    name: "Orchard",
  },
];

const IndexPage: NextPage = () => {
  const mapRef = useRef<MapRef>(null);

  const flyTo = (coordinates: [number, number]): void => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    map.flyTo({
      center: coordinates,
      essential: true,
      zoom: 14,
    });
  };

  return (
    <Map
      ref={mapRef}
      maxBounds={[103.596, 1.1443, 104.1, 1.4835]}
      mapStyle="https://www.onemap.gov.sg/maps/json/raster/mbstyle/Grey.json"
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Source
        id="line-source"
        type="geojson"
        data={{
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              ...locations.map((location) => [
                location.longitude,
                location.latitude,
              ]),
            ],
          },
        }}
      >
        <Layer
          id="line-layer"
          type="line"
          layout={{
            "line-join": "round",
            "line-cap": "round",
          }}
          paint={{
            "line-color": "green",
            "line-width": 8,
          }}
        />
      </Source>
      {locations.map((location) => (
        <Marker
          key={location.name}
          latitude={location.latitude}
          longitude={location.longitude}
        >
          <div
            className="mrt-marker"
            onClick={() => flyTo([location.longitude, location.latitude])}
          >
            {location.name}
            <style jsx>{`
              .mrt-marker {
                background: red;
                color: white;
                padding: 4px;
              }
            `}</style>
          </div>
        </Marker>
      ))}
    </Map>
  );
};

export default IndexPage;
