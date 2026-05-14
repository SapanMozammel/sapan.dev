import type { BlogPost } from '@/types/blog';

const post: BlogPost = {
	slug: 'discriminated-unions-type-safe-state',
	title: 'Discriminated Unions: The Pattern That Changed How I Model State',
	excerpt:
		'On TubeOnAI, the original load/error/data form state was three independent booleans — and we kept hitting bugs where data was set AND loading was true. Switched to a single discriminated union and the entire class of bugs went away. Notes on the pattern that changed how I model state.',
	thumbnail: 'https://images.unsplash.com/photo-1724166573009-4634b974ebb2?w=800&q=80',
	category: 'TypeScript',
	tags: ['TypeScript', 'State Modeling', 'Pattern', 'Type Safety'],
	readTime: 7,
	publishedAt: '2025-10-02',
	featured: false,
	content: [
		{
			type: 'paragraph',
			text: 'On the TubeOnAI summarization view, our data layer started life with three independent state pieces — `isLoading`, `error`, `data` — across every async hook. The bugs were predictable: a refetch would set `isLoading = true` while `data` was still populated from the previous query, and our UI logic that branched on `isLoading` first hid the stale-but-still-valid data the user wanted to see. We fixed individual occurrences for a few months before realizing the bug was structural. Refactoring to a discriminated union killed the whole class.',
		},
		{
			type: 'paragraph',
			text: 'Every React developer has written this code: isLoading, error, data, all as separate pieces of state. Then the bugs arrive. Data is present AND loading is true. Error is set AND data is also set. Your UI branches on isLoading first, so errors never render when loading is still true. The root cause is modeling mutually exclusive states as independent booleans. Discriminated unions fix this structurally.',
		},
		{
			type: 'heading',
			text: 'The Problem in One Example',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `// Buggy — represents 8 possible states, only 3 are valid
type State<T> = {
  isLoading: boolean;
  error: Error | null;
  data: T | null;
};

// Can you spot the bug?
function render(state: State<User>) {
  if (state.isLoading) return <Spinner />;
  if (state.error) return <Error message={state.error.message} />;
  if (state.data) return <UserCard user={state.data} />;
  return null; // what state is this?
}`,
		},
		{
			type: 'paragraph',
			text: 'Three booleans means 2³ = 8 possible combinations. Only three of those make sense — loading, error, success. TypeScript cannot help you because the type says all eight are valid.',
		},
		{
			type: 'heading',
			text: 'The Discriminated Union Version',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `type State<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

function render(state: State<User>) {
  switch (state.status) {
    case 'idle':    return <EmptyState />;
    case 'loading': return <Spinner />;
    case 'success': return <UserCard user={state.data} />;
    case 'error':   return <Error message={state.error.message} />;
  }
}`,
		},
		{
			type: 'callout',
			variant: 'info',
			text: 'TypeScript narrows each case automatically. Inside the success branch, state.data exists. Inside the error branch, state.error exists. You cannot accidentally read state.data in the error branch — it does not compile.',
		},
		{
			type: 'heading',
			text: 'Exhaustiveness Checking',
		},
		{
			type: 'paragraph',
			text: 'The real power shows up when you add a new state. TypeScript forces you to handle every case — if you add status: "refetching", every switch statement across your codebase lights up as an error.',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `// Helper that enforces exhaustiveness
function assertNever(value: never): never {
  throw new Error(\`Unhandled case: \${JSON.stringify(value)}\`);
}

function render(state: State<User>) {
  switch (state.status) {
    case 'idle':    return <EmptyState />;
    case 'loading': return <Spinner />;
    case 'success': return <UserCard user={state.data} />;
    case 'error':   return <Error message={state.error.message} />;
    default:        return assertNever(state);
    // ❌ Type 'State<User>' is not assignable to type 'never'
    // when you add a new state and forget to handle it here
  }
}`,
		},
		{
			type: 'heading',
			text: 'Modeling Form State',
		},
		{
			type: 'paragraph',
			text: 'Form state is a discriminated union goldmine. A form is either pristine (never touched), dirty (user typing), validating (async check running), invalid (has errors), or submitting. Independent booleans encode dozens of impossible states. A union encodes exactly the right ones.',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `type FormState<T> =
  | { status: 'pristine'; values: T }
  | { status: 'dirty'; values: T; touchedFields: Set<keyof T> }
  | { status: 'validating'; values: T; touchedFields: Set<keyof T> }
  | { status: 'invalid'; values: T; errors: Partial<Record<keyof T, string>> }
  | { status: 'submitting'; values: T }
  | { status: 'submitted'; response: ApiResponse };

function canSubmit(state: FormState<unknown>): boolean {
  return state.status === 'dirty' || state.status === 'invalid';
}`,
		},
		{
			type: 'heading',
			text: 'Server Response Modeling',
		},
		{
			type: 'paragraph',
			text: 'API responses are another perfect fit. A response is a success with data or a failure with an error. A discriminated union makes the caller handle both cases — no more if (response.data) checks that miss 500 errors with partial data.',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; status: number };

async function fetchUser(id: string): Promise<ApiResult<User>> {
  try {
    const res = await fetch(\`/api/users/\${id}\`);
    if (!res.ok) {
      return { ok: false, error: await res.text(), status: res.status };
    }
    return { ok: true, data: await res.json() };
  } catch (err) {
    return { ok: false, error: String(err), status: 0 };
  }
}

// Caller is forced to handle both paths
const result = await fetchUser('123');
if (result.ok) {
  console.log(result.data.name); // TypeScript knows data exists
} else {
  console.error(result.error, result.status);
}`,
		},
		{
			type: 'callout',
			variant: 'tip',
			text: 'The "ok" vs "status" discriminant is stylistic. Use "status" with string literals when you have 3+ states. Use a boolean "ok" when you only have success/failure. Both patterns work equivalently with TypeScript narrowing.',
		},
		{
			type: 'heading',
			text: 'Machines and XState',
		},
		{
			type: 'paragraph',
			text: 'Discriminated unions are the foundation of state machines. XState formalizes this pattern — define your states and transitions, and XState enforces the union through TypeScript. For UI state that grows beyond 4-5 cases, a state machine keeps the code readable.',
		},
		{
			type: 'heading',
			text: 'When Not to Use Discriminated Unions',
		},
		{
			type: 'paragraph',
			text: 'Not every piece of state is mutually exclusive. A user profile might have both a name AND an email AND an avatar. These are independent attributes, not alternative states — a plain record type is correct. Reach for a discriminated union when the values differ meaningfully across states (data in success but error in failure), not just when they are all optional.',
		},
		{
			type: 'heading',
			text: 'Conclusion',
		},
		{
			type: 'paragraph',
			text: 'After the TubeOnAI refactor, every new async hook on the project started life as a discriminated union and the stale-data bugs simply stopped recurring. Discriminated unions are a state-modeling superpower — they turn a vague "this might be one of several things" into a precise "this is exactly one of these options, and the compiler will enforce which fields exist in each case." Once you start thinking in unions, every piece of state that has multiple phases becomes dramatically clearer. Worth refactoring toward, one hook at a time.',
		},
	],
};

export default post;
