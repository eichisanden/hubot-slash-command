# hubot-slash-command

It redirects slash command of Slack or Mattermost to Hubot.

See [`src/hubot-slash-command.js`](src/hubot-slash-command.js) for full documentation.

## Installation

In hubot project repo, run:

`npm install hubot-slash-command --save`

Then add **hubot-slash-command** to your `external-scripts.json`:

```jsonAfter executing the command, a message will be sent

[
  "hubot-slash-command"
]
```

## Usage

Add Slash command to Slack or Mattermost.

| Request URL                                             | Request Method |
|:--------------------------------------------------------|----------------|
| http(s)://(your hubot host)/hubot--slash-command        | POST           |

When executing the slash command, redirects arguments of slash command to Hubot(Using robot.receive).  
If you input `/some_command ping` send `hubot ping` to Hubot.

So you can get message by `robot.respond(/ping/)`.

## Environment variables

- `HUBOT_RESPONSE_TYPE` default: `in_channel` - `in_channel` or `ephemeral`.
- `HUBOT_RESPONSE_MESSAGE` default: `Okey, ${user.name} ordders ``${command} ${text}``` - Response message format to chat.
- `HUBOT_RECEIVE_MESSAGE` default: `${robot_name} ${text}` - Receive message format for Hubot.
- `HUBOT_SLASH_COMMAND_TOKENS` default:none - Your tokens of slash command.

## Example for Environment variables

```
# the response messages will only be visible to the user that issued the command 
export HUBOT_RESPONSE_TYPE=ephemeral
# Response message format to chat.
export HUBOT_RESPONSE_MESSAGE='${user.name} execute command on ${channel_name}'
# Receive message format for Hubot.
export HUBOT_RECEIVE_MESSAGE='${robot_name} ${text}'
# Your tokens of slash command.
export HUBOT_SLASH_COMMAND_TOKENS=fpf9t5snkirmmyxanjj15o3uoh,ff33opd7q3nktx3jkoee17kbya
```

## variables for message format

- variables from Hubot robot object

|variable name|parameter|example|
|:------------|:--------|:------|
|${robot_name}|robot.name|Hubot |
|${robot_alias}|robot.alias|mybot |

- variables from request parameter

|variable name|parameter|example|
|:------------|:--------|:------|
|${channel_id}| channel_id|C2147483705|
|${channel_name}| channel_name|general|
|${command: req}| command|/some_command|
|${response_url}| response_url|https://hooks.slack.com/commands/1234/5678|
|${team_domain}| team_domain|example|
|${team_id}| team_id|T0001|
|${text}|text|weater Tokyo|
|${token}|token|gIkuvaNzQIHg97ATvDxqgjtO|
|${user_id}|user_id|U2147483697|
|${user_name}|user_name|Steve|

## License

MIT

