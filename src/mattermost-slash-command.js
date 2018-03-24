// Description
//   Convdrt Mattermost's slash command to outcoming message.
//
// Configuration:
//
// Commands:
//
// Notes:
//
// Author:
//   eichisanden

const TextMessage = require('hubot').TextMessage;

module.exports = (robot) => {
  robot.router.post('/hubot-mattermost-slash-command', (req, res) => {
    const user = robot.brain.userForId(req.body.user_id);
    user.name = req.body.user_name;
    user.room = req.body.channel_name;
    robot.receive(new TextMessage(user, JSON.stringify(req.body)));

    const msg = {};
    msg.response_type = "in_channel";
    msg.text = "Your order has been received.";
    res.status(200).send(msg);
    res.end();
  });
};

