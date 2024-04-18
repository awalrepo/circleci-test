import { sendSlackMessage } from './utils';

async function main() {
    try {
        const response = sendSlackMessage({
            slackBotToken: process.env.SLACK_ACCESS_TOKEN,
            slackChannelId: 'C06V5CYCK32',
            message: process.env.FBZ_TEMPLATE_START,
        });
        console.log(`ts: ${response.ts}`)
    } catch (error) {
        console.error('Error running smoke tests:', error);
    }
}

main();