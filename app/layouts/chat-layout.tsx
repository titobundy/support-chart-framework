import { Outlet, Form, redirect, Link } from 'react-router';
import { X } from 'lucide-react';
import { Button } from '~/components/ui/button';
import ContactList from '~/chat/components/ContactList';
import ContactInformationCard from '~/chat/components/contact-information-card/ContactInformationCard';
import { getClient, getClients } from '~/fake/fake-data';
import { getSession } from '~/sessions.server';
import type { Route } from './+types/chat-layout';

export async function loader({ request, params }: Route.LoaderArgs) {
  // Validate session
  const session = await getSession(request.headers.get('Cookie'));
  const { id } = params;

  // If no user session exists, redirect to login
  if (!session.has('userId')) {
    return redirect('/auth/login');
  }

  const userName = session.get('name');

  const clients = await getClients();
  if (id) {
    const client = await getClient(id);
    return { clients, userName, client };
  }

  return { clients, userName };
}

export default function ChatLayout({ loaderData }: Route.ComponentProps) {
  const { clients, userName, client } = loaderData;

  return (
    <div className='flex h-screen bg-background'>
      {/* Sidebar */}
      <div className='w-64 border-r bg-muted/10'>
        <div className='p-4 border-b'>
          <div className='flex items-center gap-2'>
            <div className='h-6 w-6 rounded-full bg-primary' />
            <Link to='/chat' className='font-semibold'>
              {userName}
            </Link>
          </div>
        </div>
        <ContactList clients={clients} />

        {/* Logout Section */}
        <div className='fixed bottom-0 left-0 w-64 p-4 border-t bg-muted/10'>
          <Form method='post' action='/auth/logout'>
            <Button
              type='submit'
              variant='outline'
              className='w-full justify-center text-red-500 hover:text-red-600 hover:bg-red-100 border-red-200 rounded-lg bg-red-50'
            >
              Sign out
            </Button>
          </Form>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex'>
        <div className='flex-1 flex flex-col'>
          {/* Header */}
          <header className='h-14 border-b px-4 flex items-center justify-between'>
            <div></div> {/* Empty div to maintain spacing */}
            <div className='flex items-center gap-2'>
              <Button variant='ghost' size='sm'>
                Save conversation
              </Button>
              <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
                <X className='h-4 w-4' />
              </Button>
            </div>
          </header>
          <Outlet />
        </div>

        {/* Right Panel - Contact Details */}
        <div className='w-80 border-l'>
          <div className='h-14 border-b px-4 flex items-center'>
            <h2 className='font-medium'>Contact details</h2>
          </div>
          <ContactInformationCard />
        </div>
      </div>
    </div>
  );
}
