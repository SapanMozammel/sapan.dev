import type { BlogPost } from '@/types/blog';

const post: BlogPost = {
	slug: 'react-suspense-streaming-patterns',
	title: 'React Suspense Patterns: Streaming UI with Confidence',
	excerpt:
		'sapan.dev streams its blog index from the server using Suspense — skeleton card, then progressive content as the data resolves. Notes on the Suspense patterns I keep reaching for in App Router, and the moments where I had to fall back to client-side loading states instead.',
	thumbnail: 'https://images.unsplash.com/photo-1610986602726-19f650133f7a?w=800&q=80',
	category: 'React',
	tags: ['React', 'Suspense', 'Streaming', 'Data Fetching'],
	readTime: 8,
	publishedAt: '2025-08-28',
	featured: false,
	content: [
		{
			type: 'paragraph',
			text: 'On sapan.dev the blog index is the place where Suspense earns its keep. The post list comes from a server-side data layer; instead of a full-page spinner while everything resolves, the layout (header, sidebar, footer) renders immediately, and a Suspense boundary streams in the cards as the data is ready. The user never sees a blank page, and the time-to-first-meaningful-paint is dramatically better than the old useEffect + skeleton dance. Below is what I actually do with Suspense in App Router and where I have learned to stop reaching for it.',
		},
		{
			type: 'paragraph',
			text: "Suspense has existed since React 16.6 but only became production-ready with React 18's concurrent rendering. Now paired with Server Components in React 19, it is the fundamental primitive for handling async UI — loading states, data fetching boundaries, and progressive hydration all flow from one mental model.",
		},
		{
			type: 'heading',
			text: 'The Mental Model',
		},
		{
			type: 'paragraph',
			text: 'Suspense lets a component declare "I am not ready yet" without rendering a spinner itself. A parent Suspense boundary catches the "not ready" signal and renders a fallback until the child is ready. When the data arrives, React swaps in the real content — no useEffect dance, no manual state machines.',
		},
		{
			type: 'code',
			language: 'tsx',
			code: `// The fundamental pattern
<Suspense fallback={<Skeleton />}>
  <UserProfile userId={id} />
</Suspense>

// UserProfile uses a Suspense-aware data source
// (use() hook, React Query, Relay, Next.js fetch, etc.)
function UserProfile({ userId }: { userId: string }) {
  const user = use(fetchUser(userId)); // suspends until resolved
  return <div>{user.name}</div>;
}`,
		},
		{
			type: 'heading',
			text: 'The use() Hook',
		},
		{
			type: 'paragraph',
			text: 'React 19 introduces use() — a hook that reads the value from a promise, suspending until the promise resolves. Unlike other hooks, use() can be called conditionally and inside loops. It is the canonical way to integrate promises with Suspense.',
		},
		{
			type: 'code',
			language: 'tsx',
			code: `// Create the promise outside the render (or memoize it)
const userPromise = fetchUser(id);

function Component() {
  // use() suspends the component until the promise resolves
  const user = use(userPromise);
  return <div>{user.name}</div>;
}

// use() works with Context too
function Theme() {
  const theme = use(ThemeContext);
  return <div className={theme}>...</div>;
}`,
		},
		{
			type: 'callout',
			variant: 'warning',
			text: 'Never create a promise inside the render body — it creates a new promise every render, causing infinite suspension. Create promises in event handlers, server components, or wrap them in useMemo.',
		},
		{
			type: 'heading',
			text: 'Streaming with Multiple Boundaries',
		},
		{
			type: 'paragraph',
			text: 'A single Suspense boundary is fine for simple pages. The real power shows up with multiple boundaries — independent sections of UI can load in parallel and reveal as their data arrives, instead of waiting for the slowest.',
		},
		{
			type: 'code',
			language: 'tsx',
			code: `// Layout with three independent streaming sections
export default function DashboardPage() {
  return (
    <>
      <Header />

      <Suspense fallback={<StatsSkeleton />}>
        <AccountStats />        {/* fetches from /api/stats */}
      </Suspense>

      <Suspense fallback={<FeedSkeleton />}>
        <ActivityFeed />        {/* fetches from /api/activity */}
      </Suspense>

      <Suspense fallback={<RecommendationsSkeleton />}>
        <Recommendations />     {/* fetches from /api/recommendations */}
      </Suspense>
    </>
  );
}`,
		},
		{
			type: 'heading',
			text: 'Avoiding Waterfalls',
		},
		{
			type: 'paragraph',
			text: 'The classic anti-pattern is nested components that each fetch sequentially. Parent loads, then child loads, then grandchild loads. With Suspense, the fix is to kick off all the fetches in parallel at the top level and pass down the promises.',
		},
		{
			type: 'code',
			language: 'tsx',
			code: `// ❌ Waterfall — each fetch waits for the previous
function Page({ id }) {
  const user = use(fetchUser(id));
  return <Posts userId={user.id} />;
}

function Posts({ userId }) {
  const posts = use(fetchPosts(userId)); // waits for user
  return <PostList posts={posts} />;
}

// ✅ Parallel — kick both off together
function Page({ id }) {
  // Promises start in parallel
  const userPromise = fetchUser(id);
  const postsPromise = fetchPosts(id);

  return (
    <>
      <Suspense fallback={<UserSkeleton />}>
        <User promise={userPromise} />
      </Suspense>
      <Suspense fallback={<PostsSkeleton />}>
        <Posts promise={postsPromise} />
      </Suspense>
    </>
  );
}`,
		},
		{
			type: 'heading',
			text: 'Error Boundaries Alongside Suspense',
		},
		{
			type: 'paragraph',
			text: 'Suspense catches the pending state. Error Boundaries catch thrown errors. A robust UI needs both — Suspense for loading, ErrorBoundary for failure. Wrap each async section in both for independent recovery.',
		},
		{
			type: 'code',
			language: 'tsx',
			code: `import { ErrorBoundary } from 'react-error-boundary';

<ErrorBoundary fallback={<ErrorMessage />}>
  <Suspense fallback={<Skeleton />}>
    <AsyncContent />
  </Suspense>
</ErrorBoundary>

// With retry capability
<ErrorBoundary
  fallbackRender={({ resetErrorBoundary }) => (
    <div>
      <p>Something went wrong.</p>
      <button onClick={resetErrorBoundary}>Retry</button>
    </div>
  )}
>
  <Suspense fallback={<Skeleton />}>
    <AsyncContent />
  </Suspense>
</ErrorBoundary>`,
		},
		{
			type: 'heading',
			text: 'startTransition for Non-Blocking Updates',
		},
		{
			type: 'paragraph',
			text: 'When state updates cause a Suspense boundary to fall back to the skeleton, the UI flashes. startTransition marks an update as non-urgent — React shows the stale UI until the new data is ready, then swaps atomically. No flash, no flicker.',
		},
		{
			type: 'code',
			language: 'tsx',
			code: `import { useTransition, useState } from 'react';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <input
        value={query}
        onChange={(e) => {
          // Wrap the state update that triggers Suspense
          startTransition(() => setQuery(e.target.value));
        }}
      />
      <Suspense fallback={<Skeleton />}>
        <Results query={query} />
        {isPending && <SubtlePendingIndicator />}
      </Suspense>
    </>
  );
}`,
		},
		{
			type: 'callout',
			variant: 'tip',
			text: 'Use startTransition for any state update that would cause a noticeable fallback flash — search queries, filter changes, tab switches. Urgent updates like input typing should stay outside transitions so they feel instant.',
		},
		{
			type: 'heading',
			text: 'Server Components + Suspense',
		},
		{
			type: 'paragraph',
			text: 'In Next.js App Router, every async Server Component implicitly uses Suspense. The server streams HTML progressively as async work completes, and the browser assembles the page as chunks arrive. You rarely write Suspense boundaries manually — they are inferred by the framework for anywhere async work happens.',
		},
		{
			type: 'heading',
			text: 'Debugging Suspense',
		},
		{
			type: 'paragraph',
			text: 'The React DevTools Profiler shows suspend/resume events. When a component suspends, you see which Suspense boundary caught it and how long the fallback displayed. For production, track fallback display times — excessive fallback time means your async work is too slow or your boundaries are placed incorrectly.',
		},
		{
			type: 'heading',
			text: 'Conclusion',
		},
		{
			type: 'paragraph',
			text: 'On sapan.dev the Suspense boundaries are placed around each substantive section — the blog list, the experience timeline, the testimonials marquee — so each can resolve and stream independently rather than blocking each other. The places I have learned NOT to use Suspense: anything where the fallback would be visible for less than ~150ms (it just looks like a flicker), and anything where the user is in an active flow (mid-form submission, mid-search). Both of those are still better served by a local pending state. For everything else — first paint, navigation, route boundaries — Suspense is the foundation to build on. Combined with `use()`, `startTransition`, and Error Boundaries, it absorbs the manual state machines that dominated React data fetching for a decade.',
		},
	],
};

export default post;
