const expectedKeys = {
	name: {
		level: 'recommended'
	},
	icon: {
		level: 'recommended'
	},
	documentation: {
		level: 'optional'
	},
	description: {
		level: 'optional'
	},
	subtext_key: {
		level: 'optional'
	},
	image_key: {
		level: 'optional'
	},
	image_size: {
		level: 'optional'
	},
	singular_name: {
		level: 'informational'
	},
};

function collectionConfigSubtasks(collectionConfig) {
	const tasks = [];

	tasks.push({
		id: '_collection_config',
		level: 'recommended',
		title: 'Define configuration',
		completed: !!collectionConfig
	});

	Object.keys(expectedKeys).forEach((key) => {
		const settings = expectedKeys[key];
		tasks.push({
			id: `_collection_config.${key}`,
			level: settings.level,
			title: `Add ${key} option`,
			completed: !!collectionConfig?.[key]
		});
	});

	return tasks;
}

export default function collectionConfigTasks(config) {
	const collectionKeys = config?.collections_config
		? Object.keys(config?.collections_config)
		: [];

	const tasks = [];

	tasks.push({
		level: 'required',
		action: 'Define a collection',
		completed: collectionKeys.length > 0
	});

	if (collectionKeys.length > 0) {
		collectionKeys.forEach((collectionKey) => {
			const collectionConfig = config.collections_config[collectionKey];
			tasks.push({
				level: 'recommended',
				action: `Complete your ${collectionConfig?.name ?? collectionKey} collection`,
				subtasks: collectionConfigSubtasks(collectionConfig)
			});
		});
	}
	return tasks;
}