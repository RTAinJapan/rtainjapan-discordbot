const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  prefix: '!',
  allowedCommandChannel: {
    obsninja: ['792419980364087296'],
  },
  allowedCommandRole: {
    obsninja: ['走者', '走者（Backup）', '技術'],
  },
  env: {
    token: process.env.TOKEN != null ? process.env.TOKEN : '',
    ownerId: process.env.OWNER_ID != null ? process.env.OWNER_ID : '',
    obsninja: {
      room: process.env.OBSNINJA_ROOM != null ? process.env.OBSNINJA_ROOM : '',
      hash: process.env.OBSNINJA_HASH != null ? process.env.OBSNINJA_HASH : '',
      password:
        process.env.OBSNINJA_PASSWORD != null
          ? process.env.OBSNINJA_PASSWORD
          : '',
    },
  },
};
