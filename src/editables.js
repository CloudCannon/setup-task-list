const docsLink = {
	text: 'Defining custom toolbars',
	url: 'https://cloudcannon.com/documentation/articles/defining-editable-regions-in-your-html/#options',
};

const editableKeys = {
	content: {
		level: 'recommended',
		subtext: 'Change the toolbar for markdown files.'
	},
	text: {
		level: 'optional',
		subtext: 'Change the toolbar for the paragraph and heading tags'
	},
	block: {
		level: 'optional',
		subtext: 'Change the toolbar for the div, section, aside and any other block level tags'
	}
};

function editablesConfigSubtask(config, key) {
	return {
		...editableKeys[key],
		id: `_editables.${key}`,
		title: `Customise the editor toolbar for ${key} editing`,
		completed: !!config?._editables?.[key]
	};
}

export default function editablesConfigTasks(config, configFile) {
	return [{
		id: '_editables.markdown',
		level: 'recommended',
		title: 'Customise the editor toolbars',
		subtext: 'Reduce or increase the number of options for your editors. As a minimum it is recommended that you look at the heading levels available.',
		documentation: docsLink,
		actions: [{
			href: `cloudcannon:edit?editor=source&path=/${configFile}`,
			text: 'Edit global config',
			icon: 'edit'
		}],
		subtasks: Object.keys(editableKeys)
			.map((key) => editablesConfigSubtask(config, key))
	}];
}