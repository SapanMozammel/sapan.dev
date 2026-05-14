import type { BlogPost } from '@/types/blog';

const post: BlogPost = {
	slug: 'biome-rust-toolchain-eslint-prettier',
	title: 'Biome: The Rust Toolchain Replacing ESLint and Prettier',
	excerpt:
		'Migrated sapan.dev from ESLint + Prettier to Biome over a weekend — pre-commit hooks went from ~12s to under a second, and the config dropped from three files to one. Notes on what migrated cleanly and what I had to keep ESLint for.',
	thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
	category: 'Tooling',
	tags: ['Biome', 'Tooling', 'ESLint', 'Prettier', 'Rust'],
	readTime: 7,
	publishedAt: '2026-03-18',
	featured: false,
	content: [
		{
			type: 'paragraph',
			text: 'On sapan.dev, the pre-commit hook was getting irritating. ESLint + Prettier + import sort across roughly 200 TypeScript files took about 12 seconds — long enough that I started skipping the hook on small commits, which is exactly the wrong direction. Migrated to Biome over a weekend and the same hook now runs in under a second. Both my git commit reflexes and my CI minutes are happier.',
		},
		{
			type: 'paragraph',
			text: 'ESLint and Prettier have defined JavaScript tooling for nearly a decade. Both are written in JavaScript. On a medium codebase, a full lint + format pass can take 20 seconds. Biome, written in Rust, does the same work in 200 milliseconds. That 100x speedup changes what tooling you can run in a pre-commit hook and what feedback loops you can afford.',
		},
		{
			type: 'heading',
			text: 'What Biome Replaces',
		},
		{
			type: 'paragraph',
			text: 'Biome is a single binary that does linting, formatting, import sorting, and type-aware analysis. One config file, one command, one dependency. The scope overlaps roughly 80% with ESLint + Prettier + typescript-eslint + eslint-plugin-import combined.',
		},
		{
			type: 'code',
			language: 'bash',
			code: `# Install
npm install --save-dev --save-exact @biomejs/biome

# Initialize config
npx biome init

# Lint and format the whole project
npx biome check --write .

# In CI, check without writing
npx biome check .`,
		},
		{
			type: 'heading',
			text: 'One Config, biome.json',
		},
		{
			type: 'paragraph',
			text: 'Replacing three tools with one collapses three config files into one. The rule system is compatible with most ESLint rules by name, and the formatter closely matches Prettier defaults.',
		},
		{
			type: 'code',
			language: 'json',
			code: `{
  "$schema": "https://biomejs.dev/schemas/2.0.0/schema.json",
  "formatter": {
    "enabled": true,
    "indentStyle": "tab",
    "lineWidth": 100
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "semicolons": "always",
      "trailingCommas": "all"
    }
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "style": {
        "noParameterAssign": "error",
        "useConst": "error"
      },
      "suspicious": {
        "noExplicitAny": "error"
      }
    }
  },
  "assist": {
    "actions": {
      "source": {
        "organizeImports": "on"
      }
    }
  }
}`,
		},
		{
			type: 'heading',
			text: 'The Speed Is Not Hype',
		},
		{
			type: 'paragraph',
			text: 'On a 500-file TypeScript monorepo, typical numbers: ESLint + Prettier + organize-imports takes 18 seconds. Biome takes 0.4 seconds. That is not a 2x improvement — it is a qualitatively different tool. Pre-commit hooks run instantly. CI pipelines reclaim minutes. Editors report errors faster than you can finish typing.',
		},
		{
			type: 'callout',
			variant: 'info',
			text: 'Biome parses your code once in Rust and runs all checks in parallel. ESLint parses each file in JavaScript and runs rules sequentially. The difference is structural, not just implementation.',
		},
		{
			type: 'heading',
			text: 'Migrating from ESLint + Prettier',
		},
		{
			type: 'paragraph',
			text: 'Biome ships a migration command that reads your existing .eslintrc and .prettierrc files and generates a biome.json matching your current rules as closely as possible. It will not translate custom rules or obscure plugins, but the 80% case is automated.',
		},
		{
			type: 'code',
			language: 'bash',
			code: `# Migrate from ESLint + Prettier configs
npx biome migrate eslint --write
npx biome migrate prettier --write

# Verify by running both tools and comparing output
npx eslint . --format json > eslint.json
npx biome check . --reporter json > biome.json`,
		},
		{
			type: 'heading',
			text: 'Where Biome Is Not Yet Ready',
		},
		{
			type: 'paragraph',
			text: 'Biome is an excellent default for most projects but has known gaps. If your codebase depends on these, you may need to keep ESLint alongside Biome or delay migration until coverage improves.',
		},
		{
			type: 'list',
			items: [
				'Custom ESLint rules with no Biome equivalent — no plugin system yet',
				'Type-aware rules that require full TypeScript compilation — Biome uses its own parser',
				'Niche framework rules (eslint-plugin-jsx-a11y, eslint-plugin-react-hooks coverage is partial)',
				'Yaml, TOML, or other non-JS formats — Biome is JS/TS/JSON/JSX only',
				'Stylelint equivalent for CSS — Biome handles CSS but less comprehensively',
			],
		},
		{
			type: 'callout',
			variant: 'tip',
			text: 'Run Biome alongside ESLint during migration. Let Biome handle formatting and the rules it supports, and keep ESLint for anything Biome cannot replicate. Over time, Biome catches up and you can drop ESLint entirely.',
		},
		{
			type: 'heading',
			text: 'Editor Integration',
		},
		{
			type: 'paragraph',
			text: 'The official VS Code and JetBrains extensions provide format-on-save, quick-fixes, and inline diagnostics. Performance is dramatically better than the ESLint extension because Biome processes files instantly. The language server runs the same Rust binary as the CLI, so behavior is consistent across editors and CI.',
		},
		{
			type: 'heading',
			text: 'Conclusion',
		},
		{
			type: 'paragraph',
			text: 'On sapan.dev I kept ESLint around for two things Biome does not yet cover well: the next-intl plugin (locale-key checks) and a couple of project-specific custom rules. Biome handles formatting and 90% of linting; ESLint runs as a smaller second pass on those holdouts. Slightly less tidy than I would like, but the speed win is so big that the hybrid setup is still a net improvement. For most projects Biome is already the right default — faster, simpler, less dependency management. The remaining gaps close every monthly release.',
		},
	],
};

export default post;
