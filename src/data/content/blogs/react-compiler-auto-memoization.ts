import type { BlogPost } from '@/types/blog';

const post: BlogPost = {
	slug: 'react-compiler-auto-memoization',
	title: 'React Compiler: Write Code, Skip the Optimization',
	excerpt:
		'Notes from running the React Compiler on the BetterDocs admin (a 4-year-old codebase with ~80 components and useMemo scattered everywhere) and starting clean with it on xCloud v1. What broke, what did not, and where I still reach for manual memoization.',
	thumbnail: 'https://images.unsplash.com/photo-1763568258244-9d5aa9c3ce45?w=800&q=80',
	category: 'React',
	tags: ['React', 'React Compiler', 'Performance', 'Optimization'],
	readTime: 7,
	publishedAt: '2026-04-12',
	featured: true,
	content: [
		{
			type: 'paragraph',
			text: 'Halfway through re-architecting the BetterDocs admin panel, I caught myself doing something silly — wrapping a calculation in useMemo, then a few weeks later removing the useMemo because the dependency check turned out to cost more than the calculation it was guarding. That kind of guesswork is what the React Compiler is meant to end. It reads your components, figures out what depends on what, and inserts memoization at build time.',
		},
		{
			type: 'paragraph',
			text: 'I have used it on two pretty different codebases now: BetterDocs admin (4 years old, ~80 components, useMemo grown organically across the surface) and xCloud v1 (greenfield, compiler on from day one). What follows is a mix of how the compiler works and what actually happened when I turned it on.',
		},
		{
			type: 'heading',
			text: 'The Problem It Solves',
		},
		{
			type: 'paragraph',
			text: 'Manual memoization has two failure modes. Over-memoize and you pay for equality checks that never save work — I have watched the React Profiler in Chrome literally show useMemo calls eating more frame time than the calculations they were guarding. Under-memoize and you ship re-renders nobody notices until a designer says the panel feels sluggish during typing. Both mistakes are invisible without profiling, and almost nobody profiles.',
		},
		{
			type: 'code',
			language: 'tsx',
			code: `// Before the compiler — manual memoization everywhere
const UserList = memo(({ users, onSelect }) => {
  const sortedUsers = useMemo(
    () => [...users].sort((a, b) => a.name.localeCompare(b.name)),
    [users],
  );

  const handleClick = useCallback(
    (user) => onSelect(user.id),
    [onSelect],
  );

  return sortedUsers.map((u) => (
    <UserRow key={u.id} user={u} onClick={handleClick} />
  ));
});

// After the compiler — identical runtime behavior
function UserList({ users, onSelect }) {
  const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));

  return sortedUsers.map((u) => (
    <UserRow key={u.id} user={u} onClick={() => onSelect(u.id)} />
  ));
}`,
		},
		{
			type: 'callout',
			variant: 'info',
			text: 'The compiler emits memoization instructions that React interprets at runtime. Your output bundle is slightly larger than raw source, but meaningfully smaller than hand-memoized code.',
		},
		{
			type: 'heading',
			text: 'How It Decides What To Memoize',
		},
		{
			type: 'paragraph',
			text: 'The compiler performs static analysis on your components to build a dependency graph. It identifies pure computations, stable references, and values derived from props or state. Anything that can be cached safely is cached. Anything ambiguous — side effects, non-deterministic calls, mutations — is left alone.',
		},
		{
			type: 'heading',
			text: 'The Rules of React',
		},
		{
			type: 'paragraph',
			text: 'The compiler only works on code that follows the Rules of React. If you mutate props, read refs during render, or break the rules of hooks, the compiler bails out on that component — sometimes silently. The accompanying ESLint plugin (eslint-plugin-react-compiler) flags violations before they become bugs.',
		},
		{
			type: 'list',
			items: [
				'Components and hooks must be pure — no side effects during render',
				'Never mutate props, state, or values received from hooks',
				'Always follow the rules of hooks (top-level calls, conditional-free)',
				'Do not read refs during render — only in effects or event handlers',
				'Keep effects free of setState in their body unless strictly guarded',
			],
		},
		{
			type: 'heading',
			text: 'Setting It Up',
		},
		{
			type: 'paragraph',
			text: 'The compiler ships as a Babel plugin. For Next.js, Vite, or any build tool that wraps Babel/SWC, enabling it is a configuration change.',
		},
		{
			type: 'code',
			language: 'javascript',
			code: `// next.config.ts
export default {
  experimental: {
    reactCompiler: true,
  },
};

// Or opt in incrementally per directory
export default {
  experimental: {
    reactCompiler: {
      compilationMode: 'annotation', // only components with "use memo"
    },
  },
};`,
		},
		{
			type: 'callout',
			variant: 'tip',
			text: "On an older codebase, start with annotation mode. Add 'use memo' directives to your hot paths first (in our case the BetterDocs analytics dashboard, which renders ApexCharts on every state change), measure the win, then flip to full compilation once the rest of the codebase is clean.",
		},
		{
			type: 'heading',
			text: 'What Broke When I Turned It On',
		},
		{
			type: 'paragraph',
			text: 'On a fresh build with the compiler enabled, around 12 of our ~80 BetterDocs admin components bailed out — the compiler refused to process them. The eslint-plugin-react-compiler linter had been quietly flagging those for weeks; the bailouts were mostly conditional hook calls and a few places where we were mutating data received from React Query (an old pattern from before we knew better). About half a day to fix, and the bailout count dropped to two — both intentional, around third-party library boundaries. xCloud v1 had zero bailouts on day one, which is the upside of starting clean.',
		},
		{
			type: 'heading',
			text: 'When I Still Memoize Manually',
		},
		{
			type: 'paragraph',
			text: 'With the compiler on, there are still a few cases where I reach for explicit useMemo. ApexCharts instances on the BetterDocs analytics dashboard re-render heavily on prop identity, so the chart factory has to be memoized at the component boundary. IntersectionObservers in infinite-scroll lists need stable callbacks to avoid teardown-and-reattach cycles. And a couple of older third-party form libraries on the Templately admin compare props by reference — explicit memoization stays in those spots.',
		},
		{
			type: 'heading',
			text: 'Debugging Compiled Code',
		},
		{
			type: 'paragraph',
			text: 'React DevTools shows a compiled badge on components the compiler has processed. If a component is mysteriously absent, either it violated the Rules of React or the compiler could not statically analyze it. The react-compiler-healthcheck CLI reports which files compiled successfully across your project — useful for tracking bailout count down over time.',
		},
		{
			type: 'heading',
			text: 'Where I Have Landed',
		},
		{
			type: 'paragraph',
			text: 'On new projects (xCloud v1 is the first), the compiler is on day one and I do not write useMemo or useCallback at all. On older codebases like BetterDocs, the migration is iterative — fix the lint violations, switch to annotation mode, profile the hot paths, then flip to full compilation. Either way, the era of guessing about memoization is over for me. That is the more important shift, more than any specific bundle-size win.',
		},
	],
};

export default post;
