import ContactInformation from './ContactInformation';
import { useState } from 'react';
import ContactInformationSkeleton from './ContactInformationSkeleton';
import NoContactSelected from './NoContactSelected';

const ContactInformationCard = () => {
  const [loading] = useState(false);

  if (loading) {
    return <ContactInformationSkeleton />;
  }

  return <NoContactSelected />;
};

export default ContactInformationCard;
