import { authedNavigation, navigation } from '../../constants/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

export default function Header() {
  const { data } = useSession();
  const user: any = useMemo(() => data?.user, [data]);

  return (
    <div className={'navbar bg-base-100'}>
      <div className={'navbar-start'}>
        <div className={'dropdown'}>
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {user?.role !== 'GUEST' &&
              authedNavigation.map((item) => (
                <li key={item.name}>
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={'navbar-center'}>
        <Link className={'btn btn-ghost text-xl'} href={'/'}>
          MiHorarioPR
        </Link>
      </div>
      <div className={'navbar-end'}>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
  );

  // return (
  //   <header className='absolute inset-x-0 top-0 z-50'>
  //     <nav className='flex items-center justify-between p-6 lg:px-8' aria-label='Global'>
  //       <div className='flex lg:flex-1'>
  //         <a href='/' className='-m-1.5 p-1.5'>
  //           <span className='sr-only'>{COMPANY_INFO.name}</span>
  //           <img
  //             className='h-8 w-auto'
  //             src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
  //             alt=''
  //           />
  //         </a>
  //       </div>
  //       <div className='flex lg:hidden'>
  //         <button
  //           type='button'
  //           className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
  //           onClick={() => setMobileMenuOpen(true)}
  //         >
  //           <span className='sr-only'>Open main menu</span>
  //           <Bars3Icon className='h-6 w-6' aria-hidden='true' />
  //         </button>
  //       </div>
  //       <div className='hidden lg:flex lg:gap-x-12'>
  //         {navigation.map((item) => (
  //           <a key={item.name} href={item.href} className='text-sm font-semibold leading-6 text-gray-900'>
  //             {item.name}
  //           </a>
  //         ))}
  //       </div>
  //       <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
  //         <a href='/login' className='text-sm font-semibold leading-6 text-gray-900'>
  //           Log in <span aria-hidden='true'>&rarr;</span>
  //         </a>
  //       </div>
  //     </nav>
  //     <Dialog as='div' className='lg:hidden' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
  //       <div className='fixed inset-0 z-50' />
  //       <Dialog.Panel
  //         className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
  //         <div className='flex items-center justify-between'>
  //           <a href='/' className='-m-1.5 p-1.5'>
  //             <span className='sr-only'>{COMPANY_INFO.name}</span>
  //             <img
  //               className='h-8 w-auto'
  //               src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
  //               alt=''
  //             />
  //           </a>
  //           <button
  //             type='button'
  //             className='-m-2.5 rounded-md p-2.5 text-gray-700'
  //             onClick={() => setMobileMenuOpen(false)}
  //           >
  //             <span className='sr-only'>Close menu</span>
  //             <XMarkIcon className='h-6 w-6' aria-hidden='true' />
  //           </button>
  //         </div>
  //         <div className='mt-6 flow-root'>
  //           <div className='-my-2 divide-y divide-gray-500/10'>
  //             <div className='space-y-2 py-6'>
  //               {navigation.map((item) => (
  //                 <a
  //                   key={item.name}
  //                   href={item.href}
  //                   className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
  //                 >
  //                   {item.name}
  //                 </a>
  //               ))}
  //             </div>
  //             <div className='py-6'>
  //               <a
  //                 href='/login'
  //                 className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
  //               >
  //                 Log in
  //               </a>
  //             </div>
  //           </div>
  //         </div>
  //       </Dialog.Panel>
  //     </Dialog>
  //   </header>
  // );
}
