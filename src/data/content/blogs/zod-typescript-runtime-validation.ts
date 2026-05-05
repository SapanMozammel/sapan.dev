import type { BlogPost } from '@/types/blog';

const post: BlogPost = {
	slug: 'zod-typescript-runtime-validation',
	title: 'Zod Meets TypeScript: Runtime-Safe Types at the Boundaries',
	excerpt:
		'On TubeOnAI we wired Zod into every API boundary, every form, and every Firebase response — and the next month our error tracker stopped recording shape-mismatch bugs entirely. Notes on the Zod patterns I now reach for by default.',
	thumbnail: 'https://images.unsplash.com/photo-1509822929063-6b6cfc9b42f2?w=800&q=80',
	category: 'TypeScript',
	tags: ['TypeScript', 'Zod', 'Validation', 'Runtime Safety'],
	readTime: 7,
	publishedAt: '2026-02-15',
	featured: false,
	content: [
		{
			type: 'paragraph',
			text: 'Early on at TubeOnAI, our error tracker (Sentry) was reporting a steady trickle of "cannot read property of undefined" bugs that all traced back to API responses not matching the TypeScript types we expected. The types said one shape, the API returned another, and the bug only surfaced when a user clicked through to a screen that depended on the missing field. We rewrote the data layer to push every API response through a Zod schema. The shape-mismatch bugs in Sentry dropped to zero the following month.',
		},
		{
			type: 'paragraph',
			text: 'TypeScript is erased at runtime. The moment data enters your app from an API, a form, a URL parameter, or localStorage, your types are a hope rather than a guarantee. Zod is the most popular library for closing that gap — schemas that validate at runtime and infer types at compile time, from a single source of truth.',
		},
		{
			type: 'heading',
			text: 'Schema First, Types Auto-Generated',
		},
		{
			type: 'paragraph',
			text: 'The Zod workflow inverts the usual TypeScript flow. Instead of writing a type and hoping the data matches, you write a schema that validates the data and get the type for free.',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `import { z } from 'zod';

// Define the schema once
const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  age: z.number().int().min(0).max(150),
  role: z.enum(['admin', 'user', 'guest']),
  createdAt: z.coerce.date(),
  metadata: z.record(z.unknown()).optional(),
});

// Type inferred from schema — no duplication
type User = z.infer<typeof UserSchema>;

// Parse runtime data safely
const result = UserSchema.safeParse(untrustedData);

if (result.success) {
  // result.data is typed as User
  console.log(result.data.email);
} else {
  // result.error is a ZodError with detailed paths
  console.error(result.error.issues);
}`,
		},
		{
			type: 'callout',
			variant: 'info',
			text: 'z.infer<typeof Schema> is the magic. Your schema is a single source of truth for both runtime validation and compile-time types. Update the schema, types update automatically.',
		},
		{
			type: 'heading',
			text: 'Where to Apply It',
		},
		{
			type: 'paragraph',
			text: 'Zod belongs at every boundary where untrusted data enters your system. API response parsing, form submission handling, URL parameter decoding, environment variable validation, localStorage reads, WebSocket messages — anywhere the TypeScript compiler has no way to verify shape.',
		},
		{
			type: 'list',
			items: [
				'API responses — wrap fetch calls and parse the response before using it',
				'Environment variables — validate process.env at startup, crash early if missing',
				'URL search params and route parameters — never trust user input',
				'Form submissions — validate before sending to the server',
				'localStorage and sessionStorage — data may have been written by an older app version',
				'Third-party SDK responses — external APIs change without warning',
			],
		},
		{
			type: 'heading',
			text: 'API Response Validation Pattern',
		},
		{
			type: 'paragraph',
			text: 'Wrap your fetch calls in a helper that parses the response through a Zod schema. Your business logic never sees unvalidated data.',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `async function fetchTyped<T extends z.ZodTypeAny>(
  url: string,
  schema: T,
  init?: RequestInit,
): Promise<z.infer<T>> {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);

  const json = await res.json();
  return schema.parse(json);
}

// Usage — fully type-safe
const PostsSchema = z.array(z.object({
  id: z.string(),
  title: z.string(),
  publishedAt: z.coerce.date(),
}));

const posts = await fetchTyped('/api/posts', PostsSchema);
// posts is Array<{ id: string; title: string; publishedAt: Date }>`,
		},
		{
			type: 'heading',
			text: 'Form Validation with React Hook Form',
		},
		{
			type: 'paragraph',
			text: 'Zod pairs naturally with React Hook Form via @hookform/resolvers. One schema drives field-level validation, error messages, and the final submitted type.',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const SignupSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'At least 8 characters'),
  confirm: z.string(),
}).refine((data) => data.password === data.confirm, {
  message: 'Passwords do not match',
  path: ['confirm'],
});

type SignupData = z.infer<typeof SignupSchema>;

function SignupForm() {
  const form = useForm<SignupData>({
    resolver: zodResolver(SignupSchema),
  });

  return <form onSubmit={form.handleSubmit(onSubmit)}>...</form>;
}`,
		},
		{
			type: 'heading',
			text: 'Transforms and Preprocessors',
		},
		{
			type: 'paragraph',
			text: 'Zod can transform data as it validates. Coerce strings to numbers, trim whitespace, uppercase emails, parse JSON — transformation and validation happen in one pass.',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `const EnvSchema = z.object({
  PORT: z.coerce.number().int().positive(),
  DATABASE_URL: z.string().url(),
  DEBUG: z.coerce.boolean().default(false),
  ALLOWED_ORIGINS: z.string().transform((s) => s.split(',').map((o) => o.trim())),
});

// Parse at startup — app crashes with clear error if misconfigured
export const env = EnvSchema.parse(process.env);`,
		},
		{
			type: 'callout',
			variant: 'tip',
			text: 'Use safeParse when you can recover from invalid data (form fields, optional features). Use parse when invalid data is unrecoverable (env vars at startup, critical API contracts). The difference is crashing early vs rendering an error message.',
		},
		{
			type: 'heading',
			text: 'Bundle Size Considerations',
		},
		{
			type: 'paragraph',
			text: 'Zod is 15KB minified + gzipped. For most apps that is fine. If bundle size matters more than features, consider Valibot (3KB) or the newer ArkType which compiles schemas to validator functions. The API shape is similar enough that migration is mechanical.',
		},
		{
			type: 'heading',
			text: 'Conclusion',
		},
		{
			type: 'paragraph',
			text: 'On TubeOnAI, the Zod migration paid for itself by the second sprint — Sentry stopped flagging shape-mismatch errors, the form validation got tighter, and the engineers added schemas faster than I expected once the pattern was visible. Runtime validation is not optional for production TypeScript code. The only real choice is whether you validate with a schema library or by hand. Zod wins because it is expressive, composable, and generates types directly from schemas — removing the worst kind of duplication.',
		},
	],
};

export default post;
