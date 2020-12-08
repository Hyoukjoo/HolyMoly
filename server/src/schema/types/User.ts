import { arg, extendType, intArg, mutationField, objectType, queryField, queryType } from '@nexus/schema';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.type();
  },
});

export const Query = queryField((t) => {
  t.crud.users();

  t.field('getUser', {
    type: 'User',
    list: true,
    resolve(_root, _args, ctx) {
      return ctx.prisma.user.findMany();
    },
  });

  t.field('getUserCount', {
    type: 'Int',
    description: 'Return number of users',
    resolve(_root, _args, ctx, _info) {
      return ctx.prisma.user.count();
    },
  });
});

export const Mutation = mutationField((t) => {
  t.field('addUser', {
    type: 'User',
    description: 'Register the user',
    args: {
      type: arg({
        type: 'UserType',
        default: 'REQUEST',
        nullable: true,
      }),
    },
    resolve(_root, args, ctx, _info) {
      return ctx.prisma.user.create({
        data: {
          type: args.type || 'REQUEST',
        },
      });
    },
  });

  t.field('deleteUser', {
    type: 'User',
    description: 'Delete the user',
    args: {
      id: intArg({ required: true }),
    },
    resolve(_root, args, ctx) {
      return ctx.prisma.user.delete({
        where: {
          id: args.id,
        },
      });
    },
  });
});
