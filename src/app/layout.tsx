import '@/styles/global.scss';

// Root layout intentionally forwards children. html/body/lang/dir live in
// `[locale]/layout.tsx` so next-intl can call `setRequestLocale(locale)` and
// static rendering works for pages with `generateStaticParams` — calling
// `getLocale()` here would force every descendant to dynamic and 500 any
// statically-rendered server component (e.g. /articles/[slug]).
const RootLayout = ({ children }: { children: React.ReactNode }) => children;

export default RootLayout;
