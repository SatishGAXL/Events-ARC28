import { AlgorandSubscriber, getSubscribedTransactions } from '@algorandfoundation/algokit-subscriber';
import { Arc28EventGroup } from '@algorandfoundation/algokit-subscriber/types/arc-28';
import abispec from './artifacts/Event.arc32.json';
import * as algosdk from 'algosdk';

const algodClient = new algosdk.Algodv2('', 'https://testnet-api.algonode.cloud', 443);
const indexerClient = new algosdk.Indexer('', 'https://testnet-idx.algonode.cloud', 443);

const group1Events: Arc28EventGroup = {
  groupName: 'group1',
  events: abispec.contract.events,
};

let watermark = 0;

const InMemoryWatermark = (get: () => number, set: (w: number) => void) => ({
  set: async (w: number) => {
    set(w);
  },
  get: async () => get(),
});

const subscriber = new AlgorandSubscriber(
  {
    filters: [
      {
        name: 'eventfilter',
        filter: { arc28Events: [{ groupName: 'group1', eventName: 'CalledMethodEvent' }], appId: 675499327 },
      },
    ],
    arc28Events: [group1Events],
    syncBehaviour: "skip-sync-newest",
    watermarkPersistence: InMemoryWatermark(
      () => watermark,
      (w) => (watermark = w)
    ),
  },
  algodClient,
  indexerClient
);

subscriber.on('eventfilter', async (transaction) => {
  console.log(transaction)
  console.log(transaction.arc28Events![0]);
});

subscriber.start();
