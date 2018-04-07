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

module.exports = (robot) => {
  robot.router.post('/hubot-mattermost-slash-command', (req, res) => {
    const user = robot.brain.userForId(req.body.user_id);
    user.name = req.body.user_name;
    user.room = req.body.channel_name;
    robot.receive(new TextMessage(user, `${robot.name} ${req.body.text}`));

    const msg = {};
    msg.response_type = responseType;
    const message = `Okey, ${req.body.user_name} orders \`${req.body.command} ${req.body.text}\``;
    msg.text = message;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(msg);
    res.end();
  });
};

