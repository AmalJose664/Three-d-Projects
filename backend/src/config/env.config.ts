export function validateEnv() {
	const required = [
		"CONTAINER_API_TOKEN",
	];

	const missing = required.filter(key => !process.env[key]);

	if (missing.length > 0) {
		console.error('❌ Missing required environment variables:');
		console.error(missing.join(', '));
		process.exit(1);
	}

	console.log('✅ All environment variables validated');
}