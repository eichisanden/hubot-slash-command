// Description
//   It redirects slash command of Mattermost to hubot message. 
//
// Configuration:
//   MATTERMOST_RESPONSE_TYPE - 'in_channel' or 'ephemeral'. (Default: 'in_channel')
//
// Author:
//   eichisanden

const TextMessage = require('hubot').TextMessage;

const responseType = process.env.MATTERMOST_RESPONSE_TYPE || 'in_channel';
const responseMessage = process.env.MATTERMOST_RESPONSE_MESSAGE || "Okey, ${user_name} orders `${command} ${text}`";
const receiveMessage = process.env.MATTERMOST_RECEIVE_MESSAGE || "${robot_name} ${text}";

module.exports = (robot) => {
  robot.router.post('/hubot-mattermost-slash-command', (req, res) => {
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
    user.room = req.body.channel_name;
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

function applyTemplate(str, dict) {
  Object.keys(dict).forEach((key) => {str = str.replace(new RegExp('\\${' + key + '}', 'g'), dict[key];});
  return str;
}
