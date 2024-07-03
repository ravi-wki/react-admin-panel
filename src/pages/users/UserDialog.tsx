import * as React from 'react';
import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useAtom } from 'jotai';
import { userIdAtom, userModalAtom } from './atoms';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, UserFormInputType } from './users.schema';
import { Textarea } from '../../components/ui/textarea';
import { users } from './dummydata';
import FormSelect from '../../components/common/FormSelect';

export function UserDialog() {
  const [isOpen, setIsOpen] = useAtom(userModalAtom);
  const [userId, setUserId] = useAtom(userIdAtom);

  const methods = useForm<UserFormInputType>({
    resolver: zodResolver(userSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  React.useEffect(() => {
    if (userId) {
      const data = users.find((item) => item.id === userId);
      console.log('data', data);
      reset(data);
    } else {
      reset();
    }
  }, [userId, reset]);

  const onSubmit = (data: UserFormInputType) => {
    if (userId) {
      const userIndex = users.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...data };
      }
    } else {
      // Add new user
      users.push({ ...data, id: users.length + 1 } as never);
    }
    handleCloseDialog();
  };
  const handleCloseDialog = () => {
    setIsOpen(!isOpen);
    setUserId(null);
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{userId ? 'Edit User' : 'Add User'}</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-left">
                Name
              </Label>
              <div className="sm:col-span-3">
                <Input id="name" {...register('name')} className="col-span-3" />
                {errors.name && (
                  <p className="text-red-500 text-[13px]">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-left">
                Phone
              </Label>
              <div className="sm:col-span-3">
                <Input id="phone" {...register('phone')} />
                {errors.phone && (
                  <p className="text-red-500 text-[13px]">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-left">
                Email
              </Label>
              <div className="sm:col-span-3">
                <Input id="email" {...register('email')} />
                {errors.email && (
                  <p className="text-red-500 text-[13px]">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-left">
                Password
              </Label>
              <div className="sm:col-span-3">
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                  className="col-span-3"
                />
                {errors.password && (
                  <p className="text-red-500 text-[13px]">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-left">
                Address
              </Label>
              <div className="sm:col-span-3">
                <Textarea
                  id="address"
                  {...register('address')}
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-left">
                Role
              </Label>
              <div className="sm:col-span-3">
                <div className="col-span-3">
                  <FormSelect
                    name="role"
                    label="Role"
                    options={[
                      { value: 'Admin', label: 'Admin' },
                      { value: 'Sub Admin', label: 'Sub Admin' },
                      { value: 'Manager', label: 'Manager' },
                      { value: 'Customer', label: 'Customer' },
                    ]}
                  />
                </div>
                {errors.role && (
                  <p className="text-red-500 text-[13px]">
                    {errors.role.message}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
