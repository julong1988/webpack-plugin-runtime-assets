const Listr = require('listr');
const { buildAllTasks } = require('./tasks');

const tasks = new Listr(buildAllTasks);

tasks.run().then(() => console.log('Success')).catch(err => {
	console.error(err);
});