import type { BlogPost } from '@/types/blog';

const post: BlogPost = {
	slug: 'react-19-actions-use-action-state',
	title: 'React 19 Actions and useActionState',
	excerpt:
		'On the sapan.dev contact form I rewrote the React Hook Form + manual pending/error setup as a single useActionState call. The component dropped from ~80 lines to ~30, and useOptimistic gave the submit button a snappier feel. Notes on what Actions actually replace.',
	thumbnail: 'https://images.unsplash.com/photo-1569748130764-3fed0c102c59?w=800&q=80',
	category: 'React',
	tags: ['React', 'React 19', 'Forms', 'Server Actions'],
	readTime: 7,
	publishedAt: '2025-12-28',
	featured: false,
	content: [
		{
			type: 'paragraph',
			text: 'When I rewrote the sapan.dev contact form last quarter, the original implementation had useState for pending, useState for error, useState for the success message, and a try/catch wrapping the API call — with all the careful ordering you need to avoid stale closures and double-submits. The React 19 rewrite collapsed it into a single useActionState. The component went from roughly 80 lines to 30 and a couple of subtle race conditions disappeared on the way.',
		},
		{
			type: 'paragraph',
			text: 'Handling a form submission in React used to require useState for the pending flag, useState for the error, useState for the result, try/catch around the async call, and careful ordering to avoid stale closures. React 19 collapses all of that into Actions — async functions you pass to forms or call from useActionState.',
		},
		{
			type: 'heading',
			text: 'The Old Pattern',
		},
		{
			type: 'code',
			language: 'tsx',
			code: `// Before React 19 — the boilerplate
function UpdateName() {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    try {
      await updateName(name);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button disabled={isPending}>Save</button>
      {error && <p>{error}</p>}
    </form>
  );
}`,
		},
		{
			type: 'heading',
			text: 'The New Pattern',
		},
		{
			type: 'paragraph',
			text: 'React 19 introduces Actions — async functions you pass to form actions or to useActionState. React handles the pending state, the errors, and the transition scheduling for you.',
		},
		{
			type: 'code',
			language: 'tsx',
			code: `import { useActionState } from 'react';

function UpdateName() {
  const [error, submitAction, isPending] = useActionState(
    async (previousError: string | null, formData: FormData) => {
      const name = formData.get('name') as string;
      try {
        await updateName(name);
        return null;
      } catch (err) {
        return err.message;
      }
    },
    null,
  );

  return (
    <form action={submitAction}>
      <input name="name" />
      <button disabled={isPending}>Save</button>
      {error && <p>{error}</p>}
    </form>
  );
}`,
		},
		{
			type: 'callout',
			variant: 'info',
			text: 'Notice what is not there: no onSubmit, no preventDefault, no useState for pending/error, no try/finally. React 19 handles all of it through the form action attribute and useActionState.',
		},
		{
			type: 'heading',
			text: 'Server Actions in Next.js',
		},
		{
			type: 'paragraph',
			text: 'When paired with Next.js, Actions become Server Actions — async functions marked with "use server" that run on the server. The client form posts directly to the server function. No API route, no fetch, no JSON serialization. The browser and server communicate through a native web primitive.',
		},
		{
			type: 'code',
			language: 'tsx',
			code: `// app/actions.ts
'use server';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  const post = await db.posts.create({
    data: { title, content, authorId: userId },
  });

  revalidatePath('/posts');
  return post;
}

// app/new-post/page.tsx
import { createPost } from '../actions';

export default function NewPostPage() {
  return (
    <form action={createPost}>
      <input name="title" required />
      <textarea name="content" required />
      <button type="submit">Publish</button>
    </form>
  );
}`,
		},
		{
			type: 'heading',
			text: 'useOptimistic: Instant UI Updates',
		},
		{
			type: 'paragraph',
			text: 'useOptimistic pairs with Actions to show the result of a mutation immediately while the real request is in flight. If the server call fails, React reverts. If it succeeds, the optimistic state is seamlessly replaced with the real data.',
		},
		{
			type: 'code',
			language: 'tsx',
			code: `function PostList({ posts }: { posts: Post[] }) {
  const [optimisticPosts, addOptimisticPost] = useOptimistic(
    posts,
    (current, newPost: Post) => [...current, newPost],
  );

  async function submitAction(formData: FormData) {
    const draft: Post = {
      id: crypto.randomUUID(),
      title: formData.get('title') as string,
      status: 'pending',
    };

    addOptimisticPost(draft);
    await createPost(formData);
  }

  return (
    <>
      {optimisticPosts.map((p) => (
        <Post key={p.id} post={p} pending={p.status === 'pending'} />
      ))}
      <form action={submitAction}>
        <input name="title" required />
      </form>
    </>
  );
}`,
		},
		{
			type: 'callout',
			variant: 'tip',
			text: 'Optimistic UI works best for low-stakes mutations where failures are rare (likes, comments, task checkboxes). For high-stakes actions (payments, irreversible changes), show a pending spinner instead.',
		},
		{
			type: 'heading',
			text: 'useFormStatus: Decoupled Loading States',
		},
		{
			type: 'paragraph',
			text: "Child components can read the parent form's pending status with useFormStatus. This decouples loading UI from the form component itself — a submit button knows when its enclosing form is submitting without prop drilling.",
		},
		{
			type: 'code',
			language: 'tsx',
			code: `import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>
      {pending ? 'Saving...' : 'Save'}
    </button>
  );
}

// Parent form — no pending prop needed
function ProfileForm() {
  return (
    <form action={updateProfile}>
      <input name="name" />
      <SubmitButton />
    </form>
  );
}`,
		},
		{
			type: 'heading',
			text: 'The Migration Picture',
		},
		{
			type: 'paragraph',
			text: 'Actions are additive — existing useState-based forms keep working. Migrate form by form. Start with submit handlers that only set pending/error state (trivial conversion), then tackle forms with complex validation (add useOptimistic for instant feedback), and finally convert server communication to Server Actions if you are on Next.js.',
		},
		{
			type: 'heading',
			text: 'Conclusion',
		},
		{
			type: 'paragraph',
			text: 'After the sapan.dev contact form rewrite, every new form I write reaches for useActionState first and falls back to React Hook Form only when the form has complex per-field validation logic. React 19 Actions do for forms what hooks did for state — the boilerplate disappears, the common cases become one-liners, and the complex cases become tractable. Combined with Server Actions and useOptimistic, the three-layer dance of client state, API call, and server mutation collapses into a single async function. Worth migrating one form at a time as you touch them.',
		},
	],
};

export default post;
