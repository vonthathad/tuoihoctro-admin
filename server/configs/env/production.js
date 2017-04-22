const production = {
    //    mongoURL: 'mongodb://admin:tht2017PCMG@23.88.239.10:61511/tuoihoctro',
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
  email: {
    username: 'crowdbam.com',
    password: 'crowdbam123',
    accountName: 'Crowd Bam',
    verifyEmailUrl: 'action/verify',
    resetPasswordUrl: 'action/reset',
  },
  host: `${process.env.PROTOCOL}//${process.env.DOMAIN}`,
  port: process.env.PORT,
  app: {
    id: '170584416691811',
    name: 'Title',
    description: 'Description',
    url: `${process.env.PROTOCOL}//${process.env.DOMAIN}`,
    image: `${process.env.PROTOCOL}//${process.env.DOMAIN}/sources/ads.jpg`,
  },
};
export default production;
