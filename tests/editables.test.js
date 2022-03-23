import test from 'ava';
import check from '../src/editables.js';

test('No editables defined', async (t) => {
	const tasks = check(null);

	t.is(tasks.length, 1);
	const incompleteTasks = tasks[0].subtasks.filter((task) => !task.completed);
	t.is(incompleteTasks.length, 3);
	t.is(tasks[0].subtasks[0].level, 'recommended');
	t.is(tasks[0].subtasks[1].level, 'optional');
	t.is(tasks[0].subtasks[2].level, 'optional');
});

test('No editables defined (alternate)', async (t) => {
	const tasks = check({});

	t.is(tasks.length, 1);
	const incompleteTasks = tasks[0].subtasks.filter((task) => !task.completed);
	t.is(incompleteTasks.length, 3);
});

test('markdown toolbar', async (t) => {
	const tasks = check({
		_editables: {
			content: {
				bold: true
			}
		}
	});

	t.is(tasks.length, 1);
	const incompleteTasks = tasks[0].subtasks.filter((task) => !task.completed);
	t.is(incompleteTasks.length, 2);
});

test('all toolbars', async (t) => {
	const tasks = check({
		_editables: {
			text: {
				italic: true
			},
			block: {
				format: 'p h3',
				undo: true,
				redo: true
			},
			content: {
				blockquote: true,
				bold: true,
				format: 'p h1 h2 h3 h4 h5 h6 pre address div',
				italic: true,
				strike: true,
				subscript: true,
				superscript: true,
				underline: true,
				bulletedlist: true,
				indent: true,
				numberedlist: true,
				outdent: true,
				code: true,
				embed: true,
				horizontalrule: true,
				image: true,
				table: true,
				undo: true,
				redo: true,
				removeformat: true,
				copyformatting: true,
				styles: '/css/editor.css',
				left: 'align-left',
				center: 'align-center',
				right: 'align-right',
				justify: 'align-justify'
			}
		}
	});

	t.is(tasks.length, 1);
	const incompleteTasks = tasks[0].subtasks.filter((task) => !task.completed);
	t.is(incompleteTasks.length, 0);
});