import type { BlogPost } from '@/types/blog';

const post: BlogPost = {
	slug: 'branded-types-typescript-domain-modeling',
	title: 'Branded Types: Domain Modeling with TypeScript',
	excerpt:
		'On the Templately admin we had four different ID types passed around as strings — TemplateId, CategoryId, UserId, OrganizationId — and the bugs that came from mixing them were hard to spot in code review. Branded types fixed that. Notes on the pattern and when it actually pays off.',
	thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80',
	category: 'TypeScript',
	tags: ['TypeScript', 'Types', 'Domain Modeling', 'Type Safety'],
	readTime: 6,
	publishedAt: '2026-03-05',
	featured: false,
	content: [
		{
			type: 'paragraph',
			text: 'On the Templately admin codebase, we hit this bug at least three times: a function expecting a TemplateId got passed a CategoryId. Both are strings. TypeScript happily allowed it. The actual error only showed up at runtime when the API returned an empty result and the UI silently rendered an empty state. Each time, the fix was the same — add a runtime check, write a regression test, move on. Branded types eliminated the whole class.',
		},
		{
			type: 'paragraph',
			text: 'The TypeScript type system is structural — two types with the same shape are interchangeable. That is usually a feature, but it becomes a liability when different concepts happen to share the same primitive. A UserId and a PostId are both strings. A USD amount and a EUR amount are both numbers. Mixing them up is a bug TypeScript happily lets through.',
		},
		{
			type: 'heading',
			text: 'The Pattern',
		},
		{
			type: 'paragraph',
			text: 'A branded type is a primitive tagged with a phantom field that exists only in the type system. The runtime value is unchanged — just a string or a number — but TypeScript treats it as distinct from any other string or number.',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `// The brand helper — zero runtime cost
declare const brand: unique symbol;
type Brand<T, B> = T & { readonly [brand]: B };

// Your domain types
type UserId = Brand<string, 'UserId'>;
type PostId = Brand<string, 'PostId'>;
type Email = Brand<string, 'Email'>;

// Constructor — the only way to create a branded value
function UserId(raw: string): UserId {
  return raw as UserId;
}

function Email(raw: string): Email {
  if (!raw.includes('@')) {
    throw new Error('Invalid email');
  }
  return raw as Email;
}`,
		},
		{
			type: 'heading',
			text: 'What It Buys You',
		},
		{
			type: 'paragraph',
			text: 'The moment you brand your IDs, the compiler starts catching bugs that used to require manual code review. Passing a PostId where a UserId is expected becomes a type error, not a production incident.',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `function getUser(id: UserId): Promise<User> { /* ... */ }
function getPost(id: PostId): Promise<Post> { /* ... */ }

const userId = UserId('user_123');
const postId = PostId('post_456');

getUser(userId);      // ✅ OK
getUser(postId);      // ❌ Type error: PostId is not UserId
getUser('user_123');  // ❌ Type error: string is not UserId`,
		},
		{
			type: 'callout',
			variant: 'info',
			text: 'The cast inside UserId() is the only place in your code that bypasses the type system. Funnel every untrusted string through a constructor and the rest of your codebase becomes type-safe by construction.',
		},
		{
			type: 'heading',
			text: 'Validated Brands',
		},
		{
			type: 'paragraph',
			text: 'The real power of branded types emerges when you combine them with runtime validation. The constructor function becomes the single source of truth — a validated value is both runtime-verified and compile-time tracked.',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `type NonEmptyString = Brand<string, 'NonEmptyString'>;
type PositiveInt = Brand<number, 'PositiveInt'>;

function NonEmptyString(raw: string): NonEmptyString {
  if (raw.length === 0) throw new Error('Empty string');
  return raw as NonEmptyString;
}

function PositiveInt(raw: number): PositiveInt {
  if (!Number.isInteger(raw) || raw <= 0) {
    throw new Error('Not a positive integer');
  }
  return raw as PositiveInt;
}

// Function signatures now encode their invariants
function chargeCents(amount: PositiveInt): void {
  // No need to check if amount > 0 — the type guarantees it
  stripe.charges.create({ amount });
}`,
		},
		{
			type: 'heading',
			text: 'Money, Units, and Measurements',
		},
		{
			type: 'paragraph',
			text: 'Branded types shine for anywhere two numbers with different units get mixed up. Adding USD to EUR, milliseconds to seconds, pixels to rems — all classic bugs that brands prevent at the type level.',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `type USD = Brand<number, 'USD'>;
type EUR = Brand<number, 'EUR'>;
type Milliseconds = Brand<number, 'Milliseconds'>;
type Seconds = Brand<number, 'Seconds'>;

function convertUsdToEur(amount: USD, rate: number): EUR {
  return (amount * rate) as EUR;
}

const price = 100 as USD;
const discount = 20 as USD;
const total = price - discount; // OK — both USD

const eur = 50 as EUR;
const mixed = price + eur; // ❌ Type error`,
		},
		{
			type: 'callout',
			variant: 'tip',
			text: 'Use branded types for IDs, monetary amounts, time durations, measurement units, SQL query strings, and anything that users of your API might confuse. Do not brand purely-internal values — the ergonomic cost is not worth it.',
		},
		{
			type: 'heading',
			text: 'The Tradeoff',
		},
		{
			type: 'paragraph',
			text: 'Branded types add friction at the boundaries of your system — you need to convert raw strings from HTTP requests, databases, and third-party libraries into branded values via constructor functions. This friction is actually a feature. It forces validation at the edges and keeps your core logic operating on trusted values.',
		},
		{
			type: 'heading',
			text: 'Conclusion',
		},
		{
			type: 'paragraph',
			text: 'On the Templately admin, after we branded TemplateId, CategoryId, UserId, and OrganizationId, the ID-confusion bugs stopped recurring. We did not catch a single new instance in the next six months — the compiler caught them at PR time instead. The friction at the system boundaries was real (every API response had to go through a constructor) but the friction is the point: it forces validation at the edges. Branded types feel awkward for the first day and liberating for the next several years. For any codebase large enough to have multiple ID types or unit systems, they pay for themselves quickly.',
		},
	],
};

export default post;
