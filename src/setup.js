import globalConfigFile from './helpers/config-file.js';

function emptyFilesCheck(files) {
	return !files || files?.length === 0;
}

export default function checkBasicTasks(config, files) {
	const tasks = [];
	tasks.push({
		level: 'required',
		title: 'Sync your files',
		completed: !emptyFilesCheck(files)
	});

	tasks.push({
		level: 'required',
		title: 'Build your site',
		completed: !!config?.cloudcannon?.version
	});

	const configFile = globalConfigFile(files);
	tasks.push({
		level: 'required',
		title: 'Define a global configuration file',
		subtext: 'Configuring editing starts with the global configuration file.',
		documentation: {
			url: 'https://cloudcannon.com/documentation/articles/setting-global-configuration/',
			text: 'Setting global configuration'
		},
		actions: [{
			href: 'cloudcannon:create?editor=source',
			text: 'Add new file',
			icon: 'add'
		}],
		completed: !!configFile
	});


	const collectionKeys = config?.collections_config
		? Object.keys(config?.collections_config)
		: [];

	tasks.push({
		level: 'required',
		title: 'Configure a collection or data for editing',
		subtext: 'Define what groups of files can be edited like blog posts, staff members or products.',
		documentation: {
			url: 'https://cloudcannon.com/documentation/articles/defining-your-collections/',
			text: 'Defining a collection'
		},
		completed: collectionKeys.length > 0
	});

	return tasks;
}