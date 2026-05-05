import type { BlogPost } from '@/types/blog';

const post: BlogPost = {
	slug: 'typescript-5-new-features',
	title: 'TypeScript 5.0: Features That Changed How I Write Code',
	excerpt:
		'A handful of TypeScript 5.x features changed how I write code day-to-day on the Templately admin and sapan.dev. Notes on the ones I reach for constantly — `satisfies`, `const` type parameters, `using` — and the ones I have not yet found a real use for.',
	thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
	category: 'TypeScript',
	tags: ['TypeScript', 'JavaScript', 'Developer Experience'],
	readTime: 6,
	publishedAt: '2026-02-22',
	featured: true,
	content: [
		{
			type: 'paragraph',
			text: 'On the Templately admin, the cleanup pass after upgrading to TypeScript 5 was a study in how much friction a few new features can remove. The `satisfies` operator alone replaced a dozen awkward `as const` assertions in our config objects. The new `const` type parameters fixed a handful of generic helpers that had been quietly widening literal types for years. Below are the TS 5 features I now reach for constantly, the ones I rarely use, and the changes the upgrade actually made to working code.',
		},
		{
			type: 'paragraph',
			text: 'TypeScript has been on a remarkable trajectory. Each release brings features that feel like they should have existed from the start. TypeScript 5.x in particular delivered several quality-of-life improvements that I now consider essential in every project.',
		},
		{
			type: 'heading',
			text: 'Const Type Parameters',
		},
		{
			type: 'paragraph',
			text: 'Before const type parameters, getting TypeScript to infer literal types from generic functions required awkward workarounds. Now you can annotate a type parameter with const and TypeScript infers the narrowest possible type.',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `// Before: TypeScript infers string[]
function makeArray<T>(items: T[]): T[] {
  return items;
}
const arr = makeArray(['a', 'b']); // string[]

// After: TypeScript infers ["a", "b"]
function makeArray<const T extends readonly unknown[]>(items: T): T {
  return items;
}
const arr = makeArray(['a', 'b'] as const); // readonly ["a", "b"]`,
		},
		{
			type: 'heading',
			text: 'Decorators (The Real Ones)',
		},
		{
			type: 'paragraph',
			text: 'TypeScript 5.0 finally shipped the TC39 Stage 3 decorators spec, replacing the experimental decorators that required a compiler flag. This means your decorators are now standards-compliant and future-proof.',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `function log(target: any, context: ClassMethodDecoratorContext) {
  return function (this: any, ...args: any[]) {
    console.log(\`Calling \${String(context.name)}\`);
    return target.call(this, ...args);
  };
}

class UserService {
  @log
  getUser(id: string) {
    return fetch(\`/api/users/\${id}\`);
  }
}`,
		},
		{
			type: 'heading',
			text: 'The satisfies Operator',
		},
		{
			type: 'paragraph',
			text: 'The satisfies operator validates that a value conforms to a type without widening it. This is incredibly useful for configuration objects where you want both type safety and inference of literal types.',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `type Colors = 'red' | 'green' | 'blue';
type ColorConfig = { [K in Colors]?: string };

// Without satisfies: palette.red is string | undefined
const palette: ColorConfig = { red: '#ff0000', green: '#00ff00' };

// With satisfies: palette.red is "#ff0000" (literal type)
const palette = {
  red: '#ff0000',
  green: '#00ff00',
} satisfies ColorConfig;`,
		},
		{
			type: 'heading',
			text: 'Using Declarations',
		},
		{
			type: 'paragraph',
			text: 'TypeScript 5.2 added the using keyword, implementing the TC39 Explicit Resource Management proposal. Resources with a [Symbol.dispose]() method are automatically cleaned up when they leave scope.',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `function getConnection() {
  const conn = openDBConnection();
  return {
    query: conn.query.bind(conn),
    [Symbol.dispose]() {
      conn.close();
    },
  };
}

function processData() {
  using conn = getConnection(); // auto-closes on scope exit
  return conn.query('SELECT * FROM users');
}`,
		},
		{
			type: 'callout',
			variant: 'tip',
			text: 'Enable useDefineForClassFields and the new decorator support in your tsconfig. Set target to ES2022 or later for the best compatibility with modern decorators.',
		},
		{
			type: 'heading',
			text: 'Performance Improvements',
		},
		{
			type: 'paragraph',
			text: 'Beyond language features, TypeScript 5.x brought significant build performance improvements. The new module resolution modes (bundler, node16, nodenext) more accurately reflect how modern bundlers resolve modules, reducing false type errors.',
		},
		{
			type: 'list',
			items: [
				'--moduleResolution bundler for Vite, esbuild, and similar tools',
				'Project references for monorepo type-checking parallelism',
				'skipLibCheck improvements to speed up initial type checking',
				'Isolated declarations for faster parallel builds',
			],
		},
		{
			type: 'heading',
			text: 'What I Reach For Most',
		},
		{
			type: 'paragraph',
			text: "Across the Templately admin, sapan.dev, and the smaller side projects I have rewritten in the past year, three TS 5 features come up constantly: `satisfies` (every config object), `const` type parameters (any helper that takes a tuple of options), and the new module resolution modes (which finally got Vite-resolved imports working without phantom red squiggles). Decorators I have not used yet — most of my code is functional and the use cases haven't shown up. `using` declarations are useful but niche; I have used them exactly once, for a Firebase admin connection in a test setup. Worth knowing the whole feature set, but it is OK if you only use the three above.",
		},
	],
};

export default post;
