import React, { useState , useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import StarRatings from 'react-star-ratings';
const config = require('../../../config.js');
import styled from 'styled-components';

const MapStars = styled.span`
  margin: 5px;
`;

const locations = [
  {
    name: "Location 1",
    location: {
      lat: 47.844151,
      lng: -122.220109
    },
  },
  {
    name: "Location 2",
    location: {
      lat: 47.69806,
      lng: -122.32703
    },
  },
  {
    name: "Location 3",
    location: {
      lat: 47.6572148,
      lng: -122.385458
    },
  },
  {
    name: "Location 4",
    location: {
      lat: 47.7245292663574,
      lng: -122.294776916504
    },
  },
  {
    name: "Location 5",
    location: {
      lat: 47.53109815129322,
      lng: -122.32351290165549
    },
  }
];

const MapContainer = ({searchResult}) => {

  const [ selected, setSelected ] = useState({});

  const [ currentPosition, setCurrentPosition ] = useState({});

  const success = (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    const pos = {
      lat: latitude,
      lng: longitude,
    }
    setCurrentPosition(pos);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  },[])

  const onSelect = item => {
    setSelected(item);
  }

  const mapStyles = {
    height: "500px",
    width: "60%"};

  const defaultCenter = {
    lat: 47.6062, lng: -122.3321
  }


  return (
     <LoadScript
       googleMapsApiKey={config.GOOGLE_TOKEN}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={9}
          center={currentPosition.lat ? currentPosition : defaultCenter}>
          {
            searchResult.map(item => {
              return (
              <Marker icon="https://img.icons8.com/office/30/000000/marker.png" key={item.name} position={{lat:item.coordinates.latitude, lng:item.coordinates.longitude}} onMouseOver={()=>onSelect(item)}
              />
              )
            })
          }
          {
            selected.coordinates ? {lat:selected.coordinates.latitude, lng:selected.coordinates.longitude}&&
            (
              <InfoWindow
              options={{maxWidth: 230}}
              position={{lat:selected.coordinates.latitude, lng:selected.coordinates.longitude}}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <div>
                <img src={selected.image_url} height="200" width="200"></img>
                <Card.Title>{selected.name}</Card.Title>
                <StarRatings
                  rating={selected.rating}
                  starRatedColor="#FE5F55"
                  numberOfStars={5}
                  name='rating'
                  starDimension= "20px"
                  starSpacing = "1px"
                />
                <MapStars>{selected.review_count}</MapStars>
              </div>
            </InfoWindow>
            )
          : null}
        </GoogleMap>
     </LoadScript>
  )
}

export default MapContainer;