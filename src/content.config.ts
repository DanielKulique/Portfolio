/** Validates bilingual case studies; drafts cannot enter the generated route set. */
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const text = z.string().min(1);
const caseStudy = z.object({
  title: text,
  summary: text,
  subtitle: text.optional(),
  overview: text.optional(),
  execution: z
    .object({ requirements: text, commands: text, note: text })
    .optional(),
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
      repository: z.url().startsWith('https://github.com/').optional(),
      evidence: z
        .object({
          kind: z.enum(['source', 'screenshot', 'test-output', 'prototype']),
          source: z.url().startsWith('https://github.com/'),
          snippet: text.optional(),
          image: z.enum(['aco', 'apoo']).optional(),
          caption: z.object({ 'pt-BR': text, en: text }),
        })
        .optional(),
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
      if (entry.draft) return;
      for (const locale of ['pt-BR', 'en'] as const) {
        for (const field of ['overview', 'execution'] as const) {
          if (!entry.content[locale][field])
            ctx.addIssue({
              code: 'custom',
              path: ['content', locale, field],
              message:
                'Published studies require an overview and run instructions.',
            });
        }
      }
      if (!entry.evidence || (!entry.evidence.image && !entry.evidence.snippet))
        ctx.addIssue({
          code: 'custom',
          path: ['evidence'],
          message:
            'Published studies require a usable, attributed evidence artifact.',
        });
      if (!entry.draft && entry.sources.length === 0)
        ctx.addIssue({
          code: 'custom',
          message: 'Published studies require public evidence.',
        });
    }),
});
export const collections = { projects };
