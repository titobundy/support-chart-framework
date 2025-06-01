import ContactInformation from './ContactInformation';
import { useState } from 'react';
import ContactInformationSkeleton from './ContactInformationSkeleton';
import NoContactSelected from './NoContactSelected';
import { useLoaderData, useNavigation, useParams } from 'react-router';
import type { Client } from '~/chat/interfaces/chat.interface';

interface ContactInformationCardProps {
  client?: Client;
}

const ContactInformationCard = () => {
  const { id } = useParams();
  const { clients = [], client } = useLoaderData();
  const { state }  = useNavigation();
  
  const isPending = state === 'loading' || state === 'submitting';
  if(client) {
    // If client is provided, use it directly
    return <ContactInformation client={client} />;
  }

  if (isPending) {
    return <ContactInformationSkeleton />;
  }
  if (!id || !clients.length) {
    return <NoContactSelected />;
  }
  // const client = clients.find((client: Client) => client.id === id);
  if (!client) {
    return <NoContactSelected />;
  }
  return <ContactInformation client={client} />
};

export default ContactInformationCard;
