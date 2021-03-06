const env = process.env.NODE_ENV || "production";
const config = {
    production: {
        api: {
            url: "http://www.20mk.cn:8089",
            timeout: 30000
        }
    },
    development: {
        api: {
            url: "http://localhost:8080",
            timeout: 30000
        }
    }
};
module.exports = config[env];