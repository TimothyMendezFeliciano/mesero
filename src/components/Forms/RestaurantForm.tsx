import { useForm } from 'react-hook-form';
import { IRestaurant, restaurantSchema } from '../../common/restaurant/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useRef, useState } from 'react';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Script from 'next/script';
// "@ts-expect-error"
import { Library } from '@googlemaps/js-api-loader/src';

const libraries: Library[] = ['places'];

export function RestaurantForm() {
  const { register, handleSubmit } = useForm<IRestaurant>({
    resolver: zodResolver(restaurantSchema),
  });

  const onSubmit = useCallback(async (data: IRestaurant) => {
    console.log('data', data);
  }, []);

  const [center, setCenter] = useState({
    lat: 18.4153,
    lng: 66.0594,
  });

  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState([]);
  const [mapRef, setMapRef] = useState(null);
  const [selected, setSelected] = useState(null);
  const mapRef2 = useRef<{ panTo: ({ lat, lng }) => void }>();

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
    libraries,
  });

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCenter(latLng);
  };

  const convertAddress = async (value) => {
    const results = await geocodeByAddress(value.address);
    const latLng = await getLatLng(results[0]);
    const locationData = {
      title: value.title,
      address: value.address,
      website: value.website,
      phone: value.phone,
      lat: latLng.lat,
      lng: latLng.lng,
    };

    setCoords((coords) => [...coords, locationData]);
  };

  const onCenterChanged = () => {
    if (mapRef) {
      const newCenter = mapRef.getCenter();
      console.log(newCenter);
      setCenter({
        lat: mapRef.getCenter().lat(),
        lng: mapRef.getCenter().lng(),
      });
    }
  };

  const onMapLoad = (map) => {
    mapRef2.current = map;
    setMapRef(map);
    //   {
    //     location.map((loc) => {
    //       convertAddress(loc);
    //     });
    //   }
  };

  const panTo = useCallback(({ lat, lng }) => {
    if (mapRef2?.current) {
      mapRef2.current.panTo({ lat, lng });
    }
  }, []);

  return (
    <form
      className={'flex items-center justify-center h-screen w-full'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={'card w-96 bg-base-100 shadow-xl'}>
        <div className={'card-body'}>
          <h2 className={'card-title'}>Añade Restaurante</h2>
          <input
            type={'text'}
            placeholder={'Nombre de su restaurante'}
            className={'input input-bordered w-full max-w-xs mt-2'}
            {...register('name')}
          />
          <button
            className={'btn'}
            onClick={() => {
              setAddress('');
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  panTo({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  });
                  setCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  });
                },
                (positionError) => {
                  console.error('Error obtaining position', positionError);
                },
              );
            }}
          >
            Localizame!
          </button>
          <GoogleMap
            zoom={10}
            center={{
              lat: center.lat,
              lng: center.lng,
            }}
            // mapContainerClassName={'map-container'}
            options={options}
            onLoad={onMapLoad}
          >
            {coords.map((coord) => {
              return (
                <Marker
                  key={coord.lat}
                  position={{
                    lat: parseFloat(coord.lat),
                    lng: parseFloat(coord.lng),
                  }}
                  onClick={() => {
                    onCenterChanged();
                    setSelected(coord);
                  }}
                />
              );
            })}
            {selected ? (
              <InfoWindow
                position={{ lat: selected.lat, lng: selected.lng }}
                onCloseClick={() => {
                  setSelected(null);
                }}
              >
                <div>
                  <h2>{selected?.title}</h2>
                  <p>{selected?.address}</p>
                </div>
              </InfoWindow>
            ) : null}
          </GoogleMap>

          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
              <div>
                <input {...getInputProps({ placeholder: 'Direccion' })} />

                <div>
                  {suggestions.map((suggestion, index) => {
                    const style = {
                      backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                    };

                    return (
                      <div
                        key={index}
                        {...getSuggestionItemProps(suggestion, { style })}
                      >
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          <Script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}&libraries=places`}
            strategy="beforeInteractive"
          ></Script>
        </div>
      </div>
    </form>
  );
}
