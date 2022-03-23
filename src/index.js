import checkBasicTasks from './setup.js';
import editablesConfigTasks from './editables.js';
import collectionConfigTasks from './collections.js';

export default function check(config, files) {
	const basicTasks = checkBasicTasks(config, files);
	const incompleteBasicTasks = basicTasks.filter((task) => !task.completed);
	const basicTaskList = {
		title: 'Connecting your site',
		subtext: 'Follow these steps to experience how CloudCannon helps empower thousands of static site teams to gain full control of their website and content.',
		tasks: basicTasks
	};
	if (incompleteBasicTasks.length !== 0) {
		return [basicTaskList];
	}

	const taskLists = [
		basicTaskList,
		{
			title: 'Polish your editing experience',
			subtext: 'Follow these steps to get CloudCannon customised for your editors needs',
			tasks: [
				...collectionConfigTasks(config),
				...editablesConfigTasks(config)
			]
		}
	];

	return taskLists;
}