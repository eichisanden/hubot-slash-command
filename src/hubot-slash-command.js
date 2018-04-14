// Description
//   It redirects slash command of Slack or Mattermost to hubot message. 
//
// Configuration:
//   HUBOT_RESPONSE_TYPE - 'in_channel' or 'ephemeral'. (Default: 'in_channel')
//   HUBOT_RESPONSE_MESSAGE - Response message format to chat
//   HUBOT_RECEIVE_MESSAGE - Receive message format for hubot
//   HUBOT_SLASH_COMMAND_TOKENS - Your token of slash command
//
// Author:
//   eichisanden

const TextMessage = require('hubot').TextMessage;

const responseType = process.env.HUBOT_RESPONSE_TYPE || 'in_channel',
      responseMessage = "HUBOT_RESPONSE_MESSAGE" in process.env ? process.env.HUBOT_RESPONSE_MESSAGE : "Okey, ${user_name} orders `${command} ${text}`",
      receiveMessage = process.env.HUBOT_RECEIVE_MESSAGE || "${robot_name} ${text}",
      tokens = process.env.HUBOT_SLASH_COMMAND_TOKENS || '';

module.exports = (robot) => {
  robot.router.post('/hubot-slash-command', (req, res) => {

    if (!validateToken(tokens, req.body.token)) {
      robot.logger.error("Invlid token.");
      return;
    }

    const dict = {
      robot_name: robot.name,
      robot_alias: robot.alias,
      channel_id: req.body.channel_id,
      channel_name: req.body.channel_name,
      command: req.body.command,
      response_url: req.body.response_url,
      team_domain: req.body.team_domain,
      team_id: req.body.team_id,
      text: req.body.text,
      token: req.body.token,
      user_id: req.body.user_id,
      user_name: req.body.user_name
    };

    const user = robot.brain.userForId(req.body.user_id);
    user.name = req.body.user_name;
    // Set channel_id for private channel of Slack
    if (req.get('user-agent').match(/slack/i)) {
      user.room = req.body.channel_id;
    } else {
      user.room = req.body.channel_name;
    }
    robot.receive(new TextMessage(user, applyTemplate(receiveMessage, dict)));

    const msg = {};
    msg.response_type = responseType;
    const message = applyTemplate(responseMessage, dict);
    msg.text = message;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(msg);
    res.end();
  });
};

function validateToken(tokens, token) {
  for (t of tokens.split(',')) {
    if (t === token) {
      return true;
    }
  }
  return false;
}

function applyTemplate(str, dict) {
  Object.keys(dict).forEach((key) => {str = str.replace(new RegExp('\\${' + key + '}', 'g'), dict[key]);});
  return str;
}
