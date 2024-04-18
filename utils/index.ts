import { WebClient, Block, KnownBlock } from '@slack/web-api';

export interface SendSlackMessage {
    blocks: (Block|KnownBlock)[];
    slackBotToken?: string;
    slackChannelId?: string;
}

export const sendSlackMessage = async ({ blocks, slackBotToken, slackChannelId }: SendSlackMessage) => {
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