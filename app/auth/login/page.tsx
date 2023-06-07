'use client';

import Card from '@/components/common/Card';
import axios from '@/lib/common/axios';
import ErrorResponse from '@/lib/contracts/ErrorResponse';
import useUser from '@/lib/hooks/useUser';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface ILoginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { mutate } = useUser();
  console.log(1);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ILoginForm>();

  const onSubmit = handleSubmit(async data => {
    await toast
      .promise(
        axios
          .get('/sanctum/csrf-cookie', { maxRedirects: 0 })
          .then(() => axios.post('/login', data, { maxRedirects: 0 })),
        {
          loading: 'Logging in...',
          success: () => {
            mutate().then(() => router.push('/home'));
            return 'Login success!';
          },
          error: (error: AxiosError<ErrorResponse>) => error.response?.data.message ?? 'Login failed.',
        }
      )
      .catch(console.error);
  });

  return (
    <>
      <main className="fixed h-screen w-screen grid place-items-center">
        <Card className="max-w-screen-sm w-full">
          <form onSubmit={onSubmit}>
            <h1 className="card-title">Login</h1>

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

            <section className="flex justify-end items-center gap-4 mt-4">
              <a className="link" href="/auth/register">
                New here?
              </a>
              <button className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting && <span className="loading loading-spinner"></span>}
                Login
              </button>
            </section>
          </form>
        </Card>
      </main>
    </>
  );
};

export default LoginPage;
