import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import {
  IRestaurant,
  restaurantCreationSchema,
} from '../../common/restaurant/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { municipios } from '../../constants/municipios';
import { useModalContext } from '../../hooks/useModalContext';
import { useSession } from 'next-auth/react';
import { trpc } from '../../utils/trpc';

export function RestaurantForm() {
  const { data: admin } = useSession();
  const { register, handleSubmit, watch } = useForm<IRestaurant>({
    resolver: zodResolver(restaurantCreationSchema),
  });

  const addRestaurant = trpc.restaurant.addRestaurant.useMutation();
  const watchAllFields = watch();

  const onSubmit: SubmitHandler<IRestaurant> = async (data) => {
    console.log('Simple form', { ...data, who: admin.user.id });
    await addRestaurant.mutateAsync({ ...data, userId: admin.user.id });
  };
  const onInvalid: SubmitErrorHandler<IRestaurant> = (error) => {
    console.log('Whats the holdup?', error);
  };

  const { setCallback } = useModalContext();

  useEffect(() => {
    // setCallback(() => handleSubmit(onSubmit));
    const subscription = watch((value, { name, type }) => {
      console.log('Updating handleSubmit', { value, name, type }),
        setCallback(() => handleSubmit(onSubmit, onInvalid));
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form className={'flex items-center justify-center'}>
      <div className={'card w-96 bg-base-100 shadow-xl'}>
        <div className={'card-body'}>
          <label className="input input-bordered flex items-center gap-2">
            Nombre
            <input
              type="text"
              placeholder={'Mi Restaurante'}
              className={'grow border-0'}
              {...register('name')}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            #Empleados
            <input
              {...register('employeeCount', {
                valueAsNumber: true,
              })}
              placeholder={'5'}
              className={'grow border-0'}
              type="number"
            />
          </label>

          <select
            className={'select select-bordered w-full max-w-xs'}
            {...register('location')}
            defaultValue={''}
          >
            <option disabled>Pueblo</option>
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
