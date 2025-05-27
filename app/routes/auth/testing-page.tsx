import { Form, Link, NavLink, useNavigation } from 'react-router';
import { useEffect, useState } from 'react';
import type { Route } from './+types/testing-page';
import { sleep } from '~/lib/sleep';

export async function action({ request }: Route.ActionArgs) {
  await sleep(1000);

  const data = await request.formData();
  const name = data.get('name');
  const allData = Object.fromEntries(data);
  // data.get("title"),

  console.log('Server Side - Action');
  console.log({ name, allData });

  return { ok: true, message: 'Todo bien desde el serverAction' };
}

export async function clientAction({
  serverAction,
  request,
}: Route.ClientActionArgs) {
  await sleep(1000);

  const formData = await request.clone().formData();
  const allData = Object.fromEntries(formData);
  // data.get("title"),

  // can still call the server action if needed
  const data = await serverAction();
  // return data;
  return {
    message: 'Hola Mundo desde el clientAction - Client',
    data,
    allData,
  };
}

export async function loader() {
  console.log('Hola Mundo desde el loader - Server');
  return { message: 'Hola Mundo desde el loader - Server' };
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  console.log('Hola Mundo desde el clientLoader - Client');

  // call the server loader
  const serverData = await serverLoader();

  return {
    message: 'Hola Mundo desde el clientLoader - Client',
    serverData: serverData,
  };
}

export default function TestingPage({
  loaderData,
  actionData,
  params,
  matches,
}: Route.ComponentProps) {
  const [clientMatches, setClientMatches] = useState<string>('');
  const navigation = useNavigation();
  const isPosting =
    navigation.state === 'loading' || navigation.state === 'submitting';

  useEffect(() => {
    // Only set matches on the client side to avoid hydration mismatch
    setClientMatches(JSON.stringify(matches));
  }, [matches]);

  // console.log('TestingPage rendered with:', { matches });
  return (
    <div>
      <h1 className='text-2xl font-bold'>Testing Page!</h1>
      <p>Loader Data: {JSON.stringify(loaderData)}</p>
      <p>Action Data: {JSON.stringify(actionData)}</p>
      <p>Route Parameters: {JSON.stringify(params)}</p>
      <p>Matched Routes: {clientMatches || 'Loading matches...'}</p>

      <NavLink
        to='/auth/testing-args/abc-123/John/30'
        className={({ isPending }) =>
          isPending
            ? 'px-4 py-2 bg-gray-500 text-white font-medium rounded-md inline-block mt-4 cursor-wait'
            : 'px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors inline-block mt-4'
        }
      >
        {({ isPending }) =>
          isPending ? 'Loading...' : 'Go to Testing Args Page'
        }
      </NavLink>

      <Form method='post' className='mt-4 flex flex-col gap-2'>
        <input
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
          type='text'
          name='name'
          placeholder='Name'
        />
        <input
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
          type='number'
          name='age'
          placeholder='Age'
        />
        <button
          disabled={isPosting}
          type='submit'
          className={`px-4 py-2 font-medium rounded-md transition-colors ${
            isPosting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isPosting ? 'Submitting...' : 'Submit'}
        </button>
      </Form>
    </div>
  );
}
