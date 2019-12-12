import { Lotus } from '@openworklabs/lotus-block-explorer';

const lotus = new Lotus({
  jsonrpcEndpoint: 'https://lotus-dev.temporal.cloud/rpc/v0',
});

export default async function fetchActors() {
  const actors = await lotus.listActors();
  console.log(actors);
  return actors;
}
