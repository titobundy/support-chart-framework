import { useState } from 'react';
import { Form, type ShouldRevalidateFunctionArgs } from 'react-router';
import { Copy, Download, ThumbsUp, ThumbsDown, Send } from 'lucide-react';
import type { Route } from './+types/client-chat-page';

import { Button } from '~/components/ui/button';
import { Textarea } from '~/components/ui/textarea';
import { ScrollArea } from '~/components/ui/scroll-area';
import { getClientMessages, sendMessage } from '~/fake/fake-data';
import { formatTime } from '~/lib/date-formatter';

// export function shouldRevalidate(
//   arg: ShouldRevalidateFunctionArgs
// ) {
//   return false;
// }

export async function loader({ params }: Route.LoaderArgs) {
  const clientId = params.id;
  if (!clientId) {
    throw new Response('Client ID is required', { status: 400 });
  }
  const messages= await getClientMessages(clientId);
  return { messages };
}

export async function action({ params, request }: Route.ActionArgs) {
  const clientId = params.id;
  if (!clientId) {
    throw new Error("Client ID is required");
  }

  const formData = await request.formData();
  const content = formData.get("message") as string;
  
  if (!content || content.trim() === "") {
    throw new Error("Message content is required");
  }

  // Enviar mensaje usando el fake API
  const newMessage = await sendMessage({
    sender: 'agent',
    clientId,
    createdAt: new Date(),
    content: content.trim(),
  });
}


export default function ClientChatPage({ loaderData }: Route.ComponentProps) {
  const [input, setInput] = useState('');
  const { messages = [] } = loaderData;

  return (
    <div className='flex-1 flex flex-col'>
      <ScrollArea className='flex-1 p-4'>
        <div className='space-y-4'>
          {messages.length === 0 && (
            <div className='flex flex-col items-center justify-center py-12 space-y-4'>
              <div className='rounded-full bg-muted p-4'>
                <Send className='h-10 w-10 text-muted-foreground opacity-70' />
              </div>
              <div className='text-center space-y-2'>
                <p className='text-lg font-medium'>No messages yet</p>
                <p className='text-sm text-muted-foreground max-w-xs mx-auto'>
                  Start typing to begin a new conversation
                </p>
              </div>
            </div>
          )}
          {messages.map((message, index) => (
            <div key={index} className='w-full'>
              {message.sender === 'client' ? (
                // Agent message - left aligned
                <div className='flex gap-2 max-w-[80%]'>
                  <div className='h-8 w-8 rounded-full bg-primary flex-shrink-0' />
                  <div className='space-y-2'>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm font-medium'>NexTalk</span>
                      <span className='text-sm text-muted-foreground'>
                        {formatTime(message.createdAt)}
                      </span>
                    </div>
                    <div className='p-3 bg-muted/50 rounded-lg'>
                      <p className='text-sm whitespace-pre-wrap'>
                        {message.content}
                      </p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Button variant='ghost' size='icon' className='h-8 w-8'>
                        <Copy className='h-4 w-4' />
                      </Button>
                      <Button variant='ghost' size='icon' className='h-8 w-8'>
                        <Download className='h-4 w-4' />
                      </Button>
                      <Button variant='ghost' size='icon' className='h-8 w-8'>
                        <ThumbsUp className='h-4 w-4' />
                      </Button>
                      <Button variant='ghost' size='icon' className='h-8 w-8'>
                        <ThumbsDown className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                // User message - right aligned
                <div className='flex flex-col items-end'>
                  <div className='text-right mb-1'>
                    <span className='text-sm font-medium mr-2'>G5</span>
                    <span className='text-sm text-muted-foreground'>
                      {formatTime(message.createdAt)}
                    </span>
                  </div>
                  <div className='bg-black text-white p-3 rounded-lg max-w-[80%]'>
                    <p className='text-sm whitespace-pre-wrap'>
                      {message.content}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className='p-4 border-t'>
        <Form method='post' className='flex items-center gap-2'>
          <Textarea
            name='message'
            placeholder='Type a message as a customer'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='min-h-[44px] h-[44px] resize-none py-3'
          />
          <Button type='submit' className='h-[44px] px-4 flex items-center gap-2'>
            <Send className='h-4 w-4' />
            <span>Send</span>
          </Button>
        </Form>
      </div>
    </div>
  );
}
