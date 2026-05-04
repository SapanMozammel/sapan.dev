import { env } from '@/lib/env.server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const globalForRatelimit = globalThis as unknown as {
	redis?: Redis;
	ratelimit?: Ratelimit;
};

export const redis =
	globalForRatelimit.redis ??
	new Redis({
		url: env.UPSTASH_REDIS_REST_URL,
		token: env.UPSTASH_REDIS_REST_TOKEN,
	});

export const ratelimit =
	globalForRatelimit.ratelimit ??
	new Ratelimit({
		redis,
		limiter: Ratelimit.slidingWindow(3, '10 m'),
		analytics: false,
		prefix: 'contact',
	});

if (process.env.NODE_ENV !== 'production') {
	globalForRatelimit.redis = redis;
	globalForRatelimit.ratelimit = ratelimit;
}
