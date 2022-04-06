const docsLink = {
	text: 'Defining your collections',
	url: 'https://cloudcannon.com/documentation/articles/defining-your-collections/',
};

const taskGroups = [
	{
		id: 'icon',
		title: 'Add an icon',
		subtext: 'Make your collection stand out in the site navigation menu',
		level: 'recommended',
		expectedKeys: ['icon']
	},
	{
		id: 'documentation',
		title: 'Add inline documentation',
		subtext: 'Inform your editors with custom documentation links or an inline description',
		level: 'recommended',
		expectedKeys: ['documentation', 'description']
	},
	{
		id: 'previews',
		title: 'Customize how items look',
		subtext: 'Update how each collection item is presented with text_key, subtext_key, image_key or image_size.',
		level: 'recommended',
		expectedKeys: ['text_key', 'subtext_key', 'image_key', 'image_size']
	},
	{
		id: 'adding',
		title: 'Define how new items are created',
		subtext: 'By default CloudCannon clones an existing item. You can add multple add options or disable add completely.',
		level: 'recommended',
		expectedKeys: ['add_options', 'disable_add', 'schemas']
	}
];

function collectionConfigSubtasks(collectionKey, collectionConfig) {
	const tasks = [];

	taskGroups.forEach((task) => {
		const complete = task.expectedKeys.reduce((memo, key) => memo || collectionConfig?.[key], false);
		tasks.push({
			...task,
			id: `_collection_config.${collectionKey}.${task.id}`,
			completed: complete
		});
	});

	return tasks;
}

export default function collectionConfigTasks(config, configFile) {
	const collectionKeys = config?.collections_config
		? Object.keys(config?.collections_config)
		: [];

	const tasks = [];

	tasks.push({
		level: 'required',
		title: 'Define a collection',
		completed: collectionKeys.length > 0
	});

	if (collectionKeys.length > 0) {
		collectionKeys.forEach((collectionKey) => {
			const collectionConfig = config.collections_config[collectionKey];
			tasks.push({
				level: 'recommended',
				title: `Complete your ${collectionConfig?.name ?? collectionKey} collection`,
				subtext: 'Tell CloudCannon more about your collection like how to display it or how it should be edited.',
				documentation: docsLink,
				actions: [{
					href: `cloudcannon:edit?editor=source&path=/${configFile}`,
					text: 'Edit global config',
					icon: 'edit'
				}],
				subtasks: collectionConfigSubtasks(collectionKey, collectionConfig)
			});
		});
	}
	return tasks;
}