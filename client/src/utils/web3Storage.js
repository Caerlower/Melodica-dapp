import { Web3Storage, getFilesFromPath } from 'web3.storage';
import { toast } from 'react-toastify';
import mime from 'mime-types'; // for detecting file type

// Replace with your actual Web3.Storage API token
const WEB3_STORAGE_API_TOKEN = process.env.REACT_APP_WEB3_STORAGE_API_KEY; 

const client = new Web3Storage({ token: WEB3_STORAGE_API_KEY });

// Store NFT data and files on Web3.Storage
export async function storeNFT(nft) {
    try {
        // File Preparation
        const files = [];
        // Process the image file
        if(nft.image) {
            const imgType = mime.lookup(nft.image);
            if(imgType && imgType.startsWith("image/")) {
                const imageFile = new File([convertBase64ToUint8Array(nft.image)], `cover.${mime.extension(imgType)}`, { type: imgType });
                files.push(imageFile);
            } else {
                console.warn("Invalid image file type.");
            }
        }
        
        // Process the audio file
        if(nft.audio) {
            const audioType = mime.lookup(nft.audio);
            if(audioType && audioType.startsWith("audio/")) {
                const audioFile = new File([convertBase64ToUint8Array(nft.audio)], `music.${mime.extension(audioType)}`, { type: audioType });
                files.push(audioFile);
            } else {
                console.warn("Invalid audio file type.");
            }
        }

        // Storing on Web3.Storage with Metadata
        const metadata = {
            name: nft.title,
            description: nft.description,
            image: nft.image ? `ipfs://${cid}/${files[0].name}` : undefined, // Ensure image exists
            properties: {
                artist: nft.artist,
                genre: nft.genre,
                royaltyPercentage: nft.royaltyPercentage, 
            },
            animation_url: nft.audio ? `ipfs://${cid}/${files[1].name}` : undefined,  // Ensure audio exists
            // Add other relevant NFT metadata properties
        };

        const cid = await client.put(files, { wrapWithDirectory: false }); // Store files
        metadata.image = `ipfs://${cid}/${files[0].name}`; // Construct metadata URI for image
        metadata.animation_url = `ipfs://${cid}/${files[1].name}`; // Construct metadata URI for audio

        // Store metadata separately
        const metadataFile = new File([JSON.stringify(metadata)], 'metadata.json', { type: 'application/json' });
        await client.put([metadataFile], { wrapWithDirectory: false });

        const metadataUri = `ipfs://${cid}/metadata.json`; // Construct metadata URI
        return metadataUri;
    } catch (error) {
        console.error('Error storing NFT on Web3.Storage:', error);
        toast.error('Error storing NFT. Please try again later.');
        throw error;
    }
}

// Retrieve NFT metadata from Web3.Storage
export async function retrieveNFTMetadata(metadataUri) {
    try {
        const res = await client.get(metadataUri.replace('ipfs://', ''));
        if (res.ok) {
            const files = await res.files();
            const metadataFile = files.find(file => file.name === 'metadata.json');
            if (!metadataFile) {
                throw new Error('Metadata file not found in the response.');
            }
            const text = await metadataFile.text();
            return JSON.parse(text);
        } else {
            throw new Error(`failed to get ${metadataUri}: ${res.status}`);
        }
    } catch (error) {
        console.error('Error retrieving NFT metadata:', error);
        throw error;
    }
}

// Helper function to convert Base64 to Uint8Array
function convertBase64ToUint8Array(base64String) {
    const base64Data = base64String.replace(/^data:.*,/, '');
    const binaryString = atob(base64Data);
    const array = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        array[i] = binaryString.charCodeAt(i);
    }
    return array;
}
