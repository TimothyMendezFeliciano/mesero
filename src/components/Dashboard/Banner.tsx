import { Fragment, useCallback, useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { User } from '../../models/main';
import { useForm } from 'react-hook-form';
import { IRestaurant, restaurantSchema } from '../../common/restaurant/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import ControlledModal from '../Modal';

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
          <option disabled selected>
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
          closedChildren={
            <Fragment>
              <button
                className={'btn btn-secondary'}
                onClick={() =>
                  (
                    document.getElementById(
                      'RestaurantAddButtonModal',
                    ) as HTMLDialogElement
                  ).showModal()
                }
              >
                <PlusCircleIcon className={'w-10 h-10'} />
              </button>
            </Fragment>
          }
          modalAction={
            <div className={'modal-action'}>
              <form method={'dialog'}>
                <button className={'btn'}>Concluir</button>
              </form>
            </div>
          }
        >
          <h3 className="font-bold text-lg">Hello!</h3>
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

  // return (
  //   <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
  //     <UserIcon className="w-10 h-10" />
  //     <div className="flex-1 flex items-center justify-center ">
  //       <Listbox value={selected} onChange={setSelected}>
  //         {({ open }) => (
  //           <>
  //             <Listbox.Label className="block text-sm font-medium text-gray-700">
  //               Selections
  //             </Listbox.Label>
  //             <div className="mt-1 relative">
  //               <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg border border-gray-300 shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
  //                 <span className="block truncate">{selected.name}</span>
  //                 <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
  //                   <ArrowDownIcon
  //                     className="h-5 w-5 text-gray-400"
  //                     aria-hidden="true"
  //                   />
  //                 </span>
  //               </Listbox.Button>
  //
  //               <Transition
  //                 show={open}
  //                 as="div"
  //                 className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
  //                 leave="transition ease-in duration-100"
  //                 leaveFrom="opacity-100"
  //                 leaveTo="opacity-0"
  //               >
  //                 <Listbox.Options
  //                   static
  //                   className="py-1 rounded-md shadow-xs max-h-60 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
  //                 >
  //                   {people.map((person) => (
  //                     <Listbox.Option
  //                       key={person.id}
  //                       className={({ active }) =>
  //                         `${
  //                           active
  //                             ? 'text-indigo-900 bg-indigo-100'
  //                             : 'text-gray-900'
  //                         } cursor-default select-none relative py-2 pl-10 pr-4`
  //                       }
  //                       value={person}
  //                     >
  //                       {({ selected, active }) => (
  //                         <>
  //                           <span
  //                             className={`${
  //                               selected ? 'font-medium' : 'font-normal'
  //                             } block truncate`}
  //                           >
  //                             {person.name}
  //                           </span>
  //                           {selected && (
  //                             <span
  //                               className={`${
  //                                 active ? 'text-indigo-600' : 'text-indigo-600'
  //                               } absolute inset-y-0 left-0 flex items-center pl-3`}
  //                             >
  //                               <CheckIcon
  //                                 className="h-5 w-5"
  //                                 aria-hidden="true"
  //                               />
  //                             </span>
  //                           )}
  //                         </>
  //                       )}
  //                     </Listbox.Option>
  //                   ))}
  //                 </Listbox.Options>
  //               </Transition>
  //             </div>
  //           </>
  //         )}
  //       </Listbox>
  //     </div>
  //     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  //       Click me
  //     </button>
  //   </div>
  // );
}
