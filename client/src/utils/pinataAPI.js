import Web3EthContract from 'web3-eth-contract';
import Web3 from 'web3';
import axios from 'axios';
const FormData = require('form-data');
// require('dotenv').config();
// const fs = require('fs')
// const JWT = 'Bearer PASTE_YOUR_PINATA_JWT'


let jsonHeaders = {
  "Content-Type": "application/json",
  "pinata_api_key": process.env.REACT_APP_PINATA_API_KEY,
  "pinata_secret_api_key": process.env.REACT_APP_PINATA_API_SECRET,
}

let fileHeaders = {
  "pinata_api_key": `${process.env.REACT_APP_PINATA_API_KEY}`,
  "pinata_secret_api_key": `${process.env.REACT_APP_PINATA_API_SECRET}`,
}

export const getUserFilesPinata = async (address) => {
  console.log(address)
  try {
    const res = await axios({
      method: "get",
      url: `https://api.pinata.cloud/data/pinList?includeCount=false`,
      headers: {
          'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
          'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`,
      },
      params: {
        status: 'pinned',
        'metadata': {
          keyvalues: {'address': {"value": address, 'op': 'eq'}}
        }
      }
  });
    // console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const getSiteFilesPinata = async (address) => {
  try {
    const res = await axios({
      method: "get",
      url: `https://api.pinata.cloud/data/pinList?status=pinned?includeCount=false`,
      headers: {
          'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
          'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`,
      },
      params: {
        status: 'pinned',
        'metadata': {
          keyvalues: {
            'address': {"value": address, 'op': 'ne'},
            'selling': {"value": true, 'op': 'eq'}
          }
        }
      }
  });
    // console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const pinFilePinata = async (item) => {
  let formData = new FormData();
  const metadata = JSON.stringify({
    name: item.name,
    'keyvalues': {
      artist: item.artist,
      price: item.price,
      address: item.address,
      creator: item.address,
      selling: 'true'
    }
  });

  const options = JSON.stringify({
    cidVersion: 0,
  })

  formData.append('file', item.file);
  formData.append('pinataMetadata', metadata);
  formData.append('pinataOptions', options);

  try {
    const res = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data: formData,
      headers: {
          'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
          'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`,
          "Content-Type": "multipart/form-data"
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const updatePinPinata = async (item, newAddress) => {
  console.log(item)
  console.log(newAddress);
  const data = JSON.stringify({
    "ipfsPinHash": item.ipfs_pin_hash,
    "name": item.metadata.name,
    "keyvalues": {
      artist: item.metadata.keyvalues.artist,
      price: item.metadata.keyvalues.price,
      address: newAddress,
      creator: item.metadata.keyvalues.creator,
      tokenId: item.metadata.keyvalues.tokenId,
      selling: 'true'
    }
  });

  try {
    const res = await axios({
      method: "put",
      url: 'https://api.pinata.cloud/pinning/hashMetadata',
      headers: {
          'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
          'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`,
          "Content-Type": "application/json"
      },
      data: data
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}

export const updateInitialPinPinata = async (item, ipfsHash, tokenId) => {
  console.log(ipfsHash)
  console.log(tokenId)
  const data = JSON.stringify({
    "ipfsPinHash": ipfsHash.IpfsHash,
    "name": item.name,
    "keyvalues": {
      artist: item.artist,
      price: item.price,
      address: item.address,
      creator: item.address,
      tokenId: tokenId,
      selling: 'true'
    }
  });

  try {
    const res = await axios({
      method: "put",
      url: 'https://api.pinata.cloud/pinning/hashMetadata',
      headers: {
          'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
          'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`,
          "Content-Type": "application/json"
      },
      data: data
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

