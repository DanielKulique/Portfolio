/** Validates bilingual case studies; drafts cannot enter the generated route set. */
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const text = z.string().min(1);
const caseStudy = z.object({
  title: text,
  summary: text,
  context: text,
  status: text,
  problem: text,
  objective: text,
  contribution: text,
  solution: text,
  architecture: text,
  decisions: text,
  challenges: text,
  tests: text,
  results: text,
  limitations: text,
  learnings: text,
});
const projects = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
  schema: z
    .object({
      slug: z.string().regex(/^[a-z0-9-]+$/),
      draft: z.boolean(),
      order: z.number().int().nonnegative(),
      categories: z
        .array(
          z.enum([
            'backend',
            'ai',
            'research',
            'systems',
            'games',
            'automation',
            'data',
          ]),
        )
        .min(1),
      technologies: z.array(text).min(1),
      visual: z.enum([
        'network',
        'pipeline',
        'arena',
        'maze',
        'graph',
        'colors',
        'research',
      ]),
      sources: z.array(
        z.object({
          label: text,
          url: z.url().startsWith('https://github.com/'),
        }),
      ),
      images: z
        .array(
          z.object({ src: text, alt: z.object({ 'pt-BR': text, en: text }) }),
        )
        .default([]),
      demo: z.url().optional(),
      content: z.object({ 'pt-BR': caseStudy, en: caseStudy }),
    })
    .superRefine((entry, ctx) => {
      if (!entry.draft && entry.sources.length === 0)
        ctx.addIssue({
          code: 'custom',
          message: 'Published studies require public evidence.',
        });
    }),
});
export const collections = { projects };
