const development = {
    // mongoURL: 'mongodb://admin:tht2017PCMG@23.88.239.10:61511/tuoihoctro',
  mongoURL: 'mongodb://admin:khoquaqk@45.76.150.220:61511/hotgapp',
  key: {
    privateKey: 'PRIVATEKEYGOESHERE',
    tokenExpiry: 30 * 1000 * 60, // 1 hour
  },
  token: {
    guest: 'CRzytqL1lv1o8FaogFa2S4MyYU4F6Z9D',
  },
  facebook: {
    clientID: '1559166841054175',
    clientSecret: '036522e3d958646273f13b3f9ffce3cd',
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'email', 'gender'],
  },
  google: {
    clientID: '844189525883-op8r9biu0u8rotve147erv08dsmv3fr6.apps.googleusercontent.com',
    clientSecret: 'cNztTZyza-QkaijXejKP2lRj',
    callbackURL: '/auth/google/callback',
    profileFields: ['id', 'displayName', 'email', 'gender'],
  },
  email: {
    username: 'crowdbam.system',
    password: 'crowdbam@sgp',
    accountName: 'Crowd Bam',
    verifyEmailUrl: 'action/verify',
    resetPasswordUrl: 'action/reset',
  },
  host: `http://localhost:${process.env.PORT}`,
  port: process.env.PORT,
  channel: process.env.CHANNEL,
  app: {
    id: '170584416691811',
    name: 'Title',
    description: 'Description',
    url: `${process.env.PROTOCOL}//${process.env.CHANNEL}.${process.env.DOMAIN}`,
    image: `${process.env.PROTOCOL}//${process.env.CHANNEL}.${process.env.DOMAIN}/sources/ads.jpg`,
  },
};
export default development;
