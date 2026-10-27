// The team shown on /about. `visibility` decides whether a person appears, so a
// change to the team section is one line here. Portraits live in
// public/images/team/ (the image check's shared folder).

export interface TeamMember {
  name: string;
  role: string;
  portrait?: string;
  bio: string;
  visibility: 'show' | 'hide';
}

export const TEAM: TeamMember[] = [
  {
    name: 'Kidus Abdula',
    role: 'Founder & Engineer',
    portrait: '/images/team/kidus-abdula.webp',
    bio: 'Full-stack engineer leading VersaLabs Studio. Designs and builds business platforms from the ground up, from database schema to production deployment. Cares about clean architecture and shipping fast.',
    visibility: 'show',
  },
  {
    name: 'Caleb Demelash',
    role: 'Senior Full Stack Engineer',
    portrait: '/images/team/caleb-demelash.webp',
    bio: 'Experienced full-stack developer and business liaison. Bridges the gap between technical implementation and client needs, delivering polished user experiences across web and mobile platforms.',
    visibility: 'show',
  },
  {
    name: 'Bemnet Kibret',
    role: 'Full Stack Engineer & Designer',
    portrait: '/images/team/bemnet-kibret.webp',
    bio: 'Product designer and front-end specialist. Creates the visual identity and interactive experiences that make VersaLabs platforms feel premium and intuitive to every user.',
    visibility: 'show',
  },
  {
    name: 'Naol Girma',
    role: 'Backend Engineer & Project Manager',
    bio: 'Backend systems specialist and project management lead. Orchestrates delivery timelines, manages client communication, and architects the server-side infrastructure that powers our platforms at scale.',
    visibility: 'show',
  },
];

export const VISIBLE_TEAM = TEAM.filter((member) => member.visibility === 'show');
