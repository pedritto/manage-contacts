module.exports = {
    mongodb: {
        uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1/test'
    },
    partners: {
        server: process.env.PARTNER_SERVER || 'http://localhost:9090'
    },
};
