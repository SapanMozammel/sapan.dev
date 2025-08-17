#!/usr/bin/env node

/**
 * Development server monitor script
 * Helps maintain server stability during automated code changes
 */

const { spawn } = require('child_process');
const http = require('http');

const PORT = 8000;
const CHECK_INTERVAL = 5000; // 5 seconds
const RESTART_DELAY = 2000; // 2 seconds

let devServer = null;
let isRestarting = false;

function startDevServer() {
	console.log('🚀 Starting development server with Turbopack...');

	devServer = spawn('pnpm', ['run', 'dev'], {
		stdio: 'inherit',
		shell: true,
	});

	devServer.on('error', (error) => {
		console.error('❌ Dev server error:', error);
		scheduleRestart();
	});

	devServer.on('exit', (code) => {
		if (code !== 0 && !isRestarting) {
			console.log(`⚠️  Dev server exited with code ${code}`);
			scheduleRestart();
		}
	});
}

function checkServerHealth() {
	return new Promise((resolve) => {
		const req = http.get(`http://localhost:${PORT}`, (res) => {
			resolve(res.statusCode === 200);
		});

		req.on('error', () => {
			resolve(false);
		});

		req.setTimeout(3000, () => {
			req.destroy();
			resolve(false);
		});
	});
}

function scheduleRestart() {
	if (isRestarting) return;

	isRestarting = true;
	console.log('🔄 Scheduling server restart...');

	setTimeout(() => {
		if (devServer) {
			devServer.kill('SIGTERM');
		}

		setTimeout(() => {
			isRestarting = false;
			startDevServer();
		}, RESTART_DELAY);
	}, 1000);
}

async function monitor() {
	const isHealthy = await checkServerHealth();

	if (!isHealthy && !isRestarting) {
		console.log('🏥 Server health check failed, restarting...');
		scheduleRestart();
	}
}

// Handle graceful shutdown
process.on('SIGINT', () => {
	console.log('\n👋 Shutting down dev server monitor...');
	if (devServer) {
		devServer.kill('SIGTERM');
	}
	process.exit(0);
});

process.on('SIGTERM', () => {
	if (devServer) {
		devServer.kill('SIGTERM');
	}
	process.exit(0);
});

// Start the server and monitoring
startDevServer();

// Start health monitoring after initial startup
setTimeout(() => {
	setInterval(monitor, CHECK_INTERVAL);
}, 10000); // Wait 10 seconds before starting health checks

console.log('👀 Development server monitor started');
console.log(`🌐 Server should be available at http://localhost:${PORT}`);
console.log('Press Ctrl+C to stop');
