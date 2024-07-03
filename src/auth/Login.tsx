import * as React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormInputType, loginSchema } from './login.schema';
import { useToast } from '../components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputType>({
    resolver: zodResolver(loginSchema),
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmit = (data: LoginFormInputType) => {
    if (
      data.email === 'rama@yopmail.com' &&
      data.password === 'rama@yopmail.com'
    ) {
      const token = 'Hola ka bola!';
      localStorage.setItem('token', token);
      toast({
        variant: 'success',
        title: 'Success',
        description: 'Login successful!',
      });
      navigate('/dashboard');
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Login unsuccessful!',
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            React Admin Panel
          </CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="rama@yopmail.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-red-500 text-[13px]">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && (
                <p className="text-red-500 text-[13px]">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
