"use strict";

const { sanitize } = require("@strapi/utils");

/**
 *  event controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::event.event", ({ strapi }) => ({
  // Create event with linked user
  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);

      data.user = ctx.state.user.id;
      entity = await strapi.query("api::event.event").create(data, { files });
    } else {
      ctx.request.body.user = ctx.state.user.id;
      entity = await strapi.query("api::event.event").create(ctx.request.body);
    }

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },

  // Update user event
  async update(ctx) {
    const { id } = ctx.params;

    let entity;

    const [event] = await strapi.query("api::event.event").findMany({
      where: { id, user: ctx.state.user.id },
    });

    if (!event) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);

      entity = await strapi.db.query("api::event.event").update({
        where: { id },
        data,
        files,
      });
    } else {
      entity = await strapi.db.query("api::event.event").update({
        where: { id },
        data: ctx.request.body,
      });
    }

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },

  // Delete user event
  async delete(ctx) {
    const { id } = ctx.params;

    const [events] = await strapi.query("api::event.event").findMany({
      where: { id, user: ctx.state.user.id },
    });

    if (!events) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    const entity = await strapi.db.query("api::event.event").delete({ id });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },

  async me(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        { message: "No authorization header was found" },
      ]);
    }

    const data = await strapi.query("api::event.event").findMany({
      where: { user: user.id },
      // populate: true,
    });

    // console.log("DATA EVENTS ", user, data);

    const sanitizedEntity = await this.sanitizeOutput(data, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));
