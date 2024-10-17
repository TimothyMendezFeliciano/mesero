import { useSession } from 'next-auth/react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { trpc } from '../../utils/trpc';
import { useModalContext } from '../../hooks/useModalContext';
import { useEffect } from 'react';
import { employeeInviteSchema, IEmployeeInvite } from '../../common/restaurant/schema';
import { zodResolver } from '@hookform/resolvers/zod';

export function EmployeeInviteForm() {
  const { data: admin } = useSession();

  const { register, handleSubmit, watch, trigger } = useForm<IEmployeeInvite>({
    resolver: zodResolver(employeeInviteSchema),
  });

  const inviteEmployee = trpc.restaurant.inviteEmployee.useMutation();
  const watchAllFields = watch();

  const onSubmit: SubmitHandler = async (data) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore @ts-expect-error
    await inviteEmployee.mutateAsync(data);
  };

  const onInvalid: SubmitErrorHandler = (error) => {
    console.error('Error Inviting Employee', error);
  };

  const { setCallback } = useModalContext();

  useEffect(() => {
    const subscription = watch((value) => {
      console.log('Updating handleSubmit Invite Employee', value);
      setCallback(() => handleSubmit(onSubmit, onInvalid));
    });
  }, [watch]);

  return (
    <form className={'flex items-center justify-center'}></form>
  );
};