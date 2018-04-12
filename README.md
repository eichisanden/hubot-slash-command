# hubot-slash-command

It redirects slash command of Slack and Mattermost to Hubot.  
Outgoing webhook can not be used on the private channel, so use the slash command to accomplish the same thing.

See [`src/hubot-slash-command.js`](src/hubot-slash-command.js) for full documentation.

## Installation

In hubot project repo, run:

`npm install hubot-slash-command --save`

Then add **hubot-slash-command** to your `external-scripts.json`:

```
[
  "hubot-slash-command"
]
```
And restart Hubot.

## Add Slash command

Add Slash command to Slack or Mattermost.

| Request URL                                                   | Request Method |
|:--------------------------------------------------------------|----------------|
| http(s)://(your hubot hostname):(port)/hubot-slash-command    | POST           |

Please write down token.

## Environment variables

- `HUBOT_RESPONSE_TYPE` default: `in_channel` - `in_channel`(Show a response message to all member) or `ephemeral`(Visible to ther user that issued the command).
- `HUBOT_RESPONSE_MESSAGE` default: ``Okey, ${user_name} orders `${command} ${text}` `` - Format response message to chat.
- `HUBOT_RECEIVE_MESSAGE` default: `${robot_name} ${text}` - Format send message to Hubot.
- `HUBOT_SLASH_COMMAND_TOKENS` default:none - Your tokens of slash command(comma separated).

## Example for Environment variables

```
# the response messages will only be visible to the user that issued the command 
export HUBOT_RESPONSE_TYPE=ephemeral
# Response message format to Chat.
export HUBOT_RESPONSE_MESSAGE='${user.name} execute command on ${channel_name}'
# Send message format to Hubot.
export HUBOT_RECEIVE_MESSAGE='${robot_name} ${text}'
# Your tokens of slash command.
export HUBOT_SLASH_COMMAND_TOKENS=fpf9t5snkirmmyxanjj15o3uoh,ff33opd7q3nktx3jkoee17kbya
```

## Variables for message

- Variables from Hubot Robot object.

|Variable name|Parameter|Example|
|:------------|:--------|:------|
|${robot_name}|robot.name|Hubot |
|${robot_alias}|robot.alias|mybot |

- Variables from request parameter of slash command.

|Variable name|Parameter|Example|
|:------------|:--------|:------|
|${channel_id}| channel_id|C2147483705|
|${channel_name}| channel_name|general|
|${command}| command|/some_command|
|${response_url}| response_url|https://hooks.slack.com/commands/12345678|
|${team_domain}| team_domain|example|
|${team_id}| team_id|T0001|
|${text}|text|weater Tokyo|
|${token}|token|gIkuvaNzQIHg97ATvDxqgjtO|
|${user_id}|user_id|U2147483697|
|${user_name}|user_name|Steve|

## Usage

When executing the slash command, redirects arguments of slash command to Hubot.  
If you input `/some_command ping`, send `hubot ping` to Hubot.

So you can get message by `robot.respond(/ping/)`.

## License

MIT

