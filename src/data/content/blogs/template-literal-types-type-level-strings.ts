import type { BlogPost } from '@/types/blog';

const post: BlogPost = {
	slug: 'template-literal-types-type-level-strings',
	title: 'Template Literal Types: Type-Level String Manipulation',
	excerpt:
		'On sapan.dev I wrote a small typed event-emitter for the contact-modal flow that felt like magic — string keys, fully typed payloads, no manual annotation. Template literal types are doing the work. Notes on the patterns I now reach for and the moments TypeScript pushes back.',
	thumbnail: 'https://images.unsplash.com/photo-1685558593626-686907d7ee4b?w=800&q=80',
	category: 'TypeScript',
	tags: ['TypeScript', 'Template Literals', 'Type Magic', 'Inference'],
	readTime: 7,
	publishedAt: '2025-09-15',
	featured: false,
	content: [
		{
			type: 'paragraph',
			text: 'A while back I was writing a small event emitter for the sapan.dev contact-modal flow — open/close events, form-state events, validation events. The first version used plain strings and untyped payloads, and within a week I was already chasing bugs where the wrong event payload shape was being passed around. The rewrite used template literal types for the event names with a payload map, and the entire class of mismatches stopped being possible. The compiler now refuses any combination of event name and payload that does not match.',
		},
		{
			type: 'paragraph',
			text: "Template literal types are TypeScript 4.1's quiet revolution. On the surface they are a minor syntax addition — you can now use backticks in types. Underneath, they give the type system the ability to analyze and construct strings. Combined with conditional types and infer, they enable entire libraries to be type-safe in ways that were previously impossible.",
		},
		{
			type: 'heading',
			text: 'The Basics',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `// Basic template literal types
type Greeting = \`Hello, \${string}!\`;

const a: Greeting = 'Hello, world!'; // ✅
const b: Greeting = 'Hi, world!';    // ❌

// Union substitution
type Lang = 'en' | 'fr' | 'de';
type Greeting2 = \`Hello in \${Lang}\`;
// = 'Hello in en' | 'Hello in fr' | 'Hello in de'

// Utility types built-in
type Upper = Uppercase<'hello'>;  // 'HELLO'
type Lower = Lowercase<'HELLO'>;  // 'hello'
type Cap = Capitalize<'hello'>;   // 'Hello'`,
		},
		{
			type: 'heading',
			text: 'Route Matching',
		},
		{
			type: 'paragraph',
			text: "The most impactful real-world use is type-safe routing. Express, Hono, and modern frameworks use template literal types to parse path patterns at the type level — extracting parameter names so the handler's params object is correctly typed.",
		},
		{
			type: 'code',
			language: 'typescript',
			code: `// Extract parameter names from a route pattern
type ExtractParams<T extends string> =
  T extends \`\${string}:\${infer Param}/\${infer Rest}\`
    ? { [K in Param | keyof ExtractParams<Rest>]: string }
    : T extends \`\${string}:\${infer Param}\`
    ? { [K in Param]: string }
    : {};

type UserRouteParams = ExtractParams<'/users/:userId/posts/:postId'>;
// = { userId: string; postId: string }

// Build a router where handlers get correct param types
function get<T extends string>(
  path: T,
  handler: (req: { params: ExtractParams<T> }) => void,
) {
  // ...
}

get('/users/:userId/posts/:postId', (req) => {
  req.params.userId;  // ✅ typed
  req.params.postId;  // ✅ typed
  req.params.unknown; // ❌ error
});`,
		},
		{
			type: 'callout',
			variant: 'info',
			text: 'infer inside a template literal type extracts matched portions as new type variables. Combined with recursion, you can parse nearly any string pattern at the type level.',
		},
		{
			type: 'heading',
			text: 'CSS Property Autocomplete',
		},
		{
			type: 'paragraph',
			text: "Libraries like Tailwind's type plugin and Panda CSS use template literal types to provide autocomplete for utility classes. The types understand responsive prefixes, pseudo-class modifiers, and arbitrary values.",
		},
		{
			type: 'code',
			language: 'typescript',
			code: `type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';
type Pseudo = 'hover' | 'focus' | 'active' | 'disabled';
type Utility = 'bg-red' | 'bg-blue' | 'text-white' | 'text-black';

type ResponsiveClass = \`\${Breakpoint}:\${Utility}\`;
type PseudoClass = \`\${Pseudo}:\${Utility}\`;
type Combined = \`\${Breakpoint}:\${Pseudo}:\${Utility}\`;

type TailwindClass = Utility | ResponsiveClass | PseudoClass | Combined;

// Autocomplete works through the entire space
const cls: TailwindClass = 'md:hover:bg-blue'; // ✅`,
		},
		{
			type: 'heading',
			text: 'Event Name Inference',
		},
		{
			type: 'paragraph',
			text: 'Type-safe event emitters become trivial with template literals. Define event names as a union, and the emit/on methods infer parameters automatically.',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `type Events = {
  'user:created': { id: string; name: string };
  'user:deleted': { id: string };
  'post:published': { postId: string; authorId: string };
};

class Emitter {
  on<K extends keyof Events>(
    event: K,
    handler: (payload: Events[K]) => void,
  ): void { /* ... */ }

  emit<K extends keyof Events>(event: K, payload: Events[K]): void {
    /* ... */
  }
}

const emitter = new Emitter();

emitter.on('user:created', (payload) => {
  payload.id;   // ✅
  payload.name; // ✅
});

emitter.emit('user:created', { id: '1', name: 'Alice' }); // ✅
emitter.emit('user:created', { id: '1' }); // ❌ missing name`,
		},
		{
			type: 'heading',
			text: 'Object Path Typing',
		},
		{
			type: 'paragraph',
			text: 'Template literal types enable type-safe "deep get" operations — functions that take a string path and return the type at that path. Libraries like react-hook-form and lodash-style get() helpers use this.',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `type Path<T, Prefix extends string = ''> = T extends object
  ? {
      [K in keyof T & string]:
        | \`\${Prefix}\${K}\`
        | Path<T[K], \`\${Prefix}\${K}.\`>;
    }[keyof T & string]
  : never;

type PathValue<T, P extends string> =
  P extends \`\${infer K}.\${infer Rest}\`
    ? K extends keyof T
      ? PathValue<T[K], Rest>
      : never
    : P extends keyof T
    ? T[P]
    : never;

function get<T, P extends Path<T>>(obj: T, path: P): PathValue<T, P> {
  return path.split('.').reduce((o: any, k) => o[k], obj);
}

const user = { profile: { name: 'Alice', age: 30 } };
const name = get(user, 'profile.name'); // typed as string
const age = get(user, 'profile.age');   // typed as number
const err = get(user, 'profile.x');     // ❌ type error`,
		},
		{
			type: 'callout',
			variant: 'tip',
			text: 'Template literal types have a compilation cost. TypeScript 4.9+ introduced safeguards against exponential recursion, but very deep type trees can still slow builds. If you hit compiler warnings about "Type instantiation is excessively deep", simplify the recursion or add explicit limits.',
		},
		{
			type: 'heading',
			text: 'Limits and Escape Hatches',
		},
		{
			type: 'paragraph',
			text: "Template literal types cannot do arithmetic, cannot call functions, and cannot execute arbitrary JavaScript. For cases that exceed the type system's capabilities, use generic constraints with branded types or fall back to runtime validation with Zod. The type system is a helper, not a replacement for runtime guarantees on external data.",
		},
		{
			type: 'heading',
			text: 'Conclusion',
		},
		{
			type: 'paragraph',
			text: 'After writing that typed emitter for sapan.dev I started spotting opportunities everywhere — the locale routing types, internal route helpers, even a small CSS-class autocomplete pattern in our component prop types. Template literal types are the feature that made TypeScript competitive with full-strength type systems for real-world JavaScript. They have a compilation cost on big recursive types, so use them where the safety pays for the build-time penalty — but where they fit, the inference feels like cheating.',
		},
	],
};

export default post;
