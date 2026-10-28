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
    bio: 'Leads VersaLabs Studio. Designs and builds business software from the first idea to launch, and cares about delivering it quickly and well.',
    visibility: 'show',
  },
  {
    name: 'Caleb Demelash',
    role: 'Senior Full Stack Engineer',
    portrait: '/images/team/caleb-demelash.webp',
    bio: 'Builds websites and apps for our clients and works closely with them, so what we deliver matches what their business needs.',
    visibility: 'show',
  },
  {
    name: 'Bemnet Kibret',
    role: 'Full Stack Engineer & Designer',
    portrait: '/images/team/bemnet-kibret.webp',
    bio: 'Designs how our products look and feel, and builds the screens people use every day, so they are clear and pleasant to work with.',
    visibility: 'show',
  },
  {
    name: 'Naol Girma',
    role: 'Backend Engineer & Project Manager',
    bio: 'Leads project delivery: plans the timeline, keeps clients up to date, and builds the behind-the-scenes systems our software runs on.',
    visibility: 'show',
  },
];

export const VISIBLE_TEAM = TEAM.filter((member) => member.visibility === 'show');
