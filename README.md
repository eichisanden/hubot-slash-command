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

When executing the slash command, redirects arguments of slash command to Hubot(Using robot.receive).
If you input `/some_command hubot ping` send `hubot ping` to Hubot. So you can get message by  `robot.respond(/ping/)`.

You can get message in your Hubot script(robot.hear, robot.respond) and do as you like.

## License

MIT

