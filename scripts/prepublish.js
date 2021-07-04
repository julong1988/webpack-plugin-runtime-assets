const Listr = require('listr');

const { buildAllTasks, versionUpdateTasks } = require('./tasks');

const tasks = new Listr([...buildAllTasks, ...versionUpdateTasks]);

tasks.run().then(() => console.log('Success')).catch(err => {
	console.error(err);
});
