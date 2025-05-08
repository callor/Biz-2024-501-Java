import 'fastify';

declare module 'fastify' {
  export interface FastifyRequest {
    user: { authId: string; userId: string; kornm: string };
  }
}
