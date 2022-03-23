const docsLink = {
	text: 'Defining custom toolbars',
	url: 'https://cloudcannon.com/documentation/articles/defining-editable-regions-in-your-html/#options',
};

const editableKeys = {
	content: {
		level: 'recommended'
	},
	text: {
		level: 'optional'
	},
	block: {
		level: 'optional'
	}
};

function editablesConfigSubtask(config, key) {
	return {
		id: `_editables.${key}`,
		level: editableKeys[key].level,
		title: `Customise the editor toolbar for ${key} editing`,
		completed: !!config?._editables?.[key]
	};
}

export default function editablesConfigTasks(config) {
	return [{
		id: '_editables.markdown',
		level: 'recommended',
		title: 'Customise the editor toolbars',
		documentation: docsLink,
		subtasks: Object.keys(editableKeys)
			.map((key) => editablesConfigSubtask(config, key))
	}];
}