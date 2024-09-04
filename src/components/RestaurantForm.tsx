import { useForm } from 'react-hook-form';
import { IRestaurant, restaurantSchema } from '../common/restaurant/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import React, { useState, useRef } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import Script from 'next/script';

export function RestaurantForm() {
  const { register, handleSubmit } = useForm<IRestaurant>({
    resolver: zodResolver(restaurantSchema),
  });

  const onSubmit = useCallback(async (data: IRestaurant) => {
    console.log('data', data);
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
          <input type={''} />
        </div>
      </div>
    </form>
  );
}
