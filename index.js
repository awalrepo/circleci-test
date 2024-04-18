import { WebClient } from '@slack/web-api';

async function sendSlackMessage (blocks, slackBotToken, slackChannelId) {
    if (!slackBotToken) {
        console.error('Failed to post on Slack Channel: slackBotToken not provided');
        return;
    }

    if (!slackChannelId) {
        console.error('Failed to post on Slack Channel: slackChannelId not provided');
        return;
    }

    const slackClient = new WebClient(slackBotToken);

    return slackClient.chat.postMessage({
        blocks,
        channel: slackChannelId,
        unfurl_links: false,
    });
};

async function main() {
    try {
        // const response = await sendSlackMessage({
        //     slackBotToken: process.env.SLACK_ACCESS_TOKEN,
        //     slackChannelId: 'C06V5CYCK32',
        //     message: process.env.FBZ_TEMPLATE_START,
        // });
        console.log('yellow')
    } catch (error) {
        console.error('Error running smoke tests:', error);
    }
}

main();