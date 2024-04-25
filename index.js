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
        blocks,
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
        blocks,
        channel: slackChannelId,
        ts: ts,
        text: '-'
    });
};

async function main() {
    try {
        if (process.env.SLACK_MESSAGE_TS) {
            await updateSlackMessage({
                slackBotToken: process.env.SLACK_ACCESS_TOKEN,
                slackChannelId: process.env.SLACK_CHANNEL,
                ts: process.env.SLACK_MESSAGE_TS,
                blocks: process.env.FBZ_TEMPLATE_START
            });
        } else {
            const response = await sendSlackMessage({
                slackBotToken: process.env.SLACK_ACCESS_TOKEN,
                slackChannelId: process.env.SLACK_CHANNEL,
                blocks: process.env.FBZ_TEMPLATE_START
            });
            console.log(response.ts)
        }
    } catch (error) {
        console.error('Error running smoke tests:', error);
    }
}

main();