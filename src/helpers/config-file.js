function findGlobalConfigFiles(files) {
	return files?.find((file) => file.startsWith('cloudcannon.config.'));
}

const configFilePriority = [
	'cloudcannon.config.json',
	'cloudcannon.config.yaml',
	'cloudcannon.config.yml',
	'cloudcannon.config.js',
	'cloudcannon.config.cjs',
];

export default function globalConfigFile(files) {
	const configFiles = findGlobalConfigFiles(files);
	if (!configFiles || configFiles.length === 0) {
		return null;
	}

	for (let i = 0; i < configFilePriority.length; i++) {
		const file = configFilePriority[i];
		if (configFiles.includes(file)) {
			return file;
		}
	}

	return null;
};