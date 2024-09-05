import { Fragment, useCallback, useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { User } from '../../models/main';
import { ControlledModal } from '../Modal';
import { RestaurantForm } from '../Forms/RestaurantForm';
import { ModalContext, ModalProvider } from '../../context/ModalContext';

type DashboardBannerType = {
  admin: User;
};
export default function DashboardBanner({ admin }: DashboardBannerType) {
  const restaurants = [
    { id: 1, name: 'Sanwicheros de la Plaza' },
    { id: 2, name: 'Combinaciones Chinas' },
    { id: 3, name: 'Restaurante 3' },
  ];

  const [selected, setSelected] = useState(restaurants[0]);

  return (
    <div className={'flex flex-row justify-between items-center px-4'}>
      <div className={'inline-flex gap-4'}>
        <select
          defaultValue={''}
          className={
            'select select-bordered w-full max-w-xs select-primary truncate'
          }
        >
          <option disabled defaultValue={''}>
            Select Restaurant Timesheet
          </option>
          {restaurants.map((restaurant) => (
            <option key={restaurant.id}>{restaurant.name}</option>
          ))}
        </select>

        <ModalProvider
        >
          <ControlledModal
            id={'RestaurantAddButtonModal'}
            title={'Añadir Restaurante'}
            triggerButtonContent={
              <PlusCircleIcon className={'w-10 h-10'} />
            }
            closeButtonContent={<p>Guardar!</p>}
          >
            <RestaurantForm />
          </ControlledModal>
        </ModalProvider>
      </div>
      <div className='avatar'>
        <div className='w-24 rounded'>
          <img src={admin.image} />
          {/*<img src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp' />*/}
        </div>
      </div>
    </div>
  );
}
