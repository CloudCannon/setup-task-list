function emptyFilesCheck(files) {
	return !files || files?.length === 0;
}

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

function globalConfigFile(files) {
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
}

export default function checkBasicTasks(config, files) {
	const tasks = [];
	tasks.push({
		level: 'required',
		action: 'Sync your files',
		completed: !emptyFilesCheck(files)
	});

	tasks.push({
		level: 'required',
		action: 'Build your site',
		completed: !!config
	});

	const configFile = globalConfigFile(files);
	tasks.push({
		level: 'required',
		action: 'Define a global configuration file',
		completed: !!configFile
	});


	const collectionKeys = config?.collections_config
		? Object.keys(config?.collections_config)
		: [];

	tasks.push({
		level: 'required',
		action: 'Configure a collection or data for editing',
		completed: collectionKeys.length > 0
	});

	return tasks;
}