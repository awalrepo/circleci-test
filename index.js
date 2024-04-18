import { WebClient } from '@slack/web-api';

async function sendSlackMessage ({blocks, slackBotToken, slackChannelId}) {
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
        blocks: blocks,
        channel: slackChannelId,
        text: '-'
    });
};

async function updateSlackMessage ({blocks, slackBotToken, slackChannelId, ts}) {
    if (!slackBotToken) {
        console.error('Failed to post on Slack Channel: slackBotToken not provided');
        return;
    }

    if (!slackChannelId) {
        console.error('Failed to post on Slack Channel: slackChannelId not provided');
        return;
    }

    const slackClient = new WebClient(slackBotToken);

    return slackClient.chat.update({
        blocks: blocks,
        channel: slackChannelId,
        ts: ts
    });
};

async function main() {
    try {
        if (process.env.SLACK_MESSAGE_TS) {
            await updateSlackMessage({
                slackBotToken: process.env.SLACK_ACCESS_TOKEN,
                slackChannelId: 'C06V5CYCK32',
                blocks: process.env.FBZ_TEMPLATE_START,
                ts: process.env.SLACK_MESSAGE_TS
            });
        } else {
            const response = await sendSlackMessage({
                slackBotToken: process.env.SLACK_ACCESS_TOKEN,
                slackChannelId: 'C06V5CYCK32',
                blocks: process.env.FBZ_TEMPLATE_START,
            });
            console.log(`export SLACK_MESSAGE_TS=${response.ts}`)
        }
    } catch (error) {
        console.error('Error running smoke tests:', error);
    }
}

main();