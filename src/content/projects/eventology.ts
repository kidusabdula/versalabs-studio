import { defineProject } from '../schema';

export default defineProject({
  slug: "eventology",
  title: "Eventology",
  subtitle: "Event Discovery, Ticketing and Check-In for Addis Ababa",
  summary: "An event platform for Addis Ababa, in English and Amharic. Guests register in a few taps and carry a QR ticket, and organizers check them in at the door.",
  category: "Ticketing",
  tags: ["Ticketing", "Event Check-In", "Bilingual", "Mobile"],
  year: "2026",
  status: "MVP",
  kind: "client",
  industry: ["Events"],
  links: {},
  gallery: [],
  description: "Eventology helps people in Addis Ababa find events, register and get a proper ticket. Organizers run their guest list and door check-in from one place, and every event is reviewed before it goes live. It is an MVP: online payments and the mobile app are built and wait for launch.",
  need: "Many events in Addis are promoted on social media and messaging apps, with sign-ups in spreadsheets and paper lists at the door. Organizers can't see who is coming, guests have no proper ticket, and it is hard to tell a real event from a fake one.",
  delivered: "We delivered a working event platform for Addis Ababa, in English and Amharic. Attendees find events by category, date and sub-city, register in a few taps and get a QR ticket that opens even offline. Organizers set up ticket types, manage their guest list, scan tickets at the door and see how each event performs. Chapa payments, email and text reminders are built and switch on at launch, and a companion mobile app is built but not yet released.",
  features: [
    { title: "Tickets That Work Offline", description: "Every guest gets a QR ticket that opens even without internet at the venue gate." },
    { title: "Quick Check-In at the Door", description: "Organizers scan tickets with a phone camera, and a live counter shows who has arrived." },
    { title: "No Overbooking", description: "Seats are held as people register, and when someone cancels, the next person on the waitlist gets the spot." },
    { title: "Events Guests Can Trust", description: "Admins review every event before it goes live and verify the organizers behind them." },
  ],
});
