import { useSession } from 'next-auth/react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { trpc } from '../../utils/trpc';
import { useModalContext } from '../../hooks/useModalContext';
import { useEffect } from 'react';
import {
  employeeInviteSchema,
  IEmployeeInvite,
} from '../../common/restaurant/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { classNames } from '../../utils/classNames';
import { Restaurant } from '../../models/main';

type EmployeeInviteProps = { restaurant: Restaurant };

export function EmployeeInviteForm({ restaurant }: EmployeeInviteProps) {
  const { data: admin } = useSession();

  const { register, handleSubmit, watch, trigger } = useForm<IEmployeeInvite>({
    resolver: zodResolver(employeeInviteSchema),
  });

  const inviteEmployee = trpc.restaurant.inviteEmployee.useMutation();
  const watchAllFields = watch();

  const onSubmit: SubmitHandler<IEmployeeInvite> = async (data) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore @ts-expect-error
    await inviteEmployee.mutateAsync({
      employeeInviteSchema: data,
      adminId: admin.user.id,
      restaurantId: restaurant.id,
    });
  };

  const onInvalid: SubmitErrorHandler<IEmployeeInvite> = (error) => {
    console.error('Error Inviting Employee', error);
  };

  const { setCallback } = useModalContext();

  useEffect(() => {
    const subscription = watch((value) => {
      console.log('Updating handleSubmit Invite Employee', value);
      setCallback(() => handleSubmit(onSubmit, onInvalid));
    });

    return () => {
      subscription.unsubscribe;
      setCallback(undefined);
    };
  }, [watch]);

  return (
    <form className={'flex items-center justify-center'}>
      <div className={'card w-96 bg-base-100 shadow-xl'}>
        <div className={'card-body'}>
          <label className={'input input-bordered flex items-center gap-2'}>
            Nombre (Empleado)
            <input
              type={'text'}
              placeholder={'Nombre (Empleado)'}
              onChange={() => trigger('name')}
              className={classNames('grow border-0', 'invalid: text-red-500')}
              {...register('name', {
                required: 'Nombre es requerido',
              })}
            />
          </label>

          <label className={'input input-bordered flex items-center gap-2'}>
            Correo Electronico
            <input
              type={'email'}
              placeholder={'employee@example.com'}
              className={'grow border-0'}
              onChange={() => trigger('email')}
              {...register('email', {
                required: 'Correo Electronico es requerido',
              })}
            />
          </label>

          <label className={'input input-bordered flex items-center gap-2'}>
            # Telefono
            <input
              type={'tel'}
              placeholder={'787-999-9999'}
              className={'grow border-0'}
              onChange={() => trigger('phoneNumber')}
              {...register('phoneNumber', {
                required: '# Telefono es requerido',
              })}
            />
          </label>
        </div>
      </div>
    </form>
  );
}
