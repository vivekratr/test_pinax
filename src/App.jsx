import React from 'react'
import { useState } from 'react'
import { SepoliaContract } from "@substreams/contracts";
import { createRegistry, createRequest } from "@substreams/core";
import { readPackage } from "@substreams/manifest";
import { BlockEmitter } from "@substreams/node";
import { createNodeTransport } from "@substreams/node/createNodeTransport";
import { configDotenv } from "dotenv";


function App() {
  const [count, setCount] = useState(0)
  
const MANIFEST="https://github.com/pinax-network/substreams/releases/download/blocks-v0.1.0/blocks-v0.1.0.spkg"
const SUBSTREAMS_URL="https://arbsepolia.substreams.pinax.network:443"
const SUBSTREAMS_API_KEY="c725202fc015b8ca2b967bd0d05e34b16d79b499948abba2"
const   SUBSTREAMS_MODULE = "map_blocks"
const   SEPOLIA_NODE_URL = "https://sepolia.infura.io/v3/56694eabc3744a75b6c5ee372e369eff";
const   SEPOLIA_CONTRACT_ADDRESS = "0xD46a240A1d63B066340Af1D7f1D6359F0F6FD845";


  
  React.useEffect(() => {
    async function k() {
      const substreamPackage = await readPackage(MANIFEST);

const sepoliaContract = new SepoliaContract(SEPOLIA_CONTRACT_ADDRESS, SEPOLIA_NODE_URL);

const headers = new Headers({ "User-Agent": "@substreams/node" });
const registry = createRegistry(substreamPackage);
const transport = createNodeTransport(SUBSTREAMS_URL, SUBSTREAMS_API_KEY, registry, headers);
const request = createRequest({ substreamPackage, outputModule: SUBSTREAMS_MODULE, startBlockNum: -1 });

const emitter = new BlockEmitter(transport, request, registry);

// Subscribe to Sepolia contract events
sepoliaContract.subscribeToEvents((event) => {
  const eventData = {
    eventName: event.event,
    eventData: event.returnValues 
  };
  emitter.emit("anyMessage", eventData);
});

// Start emitter
  await emitter.start();
    }

    k();
  
    
  }, [])
  
  return (
    <>
     Hlel
    </>
  )
}

export default App
