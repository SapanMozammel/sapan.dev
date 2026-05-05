import type { BlogPost } from '@/types/blog';

import astroIslandsArchitectureMpaReturn from './astro-islands-architecture-mpa-return';
import biomeRustToolchainEslintPrettier from './biome-rust-toolchain-eslint-prettier';
import brandedTypesTypescriptDomainModeling from './branded-types-typescript-domain-modeling';
import buildingAccessibleUiComponents from './building-accessible-ui-components';
import cssLayerArchitectureWithoutSpecificityWars from './css-layer-architecture-without-specificity-wars';
import discriminatedUnionsTypeSafeState from './discriminated-unions-type-safe-state';
import edgeComputingFrontendCloudflareWorkers from './edge-computing-frontend-cloudflare-workers';
import masteringReactServerComponentsNextjs15 from './mastering-react-server-components-nextjs-15';
import modernCss2026ScopeHasContainerQueries from './modern-css-2026-scope-has-container-queries';
import modernCssColorsOklchColorMix from './modern-css-colors-oklch-color-mix';
import react19ActionsUseActionState from './react-19-actions-use-action-state';
import reactCompilerAutoMemoization from './react-compiler-auto-memoization';
import reactSuspenseStreamingPatterns from './react-suspense-streaming-patterns';
import stateManagement2025ZustandJotaiRedux from './state-management-2025-zustand-jotai-redux';
import tailwindCssV4CompleteGuide from './tailwind-css-v4-complete-guide';
import templateLiteralTypesTypeLevelStrings from './template-literal-types-type-level-strings';
import turborepoMonoreposThatScale from './turborepo-monorepos-that-scale';
import typescript5NewFeatures from './typescript-5-new-features';
import viewTransitionsApiNativePageAnimations from './view-transitions-api-native-page-animations';
import vite6StateOfFrontendBuilds from './vite-6-state-of-frontend-builds';
import webPerformanceCoreWebVitals2025 from './web-performance-core-web-vitals-2025';
import webWorkersOffloadMainThread from './web-workers-offload-main-thread';
import zodTypescriptRuntimeValidation from './zod-typescript-runtime-validation';

export const BLOG_POSTS: BlogPost[] = [
	reactCompilerAutoMemoization,
	viewTransitionsApiNativePageAnimations,
	modernCss2026ScopeHasContainerQueries,
	astroIslandsArchitectureMpaReturn,
	biomeRustToolchainEslintPrettier,
	edgeComputingFrontendCloudflareWorkers,
	brandedTypesTypescriptDomainModeling,
	zodTypescriptRuntimeValidation,
	turborepoMonoreposThatScale,
	vite6StateOfFrontendBuilds,
	react19ActionsUseActionState,
	webWorkersOffloadMainThread,
	masteringReactServerComponentsNextjs15,
	typescript5NewFeatures,
	tailwindCssV4CompleteGuide,
	buildingAccessibleUiComponents,
	webPerformanceCoreWebVitals2025,
	stateManagement2025ZustandJotaiRedux,
	modernCssColorsOklchColorMix,
	cssLayerArchitectureWithoutSpecificityWars,
	discriminatedUnionsTypeSafeState,
	templateLiteralTypesTypeLevelStrings,
	reactSuspenseStreamingPatterns,
];

export const FEATURED_BLOGS = BLOG_POSTS.filter((post) => post.featured);
export const BLOGS_PER_PAGE = 6;
