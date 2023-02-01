import * as dotenv from "dotenv";
import { Attribute, Metadata } from "./types";

const fs = require("fs");
const FormData = require("form-data");
const rfs = require("recursive-fs");
const basePathConverter = require("base-path-converter");
const got = require('got');

dotenv.config();

const PINATA_JWT = process.env.PINATA_JWT;

export const pinDirectoryToPinata = async (path) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  const src = path;
  var status = 0;
  try {
    const { dirs, files } = await rfs.read(src);
    let data = new FormData();
    for (const file of files) {
      data.append(`file`, fs.createReadStream(file), {
        filepath: basePathConverter(src, file),
      });
    }
    const response = await got(url, {
      method: 'POST',
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        "Authorization": PINATA_JWT
      },
      body: data
    })
      .on('uploadProgress', progress => {
        console.log(progress);
      });
    return (JSON.parse(response.body));
  } catch (error) {
    console.log(error);
  }
};

export function buildMetadata(name, imageURL, description, attributes) {
  const metadata = {
    "name": name,
    "image": imageURL,
    "description": description,
    "attributes": attributes
  };
  return metadata;
}

export async function publishMetadata(metadata, collection) {
  var axios = require('axios');
  var stringified_metadata = JSON.stringify(metadata)
  var data = JSON.stringify({
    "pinataOptions": {
      "cidVersion": 1
    },
    "pinataMetadata": {
      "name": metadata.name,
      "keyvalues": {
        "collection": collection
      }
    },
    "pinataContent": {
      stringified_metadata
    }
  });

  var config = {
    method: 'post',
    url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + PINATA_JWT
    },
    data: data
  };

  const res = await axios(config);

  return res.data;
}

