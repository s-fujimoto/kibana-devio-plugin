export default function (server) {

  server.route({
    path: '/api/devio/example',
    method: 'GET',
    handler(req, reply) {
      reply({ time: (new Date()).toISOString() });
    }
  });

};
