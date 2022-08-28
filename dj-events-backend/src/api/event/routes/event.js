"use strict";

/**
 * event router.
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::event.event", ({ strapi }) => ({
  me: async (ctx, next) => {
    console.log("here?? ctx ", ctx);
    ctx.body = "ok";
  },
}));
