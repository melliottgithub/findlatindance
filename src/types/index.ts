export type LatinDanceStyle = 'All Styles' | 'Salsa' | 'Bachata' | 'Brazilian Zouk' | 'Kizomba' | 'Merengue' | 'Mixed';

export type EventType = 'social' | 'class' | 'festival';

export interface LatinDanceEvent {
  id: string;
  companyName: string;
  eventType: EventType;
  danceStyles: LatinDanceStyle[];
  ballroomCount?: number;
  frequency: 'weekly' | 'monthly' | 'one-time';
  date: string;
  dateTime: {
    startTime: string;
    endTime: string;
    day?: string;
    endsNextDay?: boolean;
  };
  city: string;
  citySlug: string;
  country: string;
  location: string;
  price?: string;
  description: string;
  eventUrl: string;
  externalSourceUrl?: string;
  status: 'approved' | 'pending';
}
