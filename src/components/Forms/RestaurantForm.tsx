import { useForm, SubmitHandler } from 'react-hook-form';
import { IRestaurant, restaurantSchema } from '../../common/restaurant/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { Dispatch, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { municipios } from '../../constants/municipios';
import { useModalContext } from '../../hooks/useModalContext';


export function RestaurantForm() {
  const { register, handleSubmit, watch } = useForm<IRestaurant>({
    resolver: zodResolver(restaurantSchema),
  });

  const onSubmit: SubmitHandler<IRestaurant> = (data) => {
    console.log('Simple form', data);
  };

  const { setCallback } = useModalContext();

  useEffect(() => {
    setCallback(
      handleSubmit(onSubmit),
    );
  }, [handleSubmit]);

  return (
    <form
      className={'flex items-center justify-center'}
    >
      <div className={'card w-96 bg-base-100 shadow-xl'}>
        <div className={'card-body'}>
          <label className='input input-bordered flex items-center gap-2'>
            Nombre
            <input
              type='text'
              placeholder={'Mi Restaurante'}
              className={'grow border-0'}
              {...register('name')}
            />
          </label>

          <label className='input input-bordered flex items-center gap-2'>
            #Empleados
            <input
              type='text'
              placeholder={'5'}
              className={'grow border-0'}
              {...register('employeeCount')}
            />
          </label>

          <select
            className={'select select-bordered w-full max-w-xs'}
            {...register('location')}
            defaultValue={''}
          >
            <option disabled>
              Pueblo
            </option>
            {municipios.map(({ city }, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
}
