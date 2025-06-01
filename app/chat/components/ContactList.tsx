import { NavLink, useParams } from 'react-router';
import { ScrollArea } from '~/components/ui/scroll-area';
import { Button } from '~/components/ui/button';
import type { Client } from '../interfaces/chat.interface';

interface ContactListProps {
  clients: Client[];
}

const ContactList = ({ clients }: ContactListProps) => {
  const {id } = useParams<{ id: string }>();
  return (
    <ScrollArea className='h-[calc(100vh-120px)]'>
      <div className='space-y-4 p-4'>
        <div className='space-y-1'>
          <h3 className='px-2 text-sm font-semibold'>Contacts</h3>
          <div className='space-y-1'>

            {clients.map((client) => {
              // Extract initials from client name (first letter of first and last name)
              const initials = client.name
                .split(' ')
                .map(word => word[0])
                .join('')
                .slice(0, 2)
                .toUpperCase();

              return (
                <NavLink
                  key={client.id}
                  to={`/chat/client/${client.id}`}
                  className={({ isActive, isPending }) =>
                    `flex w-full my-2 justify-start px-3 py-2 transition-all duration-300 rounded-2xl ${
                      isActive
                        ? 'bg-indigo-200 text-primary font-medium border border-primary/50 shadow-sm'
                        : isPending
                          ? 'bg-muted/70 text-muted-foreground'
                          : 'text-foreground hover:bg-muted/50'
                    }`
                  }
                >
                  <div className={`h-6 w-6 rounded-full mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs ${
                    id === client.id ? 'bg-primary' : 'bg-gray-400'
                  }`}>
                    {initials}
                  </div>
                  <span className={id === client.id ? 'text-indigo-700 font-medium' : 'text-gray-400'}>
                    {client.name}
                  </span>
                </NavLink>
                
                
              );
            })}
            
          </div>
        </div>
        <div className='pt-4 border-t mt-4'>
          <h3 className='px-2 text-sm font-semibold mb-1'>Recent</h3>
          <Button variant='ghost' className='w-full justify-start'>
            <div className='h-6 w-6 rounded-full bg-gray-500 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs'>
              TM
            </div>
            Thomas Miller
          </Button>
          <Button variant='ghost' className='w-full justify-start'>
            <div className='h-6 w-6 rounded-full bg-red-500 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs'>
              SB
            </div>
            Sarah Brown
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
};

export default ContactList;
