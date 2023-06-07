'use client';

import Card from '@/components/common/Card';
import axios from '@/lib/common/axios';
import ErrorResponse from '@/lib/contracts/ErrorResponse';
import useUser from '@/lib/hooks/useUser';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface IRegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const RegisterPage = () => {
  useUser();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IRegisterForm>();

  const onSubmit = handleSubmit(async data => {
    await toast
      .promise(
        axios.get('/sanctum/csrf-cookie').then(() => axios.post('/register', data)),
        {
          loading: 'Registering...',
          success: () => {
            router.push('/auth/login');
            return 'Register success!';
          },
          error: (error: AxiosError<ErrorResponse>) => error.response?.data.message ?? 'Register failed.',
        }
      )
      .catch(console.error);
  });

  return (
    <>
      <main className="top-0 left-0 fixed h-screen w-screen grid place-items-center">
        <Card className="max-w-screen-sm w-full">
          <form onSubmit={onSubmit}>
            <h1 className="card-title">Register</h1>

            <section className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input {...register('name')} type="text" className="input input-bordered w-full" required />
            </section>
            <section className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input {...register('email')} type="email" className="input input-bordered w-full" required />
            </section>
            <section className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input {...register('password')} type="password" className="input input-bordered w-full" required />
            </section>
            <section className="form-control">
              <label className="label">
                <span className="label-text">Password Confirmation</span>
              </label>
              <input
                {...register('password_confirmation')}
                type="password"
                className="input input-bordered w-full"
                required
              />
            </section>

            <section className="flex justify-end items-center gap-4 mt-4">
              <a className="link" href="/auth/login">
                Already have account?
              </a>
              <button className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting && <span className="loading loading-spinner"></span>}
                Register
              </button>
            </section>
          </form>
        </Card>
      </main>
    </>
  );
};

export default RegisterPage;
