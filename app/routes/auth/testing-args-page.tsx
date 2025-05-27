import { Link } from 'react-router';
import type { Route } from './+types/testing-args-page';
import { sleep } from '~/lib/sleep';

export function meta() {
  return [
    { title: "Very cool app" },
    {
      property: "og:title",
      content: "Very cool app",
    },
    {
      name: "description",
      content: "This app is the best",
    },
  ];
}

export function headers() {
  return {
    "X-Stretchy-Pants": "its for fun",
    "Cache-Control": "max-age=300, s-maxage=3600",
  };
}

export function links() {
  return [
    // {
    //   rel: "icon",
    //   href: "/favicon.png",
    //   type: "image/png",
    // },
    // {
    //   rel: "stylesheet",
    //   href: "https://example.com/some/styles.css",
    // },
    // {
    //   rel: "preload",
    //   href: "/images/banner.jpg",
    //   as: "image",
    // },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  console.log('Loader called with params:', params);
  return { message: 'Hello from the server!' };
}


export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  console.log('Client Loader called with params:', params);
  await sleep(1500);
  return {
    message: 'Hello from the client after a delay!',
  };
}

export function HydrateFallback() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-lg font-medium">Loading Game...</p>
    </div>
  );
}

clientLoader.hydrate = true as const;

export default function TestingArgsPage({
  loaderData,
  actionData,
  params,
  matches,
}: Route.ComponentProps) {
  const { id, name, age } = params;
  console.log({ id, name, age });
  return (
    <div>
      <h1 className='text-2xl font-bold'>Testing Args Page!</h1>
      <p>Loader Data: {JSON.stringify(loaderData)}</p>
      <p>Action Data: {JSON.stringify(actionData)}</p>
      <p>Route Parameters: {JSON.stringify(params)}</p>
      <p>Matched Routes: {JSON.stringify(matches)}</p>

      <Link
        to='/auth/testing'
        className='px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition-colors inline-block mt-4'
      >
        Go to Testing Page
      </Link>
    </div>
  );
}
