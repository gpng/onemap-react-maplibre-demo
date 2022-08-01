import type { NextPage } from "next";
import maplibregl from "maplibre-gl";
import React, { useRef } from "react";
import ReactMapGL, { Layer, MapRef, Marker, Source } from "react-map-gl";

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
    <ReactMapGL
      ref={mapRef}
      mapLib={maplibregl}
      maxBounds={[103.596, 1.1443, 104.1, 1.4835]}
      mapStyle={{
        // https://maps-json.onemap.sg/Grey.json
        version: 8,
        name: "Grey",
        sources: {
          Grey: {
            type: "raster",
            tiles: [
              "https://maps-a.onemap.sg/v3/Grey_HD/{z}/{x}/{y}.png?fresh=true",
              "https://maps-b.onemap.sg/v3/Grey_HD/{z}/{x}/{y}.png?fresh=true",
              "https://maps-c.onemap.sg/v3/Grey_HD/{z}/{x}/{y}.png?fresh=true",
            ],
            tileSize: 128,
            bounds: [103.596, 1.1443, 104.4309, 1.4835],
          },
        },
        layers: [
          {
            id: "Grey",
            type: "raster",
            source: "Grey",
          },
        ],
      }}
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
    </ReactMapGL>
  );
};

export default IndexPage;
