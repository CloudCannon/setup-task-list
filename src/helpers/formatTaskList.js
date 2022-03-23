import checkBasicTasks from './basicTasks.js';
import editablesConfigTasks from './editablesConfigTasks.js';
import collectionConfigTasks from './collectionConfigTasks.js';

export default function check(name, tasks) {
	const basicTasks = checkBasicTasks(config, files);
	const incompleteBasicTasks = basicTasks.filter((task) => !task.completed);

	const basicTaskList = {

	};
	if (incompleteBasicTasks.length !== 0) {
		return basicTaskList;
	}

	const taskLists = [
		basicTaskList,
		...collectionConfigTasks(config),
		...editablesConfigTasks(config)
	];

	return taskLists;
}