# Algorand Events (ARC-28) Demo

This project demonstrates how to emit and listen to events in Algorand smart contracts using TEALScript and ARC-28 event specifications.

## Prerequisites

- AlgoKit v2
- Node.js v20
- npm

## Project Structure

```
├── projects/
│   └── Events-ARC28/
│       ├── contracts/
│       │   ├── Events.algo.ts    # Smart contract with event definitions
│       │   ├── listener.ts       # Event listener implementation
│       │   └── artifacts/        # Generated contract artifacts
└── README.md
```

## Setup

1. Clone the repository
    ```bash
    git clone https://github.com/SatishGAXL/Events-ARC28.git
    cd Events-ARC28
    ```
2. Navigate to the project directory:
   ```bash
   cd projects/Events-ARC28
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Smart Contract

The smart contract (`Events.algo.ts`) demonstrates:
- Event emission using TEALScript's `EventLogger`
- Three methods that emit events: `createApplication`, `first_method`, and `second_method`
- Each method logs a `CalledMethodEvent` with the sender's address and a message

## Building the Contract

To compile the smart contract:

```bash
npm run build
```

This will generate the contract artifacts in the `artifacts` directory, including the ABI specification.

## Deploying the Contract

The contract has been deployed on Algorand TestNet using [AppLab in Lora](https://lora.algokit.io/testnet/app-lab). You can deploy your own instance:

1. Use AlgoKit or any other deployment method to deploy the contract
2. Note down the Application ID of your deployed contract
3. Update the `appId` in `listener.ts` with your contract's Application ID

## Event Listening

The `listener.ts` script demonstrates:
- How to subscribe to ARC-28 events
- Setting up filters for specific events
- Processing and logging received events

To run the listener:

```bash
ts-node contracts/listener.ts
```

## Event Structure

The contract emits `CalledMethodEvent` with the following structure:
- `sender`: Address of the account calling the method
- `msg`: String message indicating which method was called