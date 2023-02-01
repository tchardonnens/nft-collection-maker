//Mint a pre-existing collection of images
//All the collection should be in the same folder

import { pinDirectoryToPinata } from "./utils";

const dotenv = require("dotenv");
const fs = require("fs");
//const buildMetadata = require("./utils");
//const publishMetadata = require("./utils");

dotenv.config();

const collection_name = "Cartoon Lamas";
const collection_path = "/Users/thomas/Pictures/nft-collections/Cartoon_lamas";
const collection_description = "Your stylish lama. This one doesn't spit."

const pinata_upload_response = pinDirectoryToPinata(collection_path)

console.log(pinata_upload_response);

// fs.readdir(collection_path, (error, files) => {
//   if (error) {
//     console.error("An error occurred while reading the directory:", error);
//   } else {
//     let i = 0;
//     for (const file of files) {
//       let file_name = file;
//       let metadata = buildMetadata(file_name, "", collection_description, null)
//       let res = publishMetadata(metadata, collection_name)
//     }
//   }
// });
