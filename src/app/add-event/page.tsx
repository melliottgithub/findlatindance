import type { Metadata } from 'next';
import { AddEventClient } from '@/components/events/AddEventClient';

export const metadata: Metadata = {
  title: 'Submit a Latin Dance Congress or Event — Free Listing | FindLatinDance',
  description: 'List your multi-room Latin dance congress, weekend festival, or premier social on FindLatinDance. 15-second submission via your Instagram handle.',
  alternates: {
    canonical: 'https://findlatindance.com/add-event',
  },
};

export default function AddEventPage() {
  return <AddEventClient />;
}
