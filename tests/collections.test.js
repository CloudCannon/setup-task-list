import test from 'ava';
import check from '../src/collections.js';

test('No collections defined', async (t) => {
	const tasks = check(null);

	t.is(tasks.length, 1);
});