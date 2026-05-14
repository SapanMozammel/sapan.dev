import type { BlogPost } from '@/types/blog';

const post: BlogPost = {
	slug: 'web-workers-offload-main-thread',
	title: 'Web Workers in Modern Frontend: Offloading the Main Thread',
	excerpt:
		'The BetterDocs analytics dashboard parses 30-day docs traffic into ApexCharts on every state change — and it was visibly stuttering when the dataset got large. Moved the parsing into a Web Worker and the panel stopped jank-locking the input field. Notes on what belongs in a worker and what does not.',
	thumbnail: 'https://images.unsplash.com/photo-1667372393086-9d4001d51cf1?w=800&q=80',
	category: 'Performance',
	tags: ['Web Workers', 'Performance', 'Concurrency', 'INP'],
	readTime: 8,
	publishedAt: '2025-11-20',
	featured: false,
	content: [
		{
			type: 'paragraph',
			text: 'The BetterDocs analytics dashboard renders ApexCharts on every state change — page-view trends, search queries, top documents, the usual. With a small dataset it is fine, but on workspaces with a few months of history the chart-data preparation took 80-120ms per render. The user noticed this as a typing lag in the date-range filter — every keystroke recomputed the data, and every recomputation blocked the input. The fix was to move the data shaping into a Web Worker.',
		},
		{
			type: 'paragraph',
			text: "The browser's main thread has to do too many things at once. Paint the frame. Run your React render. Handle the mouse click. Parse the JSON response. If any of these takes more than 16ms, the user sees jank. Web Workers are the built-in answer — separate JavaScript threads that run in parallel and cannot block the UI.",
		},
		{
			type: 'heading',
			text: 'What Belongs in a Worker',
		},
		{
			type: 'paragraph',
			text: 'A worker is most useful for pure CPU-bound work that can be expressed as a function — input in, output out, no DOM access. The overhead of postMessage plus structured cloning means tiny tasks are faster on the main thread; the win appears once a task costs more than 10-20ms.',
		},
		{
			type: 'list',
			items: [
				'Parsing large JSON, CSV, or XML payloads',
				'Image manipulation with canvas (OffscreenCanvas works in workers)',
				'Running a search algorithm over a large client-side dataset',
				'Computing diffs, minimaps, or visualizations from raw data',
				'Parsing and validating with heavy libraries (Zod schemas for 10k records)',
				'Hashing, encryption, and compression (though Web Crypto on main is often OK)',
				'Running WebAssembly-heavy work like PDF generation or on-device ML',
			],
		},
		{
			type: 'heading',
			text: 'The Modern Worker Syntax',
		},
		{
			type: 'paragraph',
			text: 'Vite, Next.js, and Webpack 5 all support a native worker import syntax. No separate chunk configuration, no inline worker strings — just import the file with a ?worker suffix and you get a Worker constructor.',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `// worker.ts — runs in a separate thread
self.onmessage = (e: MessageEvent<string>) => {
  const result = expensiveParse(e.data);
  self.postMessage(result);
};

// main.ts — runs on the main thread
import MyWorker from './worker.ts?worker';

const worker = new MyWorker();

worker.onmessage = (e) => {
  console.log('Got result:', e.data);
};

worker.postMessage(largeJsonString);`,
		},
		{
			type: 'callout',
			variant: 'info',
			text: 'structuredClone happens at the postMessage boundary — objects are deep-copied between threads. For large ArrayBuffers, use the transferable flag to move ownership instead of copying.',
		},
		{
			type: 'heading',
			text: 'Comlink: Workers That Feel Like Functions',
		},
		{
			type: 'paragraph',
			text: 'Raw postMessage is clunky. Comlink wraps workers in a Proxy so you can call their methods like local async functions. This makes integrating workers with a React app feel natural.',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `// heavy-worker.ts
import { expose } from 'comlink';

const api = {
  async searchLargeDataset(query: string, data: Record[]) {
    return data.filter((r) =>
      Object.values(r).some((v) => String(v).includes(query))
    );
  },

  async parseCsv(text: string) {
    return Papa.parse(text, { header: true }).data;
  },
};

export type HeavyApi = typeof api;
expose(api);

// main.ts — use the worker like a normal async object
import { wrap } from 'comlink';
import HeavyWorker from './heavy-worker.ts?worker';
import type { HeavyApi } from './heavy-worker';

const worker = wrap<HeavyApi>(new HeavyWorker());

const results = await worker.searchLargeDataset('john', records);`,
		},
		{
			type: 'heading',
			text: 'Using Workers in React',
		},
		{
			type: 'paragraph',
			text: 'Wrap worker initialization in a useMemo or a custom hook to avoid recreating the worker on every render. Terminate workers on unmount to free the thread.',
		},
		{
			type: 'code',
			language: 'tsx',
			code: `function useHeavyWorker() {
  const worker = useMemo(() => wrap<HeavyApi>(new HeavyWorker()), []);

  useEffect(() => {
    return () => worker[releaseProxy]();
  }, [worker]);

  return worker;
}

function SearchBox({ data }: { data: Record[] }) {
  const worker = useHeavyWorker();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Record[]>([]);

  useEffect(() => {
    if (!query) return;
    let cancelled = false;

    worker.searchLargeDataset(query, data).then((res) => {
      if (!cancelled) setResults(res);
    });

    return () => { cancelled = true; };
  }, [query, data, worker]);

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ResultList items={results} />
    </>
  );
}`,
		},
		{
			type: 'heading',
			text: 'SharedArrayBuffer and Atomics',
		},
		{
			type: 'paragraph',
			text: 'For workloads that need true zero-copy sharing between threads — real-time audio processing, WebAssembly threads, high-frequency data streaming — SharedArrayBuffer with Atomics lets the main thread and workers read/write the same memory. The site must be cross-origin isolated (COOP/COEP headers) to enable it.',
		},
		{
			type: 'callout',
			variant: 'warning',
			text: 'SharedArrayBuffer requires cross-origin isolation via COOP and COEP headers. This breaks many third-party embeds (Stripe checkout, YouTube iframes). Check your third-party dependencies before opting in.',
		},
		{
			type: 'heading',
			text: 'Impact on INP',
		},
		{
			type: 'paragraph',
			text: 'Interaction to Next Paint (INP) measures the delay between user input and visible response. Long tasks on the main thread are the primary cause of poor INP. Moving even one 80ms task to a worker can drop your p75 INP below the 200ms Good threshold. Profile with Chrome DevTools Performance panel to find the actual long tasks before optimizing blindly.',
		},
		{
			type: 'heading',
			text: 'OffscreenCanvas for Rendering',
		},
		{
			type: 'paragraph',
			text: 'OffscreenCanvas lets workers render to a canvas element on the main thread. This is how modern data-viz tools and games keep the UI responsive while rendering complex scenes. Transfer the canvas control to the worker with transferControlToOffscreen().',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `// main.ts
const canvas = document.querySelector('canvas')!;
const offscreen = canvas.transferControlToOffscreen();

const worker = new RenderWorker();
worker.postMessage({ canvas: offscreen }, [offscreen]);

// render-worker.ts
self.onmessage = (e) => {
  const canvas: OffscreenCanvas = e.data.canvas;
  const ctx = canvas.getContext('2d')!;

  // Render loop runs in the worker — does not block main thread
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // expensive drawing...
    requestAnimationFrame(draw);
  }
  draw();
};`,
		},
		{
			type: 'heading',
			text: 'Conclusion',
		},
		{
			type: 'paragraph',
			text: 'After moving the BetterDocs analytics chart-data preparation into a Web Worker via Comlink, the input lag on the date-range filter went away — INP dropped from around 250ms to under 80ms on the workspaces with the largest datasets. The integration cost was minimal once Comlink was in place. Web Workers are one of the highest-leverage performance tools most developers still do not reach for. If your app has any computation over 50ms on a hot path, measure the win of moving it off the main thread.',
		},
	],
};

export default post;
