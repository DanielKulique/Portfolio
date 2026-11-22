/** Public profile and explicitly authorized contacts; absent actions are never rendered. */
export interface ProfessionalContact {
  kind: 'github' | 'linkedin' | 'email';
  href: `https://${string}` | `mailto:${string}`;
  label: string;
  authorized: true;
}
export interface PublicResume {
  href: `/documents/${string}.pdf`;
  authorized: true;
}
interface Profile {
  name: string;
  fullName: string;
  github: `https://${string}`;
  education: string;
  campus: string;
  contacts: ProfessionalContact[];
  resume: PublicResume | null;
}
export const profile: Profile = {
  name: 'Daniel Kulique',
  fullName: 'Daniel Ricardo Kulique dos Passos',
  github: 'https://github.com/DanielKulique',
  education: 'Universidade Tecnológica Federal do Paraná',
  campus: 'Ponta Grossa',
  contacts: [
    {
      kind: 'linkedin',
      href: 'https://www.linkedin.com/in/daniel-kulique-dos-passos-36a80425a/',
      label: 'LinkedIn',
      authorized: true,
    },
    {
      kind: 'github',
      href: 'https://github.com/DanielKulique',
      label: 'GitHub',
      authorized: true,
    },
  ],
  resume: null,
};
