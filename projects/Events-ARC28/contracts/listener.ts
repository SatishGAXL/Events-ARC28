import { AlgorandSubscriber, getSubscribedTransactions } from '@algorandfoundation/algokit-subscriber';
import { Arc28EventGroup } from '@algorandfoundation/algokit-subscriber/types/arc-28';
import abispec from './artifacts/Event.arc32.json';
import * as algosdk from 'algosdk';

// Initialize Algod client
const algodClient = new algosdk.Algodv2('', 'https://testnet-api.algonode.cloud', 443);
// Initialize Indexer client
const indexerClient = new algosdk.Indexer('', 'https://testnet-idx.algonode.cloud', 443);

// Define the event group configuration for ARC28 events
const group1Events: Arc28EventGroup = {
  groupName: 'group1',
  events: abispec.contract.events, // Load event definitions from the ABI specification file
};

// Initialize watermark to 0
let watermark = 0;

// Define an in-memory watermark persistence mechanism
const InMemoryWatermark = (get: () => number, set: (w: number) => void) => ({
  set: async (w: number) => {
    set(w); // Set the watermark value
  },
  get: async () => get(), // Get the watermark value
});

// Create an AlgorandSubscriber instance
const subscriber = new AlgorandSubscriber(
  {
    filters: [
      {
        name: 'eventfilter',
        filter: { arc28Events: [{ groupName: 'group1', eventName: 'CalledMethodEvent' }], appId: 675499327 }, // Filter configuration: subscribe to 'CalledMethodEvent' events for a specific app ID
      },
    ],
    arc28Events: [group1Events], // ARC28 event group configuration
    syncBehaviour: 'skip-sync-newest', // Synchronization behavior: skip syncing the newest transactions
    watermarkPersistence: InMemoryWatermark(
      () => watermark, // Function to get the current watermark
      (w) => (watermark = w) // Function to set the watermark
    ),
  },
  algodClient,
  indexerClient
);

// Define an event handler for the 'eventfilter' event
subscriber.on('eventfilter', async (transaction) => {
  console.log(transaction); // Log the entire transaction
  console.log(transaction.arc28Events![0]); // Log the first ARC28 event found in the transaction
});

// Start the subscriber to begin listening for events
subscriber.start();
