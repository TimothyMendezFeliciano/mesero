import { Fragment, useCallback, useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { User } from '../../models/main';
import ControlledModal from '../Modal';
import { RestaurantForm } from '../Forms/RestaurantForm';

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
  const [open, setOpen] = useState<boolean>(false);
  const onClose = useCallback(() => setOpen(false), []);

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

        <ControlledModal
          id={'RestaurantAddButtonModal'}
          open={open}
          onClose={onClose}
          title={'Add Restaurant'}
          closedChildren={
            <Fragment>
              <button
                className={'btn btn-secondary'}
                onClick={() => setOpen(true)}
              >
                <PlusCircleIcon className={'w-10 h-10'} />
              </button>
            </Fragment>
          }
          modalAction={
            <div className={'modal-action'}>
              <form method={'dialog'}>
                <button className={'btn'} onClick={onClose}>
                  Concluir
                </button>
              </form>
            </div>
          }
        >
          <RestaurantForm />
        </ControlledModal>
      </div>
      <div className="avatar">
        <div className="w-24 rounded">
          <img src={admin.image} />
          {/*<img src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp' />*/}
        </div>
      </div>
    </div>
  );
}
