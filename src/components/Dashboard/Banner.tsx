import { Fragment, useCallback, useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { User } from '../../models/main';
import { useForm } from 'react-hook-form';
import { IRestaurant, restaurantSchema } from '../../common/restaurant/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import ControlledModal from '../Modal';
import { DialogTitle } from '@headlessui/react';

type DashboardBannerType = {
  admin: User;
};
export default function DashboardBanner({ admin }: DashboardBannerType) {
  const { register, handleSubmit } = useForm<IRestaurant>({
    resolver: zodResolver(restaurantSchema),
  });

  const onSubmit = useCallback(async (data: IRestaurant) => {
    console.log('data', data);
  }, []);

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
          <p className="py-4">Press ESC key or click outside to close</p>
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
