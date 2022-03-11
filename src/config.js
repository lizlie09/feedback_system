module.exports = {
  env:{
    dev: process.env._pm2_version ? false : true,
  },
  mongodb: {
    ip: '127.0.0.1',
    port: '27017',
    app: 'feedback',
    username: 'lizlie',
    password: '*whatsthepassw0rd'
  },
  url: {
    local: '',
  },
  crypto: {
    privateKey: '37LvDSasdfasfsaf3a3IEIA;3r3oi3joijpjfa3a3m4XvjYOh9Yaa.p3id#IEYDNeaken',
    tokenExpiry: 1 * 30 * 1000 * 60 //1 hour
  },
  validation: {
    username: /^[a-zA-Z0-9]{5,12}$/,
    password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/
  }
};
