import getUserId from '../utils/getUserId';

const Query = {
  users(parent, args, { prisma }, info) {
    const query = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };
    if (args.query) {
      query.where = {
        OR: [
          {
            name_contains: args.query
          }
        ]
      };
    }
    return prisma.query.users(query, info);
    /* three values can be provided for second argument (nothing, string, object) */
  }
};

export default Query;
