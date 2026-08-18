export interface Program {
  id: string;
  title: string;
  badge?: string;
  level: string;
  description: string;
  icon: string;
  features: string[];
  isFeatured?: boolean;
  targetKm: string;
  suggestedDuration: string;
}

export interface VinhedoSpot {
  id: string;
  name: string;
  tag: string;
  image: string;
  alt: string;
  description: string;
  highlights: string[];
  terrainType: string;
  elevation: string;
  recommendedFor: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatarColor?: string;
  verified?: boolean;
  distance?: string;
}

export interface TrainingDay {
  dayName: string;
  workoutTitle: string;
  type: 'easy' | 'interval' | 'tempo' | 'long' | 'rest' | 'strength';
  distanceOrTime: string;
  intensity: string;
  description: string;
  locationTip?: string;
}

export interface TrainingWeek {
  weekNumber: number;
  focus: string;
  totalVolume: string;
  days: TrainingDay[];
}

export interface TrainingProgramSheet {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  weeks: TrainingWeek[];
  keyTips: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
