import { z } from 'zod';

// Shared by the contact form and /api/contact. The server is the authority:
// the form only uses these lists to render its options.

export const PROJECT_TYPES = {
  erp: 'ERP / Business Platform',
  ecommerce: 'E-Commerce / Online Store',
  ai: 'AI / Security System',
  mobile: 'Mobile Application',
  website: 'Corporate Website',
  custom: 'Custom / Other',
} as const;

export const BUDGETS = {
  '0-5k': '$0 - $5,000 / 0 - 600,000 ETB',
  '5k-15k': '$5,000 - $15,000 / 600,000 - 1.8M ETB',
  '15k-50k': '$15,000 - $50,000 / 1.8M - 6.0M ETB',
  '50k+': '$50,000+ / 6.0M+ ETB',
} as const;

type ProjectType = keyof typeof PROJECT_TYPES;
type Budget = keyof typeof BUDGETS;

const optionalText = (max: number) => z.string().trim().max(max).default('');
const keyOf = <T extends Record<string, string>>(record: T) =>
  z.enum(Object.keys(record) as [keyof T & string, ...(keyof T & string)[]]).or(z.literal('')).default('');

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name.').max(100, 'Please keep your name under 100 characters.'),
  email: z.string().trim().max(254, 'That email address is too long.').pipe(z.email('Please enter a valid email address.')),
  phone: optionalText(40),
  enterprise: optionalText(120),
  projectType: keyOf(PROJECT_TYPES) as z.ZodType<ProjectType | ''>,
  budget: keyOf(BUDGETS) as z.ZodType<Budget | ''>,
  scope: z
    .string()
    .trim()
    .min(10, 'Please tell us a little more about the project.')
    .max(5000, 'Please keep the description under 5,000 characters.'),
  referral: optionalText(200),
});

export type ContactInput = z.infer<typeof contactSchema>;

// Name of the hidden field bots tend to fill in. Real visitors never see it.
export const HONEYPOT_FIELD = 'website';
