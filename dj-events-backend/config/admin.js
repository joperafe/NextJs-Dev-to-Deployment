module.exports = ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET", "b5e628dc4e113cc5e67d045003ce76b7"),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT", "glAPwLV3Cnrp/Pic7znDug=="),
  },
});
