import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Map as ReactMapGL } from 'react-map-gl';
import { NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { CIRCLE_OPACITY, LAYER_ID, COLORS, MAX_RADIUS, MIN_RADIUS } from '../../../../constants';
import Circles from './Circles/index'
import Polygons from './Polygons/index'
import Modal from './Modal';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const MapLegendWrapper = styled(Box)({
  color: 'darkslategray',
  backgroundColor: 'transparent',
  padding: 8,
  borderRadius: 4,
  width: '25%',
  //zIndex: '999 !important',
  position: 'absolute', 
  left: 0
});

const DroughtLegend = styled(Box)({
  color: 'darkslategray',
  backgroundColor: '#f7941d',
  padding: 4,
  borderRadius: 3,
  width: '25%',

});

const ConflictLegend = styled(Box)({
  color: 'darkslategray',
  backgroundColor: '#e7646a',
  padding: 4,
  borderRadius: 3,
  width: '35%',

});

const FloodLegend = styled(Box)({
  color: 'darkslategray',
  backgroundColor: '#c974a2',
  padding: 4,
  borderRadius: 3,
  width: '25%',

});

const OtherLegend = styled(Box)({
  color: 'darkslategray',
  backgroundColor: '#a07b5e',
  padding: 4,
  borderRadius: 3,
  width: '25%',

});



const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN; // Set your mapbox token here

function Map(props) {

  const [state, setState] = useState({
    messageClass: 'visible',
    mapStyle: 'mapbox://styles/unhcr/ckvl4xy2mj45z15mpkq6w2nv8',
    popupInfo: null,
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    isOpen: false,

  });

  const [admRegions, setAdmRegions] = useState(null);

  const mapRef = useRef(null);
  const myMapRef = useRef(null);

  useEffect(() => {

    const handleResize = () => {
      setState((prevState) => {
        return {
          ...prevState,
          width: (mapRef && mapRef.current.offsetWidth) || 0,
          height: (mapRef && mapRef.current.offsetHeight) || 0,
        };
      });
    };

    if (mapRef.current) {
      setState((prevState) => {
        return {
          ...prevState,
          width: (mapRef && mapRef.current.offsetWidth) || 0,
          height: (mapRef && mapRef.current.offsetHeight) || 0,
        };
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, [mapRef]);


  const handleOpen = useCallback(event => {
    const {
      features,
    } = event;
    //const hoveredFeature = features && features[0];
    const hoveredFeature = features && features.find((f) => f.layer.id === LAYER_ID);
    console.log("id: ", hoveredFeature.layer.id);

    // prettier-ignore
    //setHoverInfo(hoveredFeature && {feature: hoveredFeature, x, y});
    setState((prevState) => ({ ...prevState, popupInfo: hoveredFeature, isOpen: true }));

    myMapRef.current.setFeatureState({ source: hoveredFeature.source, id: hoveredFeature.layer.id }, { hover: true });
  }, []);

  const handleClose = () => {
    setState((prevState) => {
      return {
        ...prevState,
        isOpen: false,
        popupInfo: null
      };
    });
  };

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/unhcr/dataviz-somalia-prmn/master/data/Som_Admbnda_Adm1_UNDP.json'
    )
      .then(resp => resp.json())
      .then(json => setAdmRegions(json))
      .catch(err => console.error('Could not load data', err)); // eslint-disable-line
  }, []);

  const onHover = (event) => {
    const {
      features,
    } = event;
    const hoveredFeature = features && features.find((f) => f.layer.id === LAYER_ID);
    myMapRef.current.setFeatureState({ source: hoveredFeature.source, id: hoveredFeature.layer.id }, { hover: true });
  };

   const _onMouseEnter = useCallback(event => {
    const {
      features,
    } = event;
    //const hoveredFeature = features && features[0];
    const hoveredFeature = features && features.find((f) => f.layer.id === LAYER_ID);
    myMapRef.current.setFeatureState({ source: hoveredFeature.source, id: hoveredFeature.layer.id }, { hover: true });
  }, []);

  const _onMouseLeave = useCallback((event) => {
    const {
      features,
    } = event;
    const hoveredFeature = features && features.find((f) => f.layer.id === LAYER_ID);
    myMapRef.current.setFeatureState({ source: hoveredFeature.source, id: hoveredFeature.layer.id }, { hover: false });
  }, []);



  let min = Infinity, max = -min;  
   props.data.geojson?.features.map((feature) => {
    const allPeople = feature.properties['AllPeople'];
    max = Math.max(max, allPeople);
    // max = allPeople.reduce(function(a, b){
    //   return a + b;
    // }, 0);
    
    return max;
  }) 


  const _onViewportChange = (viewport) =>
    setState((prevState) => {
      return {
        ...prevState,
        viewport,
      };
  });
  


return (
  <div ref={mapRef}>
    <ReactMapGL
        ref={ref => myMapRef.current = ref && ref.getMap()}
        initialViewState={{
          latitude: 5.1521,
          longitude: 46.1996,
          zoom: 5,
        }}
        minZoom={4}
        maxZoom={15}
        doubleClickZoom={true}
        scrollZoom={true}
        onViewportChange={_onViewportChange}
        dragRotate={false}
        onClick={handleOpen}
        style={{width: "100%", height: 763}}
        mapStyle="mapbox://styles/unhcr/ckvl4xy2mj45z15mpkq6w2nv8"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={['currentSettlements']}
        onHover={onHover}
        onMouseEnter={_onMouseEnter}
        onMouseLeave={_onMouseLeave}
    >
      <Polygons
          data={admRegions}
          paint={{
            'fill-opacity': 0.1,
            'fill-color': COLORS.blue,
          }}
          data_id="adm1Regions"
        />
      <Circles
          data={props.data.geojson}
          paint={{
            'circle-radius': {
              property: 'AllPeople',
              stops: [
                [0, MIN_RADIUS],
                [max, MAX_RADIUS],
              ],
            },
            'circle-opacity': CIRCLE_OPACITY,
            'circle-color': [
              'match',
              ['get', 'Category'],
              'Conflict/Insecurity',
              '#e7646a',
              'Drought',
              '#f7941d',
              'Flood',
              '#a07b5e',
              'Other',
              '#c974a2',
              /* other */ "#ccc"
              ]
          }}
          data_id="currentSettlements"
      />
      <NavigationControl />
    <MapLegendWrapper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          p: 1,
          m: 1,
        }}
      >
        <ConflictLegend>Conflict/Insecurity</ConflictLegend>
        <DroughtLegend>Drought</DroughtLegend>
        <FloodLegend>Flood</FloodLegend>
        <OtherLegend>Other</OtherLegend>
      </Box>
    </MapLegendWrapper>
  </ReactMapGL>
  {state.popupInfo && <Modal {...state} handleClose={handleClose} />}
  </div>
)}

export default Map

