import type { BlogPost } from '@/types/blog';

const post: BlogPost = {
	slug: 'edge-computing-frontend-cloudflare-workers',
	title: 'Edge Computing for Frontend Developers',
	excerpt:
		'On sapan.dev the locale-detection logic lives at Vercel Edge — sub-30ms response from anywhere on the planet. On TubeOnAI we used Cloudflare Workers for auth-token validation. Notes on what genuinely belongs at the edge and what I have learned the hard way to keep regional.',
	thumbnail: 'https://images.unsplash.com/photo-1719253480609-579ad1622c65?w=800&q=80',
	category: 'Performance',
	tags: ['Edge', 'Cloudflare', 'Workers', 'Performance', 'Deployment'],
	readTime: 8,
	publishedAt: '2026-03-14',
	featured: false,
	content: [
		{
			type: 'paragraph',
			text: 'sapan.dev serves traffic from 16 locales. The first time I deployed it as a regional Vercel function, a friend in Singapore reported the locale redirect taking 600ms — not the page render, just the redirect deciding which language to serve. After moving the locale-detection middleware to Vercel Edge, the same redirect runs in under 30ms anywhere. That is the kind of win edge runtimes give you on frontend-shaped workloads.',
		},
		{
			type: 'paragraph',
			text: 'Traditional serverless ran in a handful of cloud regions. Cold starts took 500ms. Your Tokyo user talked to an us-east-1 server. Edge computing fixes this by running your code in every major city on Earth. Cold starts measured in milliseconds. Round-trip latency under 50ms for nearly every user. For frontend-heavy workloads, the win is substantial.',
		},
		{
			type: 'heading',
			text: 'What Makes the Edge Different',
		},
		{
			type: 'paragraph',
			text: 'Edge runtimes trade the full Node.js API surface for extreme efficiency. They boot in milliseconds by using V8 isolates instead of full processes. No module loading, no dependency initialization — just execution. The tradeoff is that many Node APIs are unavailable.',
		},
		{
			type: 'list',
			items: [
				'No filesystem access — no fs.readFile, no native modules',
				'No process spawning — no child_process, no native binaries',
				'Limited npm compatibility — libraries depending on Node APIs fail',
				'Fetch, streams, and Web Crypto work normally — web-standard APIs only',
				'Execution time caps: typically 30-50ms CPU per request',
			],
		},
		{
			type: 'heading',
			text: 'The Big Three Edge Platforms',
		},
		{
			type: 'paragraph',
			text: 'Cloudflare Workers, Vercel Edge Functions, and Deno Deploy are the dominant options. They differ in pricing, bundled storage, and developer experience, but the core execution model is the same — V8 isolates, web-standard APIs, global distribution.',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `// Cloudflare Worker
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const user = await env.KV.get(\`user:\${url.searchParams.get('id')}\`);
    return Response.json({ user });
  },
};

// Vercel Edge Function
export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const country = req.headers.get('x-vercel-ip-country');
  return Response.json({ country });
}

// Deno Deploy
Deno.serve((req) => {
  return new Response('Hello from ' + Deno.env.get('DENO_REGION'));
});`,
		},
		{
			type: 'heading',
			text: 'Cloudflare Workers Bindings',
		},
		{
			type: 'paragraph',
			text: 'Workers become dramatically more powerful when combined with Cloudflare storage — KV for low-latency key-value, R2 for object storage, D1 for SQLite at the edge, Durable Objects for strongly-consistent state. All bindings are zero-config — you declare them in wrangler.toml and access them via the env parameter.',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `// wrangler.toml
// [[kv_namespaces]]
// binding = "SESSIONS"
// id = "abc123..."

export default {
  async fetch(req: Request, env: Env) {
    const sessionId = getCookie(req, 'sid');

    // KV is strongly consistent in the origin region,
    // eventually consistent at other edges (~60s)
    const session = await env.SESSIONS.get(sessionId, 'json');

    if (!session) return Response.redirect('/login', 302);
    return new Response(\`Welcome \${session.user}\`);
  },
};`,
		},
		{
			type: 'heading',
			text: 'What Belongs at the Edge',
		},
		{
			type: 'paragraph',
			text: 'Not every route benefits from edge execution. The win is biggest when the response depends on the request origin, when latency matters, and when state is read more than written.',
		},
		{
			type: 'list',
			items: [
				'Authentication and session validation — fast failure paths',
				'Personalization — A/B tests, feature flags, locale redirects',
				'API gateways and request routing — rewriting URLs, adding headers',
				'Image transformation and resizing on the fly',
				'Content negotiation based on geo or user-agent',
				'Edge rendering of static pages with tiny dynamic pieces',
			],
		},
		{
			type: 'heading',
			text: 'What Should Stay in Traditional Servers',
		},
		{
			type: 'list',
			items: [
				'Long-running computation beyond the CPU budget',
				'Large file processing or streaming from local disk',
				'Workloads that need PostgreSQL, Redis, or other non-HTTP databases directly',
				'Complex business logic with deep node_modules trees',
				'Anything that assumes a stable filesystem or long-lived memory state',
			],
		},
		{
			type: 'callout',
			variant: 'info',
			text: 'The typical pattern is hybrid — edge for auth/personalization/routing, regional serverless or traditional servers for heavy business logic and database-intensive work. The edge becomes the entry point, not the only layer.',
		},
		{
			type: 'heading',
			text: 'Cold Start Reality',
		},
		{
			type: 'paragraph',
			text: 'Cloudflare Workers V8 isolate cold starts are consistently under 5ms. Vercel Edge Functions are similar. Compare to AWS Lambda where cold starts are 200-500ms for Node and multi-second for larger runtimes. For latency-sensitive routes, edge removes an entire class of performance problems.',
		},
		{
			type: 'heading',
			text: 'The Cost Model',
		},
		{
			type: 'paragraph',
			text: 'Edge pricing is typically per-request plus CPU time, which makes it extremely cheap for high-volume low-CPU work (auth checks, redirects) and relatively expensive for heavy compute. The Cloudflare free tier is generous — 100k requests per day, enough to run a hobby project indefinitely. Production workloads at scale compete favorably with Lambda for most frontend patterns.',
		},
		{
			type: 'callout',
			variant: 'tip',
			text: 'Start edge-first for new projects. If you hit a limitation (database driver, CPU budget), fall back to regional. The reverse migration — from regional to edge — is much harder because you have likely taken deep dependencies on Node APIs.',
		},
		{
			type: 'heading',
			text: 'Conclusion',
		},
		{
			type: 'paragraph',
			text: 'On TubeOnAI we tried running auth-token verification at the edge using Cloudflare Workers — straightforward win, the validation is fast and stateless. We also tried doing the AI summarization itself there, briefly, and that was a mistake. Long-running compute, big SDK trees, and direct database access all want a regional function. The pattern that worked for us: edge for auth, redirects, locale routing, simple personalization; regional for anything heavy. Edge is less about replacing your backend and more about collapsing the auth/routing layer closer to the user. Done right, the experience feels noticeably snappier than it has any right to.',
		},
	],
};

export default post;
