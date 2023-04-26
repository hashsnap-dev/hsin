'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findOne(ctx) {
    const entity = await strapi.services['news-data'].findOne({id: ctx.params.id});

    strapi.query('news-data').update({ id: entity.id }, {
      views: (entity.views ?? 0) + 1,
    });

    return entity;
  },
};
