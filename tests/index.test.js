import test from 'ava';
import check from '../src/index.js';

const cloudcannonConfig = { name: 'cloudcannon-reader', version: '1.0.0' };
const validConfig = { cloudcannon: cloudcannonConfig };

test('No actions taken', async (t) => {
	const taskLists = check(null, null);

	t.is(taskLists.length, 1);
	t.is(taskLists[0].tasks.length, 4);
	const incompleteTasks = taskLists[0].tasks.filter((task) => !task.completed);
	t.is(incompleteTasks.length, 4);
});

test('No actions taken (alternate)', async (t) => {
	const files = [];
	const taskLists = check(null, files);

	t.is(taskLists.length, 1);
	t.is(taskLists[0].tasks.length, 4);
	const incompleteTasks = taskLists[0].tasks.filter((task) => !task.completed);
	t.is(incompleteTasks.length, 4);
});

test('No build', async (t) => {
	const files = ['index.html'];
	const taskLists = check(null, files);

	t.is(taskLists.length, 1);
	t.is(taskLists[0].tasks.length, 4);
	const incompleteTasks = taskLists[0].tasks.filter((task) => !task.completed);
	t.is(incompleteTasks.length, 3);
});

test('No build (alternate)', async (t) => {
	const files = ['index.html'];
	const taskLists = check({}, files);

	t.is(taskLists.length, 1);
	t.is(taskLists[0].tasks.length, 4);
	const incompleteTasks = taskLists[0].tasks.filter((task) => !task.completed);
	t.is(incompleteTasks.length, 3);
});

test('Has build (alternate)', async (t) => {
	const files = ['index.html'];
	const taskLists = check({ error: 'NOFILEFOUND' }, files);

	t.is(taskLists.length, 1);
	t.is(taskLists[0].tasks.length, 4);
	const incompleteTasks = taskLists[0].tasks.filter((task) => !task.completed);
	t.is(incompleteTasks.length, 2);
});

test('No config file', async (t) => {
	const files = ['index.html'];
	const taskLists = check(validConfig, files);

	t.is(taskLists.length, 1);
	t.is(taskLists[0].tasks.length, 4);
	const incompleteTasks = taskLists[0].tasks.filter((task) => !task.completed);
	t.is(incompleteTasks.length, 2);
});

test('No collections', async (t) => {
	const files = ['index.html', 'cloudcannon.config.json'];
	const taskLists = check(validConfig, files);

	t.is(taskLists.length, 1);
	t.is(taskLists[0].tasks.length, 4);
	const incompleteTasks = taskLists[0].tasks.filter((task) => !task.completed);
	t.is(incompleteTasks.length, 1);
});

test('Invalid config extension', async (t) => {
	const files = ['index.html', 'cloudcannon.config.georgeplate'];
	const taskLists = check(validConfig, files);

	t.is(taskLists.length, 1);
	t.is(taskLists[0].tasks.length, 4);
	const incompleteTasks = taskLists[0].tasks.filter((task) => !task.completed);
	t.is(incompleteTasks.length, 2);
});

test('Collection without config', async (t) => {
	const files = ['index.html', 'cloudcannon.config.json'];
	const taskLists = check({
		...validConfig,
		collections_config: {
			staff: null
		}
	}, files);

	t.is(taskLists.length, 2);
	t.is(taskLists[1].tasks[1].subtasks.length > 0, true);
	const incompleteTaskLists = taskLists[1].tasks.filter((task) => !task.completed);
	t.is(incompleteTaskLists.length, 2);
});
