import type { BlogPost } from '@/types/blog';

const post: BlogPost = {
	slug: 'state-management-2025-zustand-jotai-redux',
	title: 'State Management in 2025: Zustand, Jotai, and Redux Toolkit',
	excerpt:
		'Templately runs on Redux Toolkit. TubeOnAI is React Query for server state and a small Zustand store for UI. sapan.dev gets by on Redux Toolkit + URL state. Three projects, three different state strategies, and the pattern that emerged for picking between them.',
	thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
	category: 'React',
	tags: ['React', 'State Management', 'Zustand', 'Jotai', 'Redux'],
	readTime: 8,
	publishedAt: '2025-12-15',
	featured: false,
	content: [
		{
			type: 'paragraph',
			text: 'In the past two years I have shipped React apps that ended up using three different state strategies. Templately is on Redux Toolkit because the team adopted it early and the patterns are deeply baked in. TubeOnAI runs React Query for server state and a small Zustand store for transient UI (player state, modal flags). sapan.dev gets by entirely on Redux Toolkit + URL state, no React Query at all. Below is the pattern that emerged across them — and the things I would not do twice.',
		},
		{
			type: 'paragraph',
			text: 'The state management conversation in the React ecosystem has changed dramatically. Context API closed the gap for simple cases, React Query and SWR own server state, and the remaining client state problem is served by a range of lean, focused libraries.',
		},
		{
			type: 'heading',
			text: 'Server State vs Client State',
		},
		{
			type: 'paragraph',
			text: 'Before comparing libraries, the most impactful architectural decision is separating server state from client state. Server state (remote data, async operations) belongs in React Query, SWR, or RTK Query. Client state (UI state, user preferences, shopping cart) belongs in a state manager.',
		},
		{
			type: 'callout',
			variant: 'info',
			text: 'If you are using Redux to store API responses and manage loading states, migrate to React Query first. You may find that very little Redux remains afterward.',
		},
		{
			type: 'heading',
			text: 'Zustand: Simple, Flat, Minimal',
		},
		{
			type: 'paragraph',
			text: 'Zustand is a 1KB state manager built around a single hook. You define a store as a function that returns state and actions — no reducers, no action types, no boilerplate.',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `import { create } from 'zustand';

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  total: () => number;
};

const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  total: () => get().items.reduce((sum, item) => sum + item.price, 0),
}));

// Usage
function CartSummary() {
  const total = useCartStore((state) => state.total());
  return <span>Total: \${total}</span>;
}`,
		},
		{
			type: 'heading',
			text: 'Jotai: Atomic State for Fine-Grained Reactivity',
		},
		{
			type: 'paragraph',
			text: 'Jotai takes a different approach — rather than a single store, you compose state from atoms. Components subscribe only to the atoms they use, minimizing re-renders. This makes it excellent for complex UIs with many independent pieces of state.',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `import { atom, useAtom, useAtomValue } from 'jotai';

const countAtom = atom(0);
const doubledAtom = atom((get) => get(countAtom) * 2);

// Derived async atom
const userAtom = atom(async (get) => {
  const id = get(userIdAtom);
  return fetch(\`/api/users/\${id}\`).then((r) => r.json());
});

function Counter() {
  const [count, setCount] = useAtom(countAtom);
  const doubled = useAtomValue(doubledAtom);

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
      <span>Doubled: {doubled}</span>
    </div>
  );
}`,
		},
		{
			type: 'heading',
			text: 'Redux Toolkit: When You Need the Big Gun',
		},
		{
			type: 'paragraph',
			text: 'Redux Toolkit (RTK) remains the right choice for large applications with complex state interactions, time-travel debugging requirements, or existing Redux codebases. RTK Query in particular is an excellent solution for API state management.',
		},
		{
			type: 'heading',
			text: 'Decision Framework',
		},
		{
			type: 'list',
			items: [
				'Simple app, few global states → Zustand or Context API',
				'Complex UI with many independent states → Jotai',
				'Large team, enterprise app, existing Redux → Redux Toolkit',
				'Server state (API data) → React Query or RTK Query',
				'Form state → React Hook Form (not a state manager)',
			],
		},
		{
			type: 'callout',
			variant: 'tip',
			text: 'Start with Zustand. It has the lowest learning curve, the smallest bundle, and can scale further than most apps ever need. Switch to RTK if you genuinely need devtools, middleware, or the Redux ecosystem.',
		},
		{
			type: 'heading',
			text: 'Conclusion',
		},
		{
			type: 'paragraph',
			text: 'Across Templately, TubeOnAI, and sapan.dev, the lesson that surfaced repeatedly: separate server state from client state first, then pick the smallest library that fits the remaining client state. Most projects I have started in the past year reach for React Query plus a tiny Zustand store, and the team rarely outgrows that combination. Redux still earns its keep when the state machine is genuinely complex, the team is large, or you need the time-travel debugging — but those are increasingly the exceptions, not the rule. The best state manager is the one your team can read at a glance six months from now.',
		},
	],
};

export default post;
