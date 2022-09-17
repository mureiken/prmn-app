import React from 'react';
import { Source, Layer } from 'react-map-gl';
import { LAYER_ID } from '../../../../../constants';

const Polygons = ({ data, paint, data_id }) => {
  return (   
    <Source id={data_id} type="geojson" data={data}>
      <Layer id="adm1" type="fill" paint={paint} />
    </Source>
  );
};

export default Polygons;