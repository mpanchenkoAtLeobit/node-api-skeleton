import {App} from './src/index';

const app = new App();

app.start();

process.on('SIGTERM', async () => {
    await app.shutdown();
    process.exit();
});
