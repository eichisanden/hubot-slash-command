# hubot-mattermost-slash-command

It redirects slash command of Mattermost to Hubot message.

See [`src/mattermost-slash-command.js`](src/mattermost-slash-command.js) for full documentation.

## Installation

In hubot project repo, run:

`npm install eichisanden/hubot-mattermost-slash-command --save`

Then add **hubot-mattermost-slash-command** to your `external-scripts.json`:

```jsonAfter executing the command, a message will be sent

[
  "hubot-mattermost-slash-command"
]
```

## Usage

Add Slash command to Mattermost.

| Request URL                                             | Request Method |
|:--------------------------------------------------------|----------------|
| http://Your hubot host/hubot-mattermost-slash-command | POST           |

When executing the slash command, redirects request parameter to Hubot(Using robot.receive).

Example Message.

```
'{"channel_id":"<channel_id>","channel_name":"town-square","command":"/bookmark","response_url":"not supported yet","team_domain":"work","team_id":"<team_id>","text":"http://www.google.com/","token":"<token>","user_id":"<user_id>","user_name":"eichisanden"}'
```

You can get message in your Hubot script(robot.hear, robot.respond) and do as you like.

## License

MIT

