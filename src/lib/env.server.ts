import 'server-only';

import { stripEmpty } from '@/lib/env';
import { serverSchema, type ServerEnv } from '@/lib/env.server-schema';

export const env: Readonly<ServerEnv> = Object.freeze(serverSchema.parse(stripEmpty(process.env)));
