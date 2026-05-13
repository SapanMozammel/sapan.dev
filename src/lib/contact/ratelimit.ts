import { env } from '@/lib/env.server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

let _redis: Redis | undefined;
let _ratelimit: Ratelimit | undefined;

const getRedis = (): Redis => {
	if (!_redis) {
		_redis = new Redis({
			url: env.UPSTASH_REDIS_REST_URL,
			token: env.UPSTASH_REDIS_REST_TOKEN,
		});
	}
	return _redis;
};

export const getRatelimit = (): Ratelimit => {
	if (!_ratelimit) {
		_ratelimit = new Ratelimit({
			redis: getRedis(),
			limiter: Ratelimit.slidingWindow(3, '10 m'),
			analytics: false,
			prefix: 'contact',
		});
	}
	return _ratelimit;
};
