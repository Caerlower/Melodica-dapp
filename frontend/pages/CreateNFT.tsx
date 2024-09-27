import React, { useState } from 'react';
import './CreateNFT.scss';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';
import toast from 'react-hot-toast';

const MODULE_ADDRESS = '0xYourModuleAddressHere'; // Replace with your actual Move contract address

// Helper function to convert string to hex
const stringToHex = (str: string) => {
    return Array.from(str, (c) => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
};

const CreateNFT: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>('');
    const { account, signAndSubmitTransaction } = useWallet();
    const config = new AptosConfig({ network: Network.TESTNET });
    const client = new Aptos(config);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title || !description || !price || !file) {
            alert('Please fill in all fields and upload an image.');
            return;
        }

        try {
            // Upload the file to IPFS or any other service (this part depends on your backend)
            const fileUri = 'ipfs://your-file-uri'; // Replace with the actual file URI after uploading

            const nftHash = await mintNFT(
                account,
                'YourCollectionName', // Replace with your collection name
                title,
                description,
                price,
                fileUri
            );

            toast.success(`NFT minted successfully! Transaction Hash: ${nftHash}`);

            // Reset the form fields after submission
            setTitle('');
            setDescription('');
            setPrice('');
            setFile(null);
            setPreview('');

        } catch (error) {
            console.error('Minting NFT failed:', error);
            toast.error('Failed to mint NFT');
        }
    };

    const mintNFT = async (
        account: any,
        collectionName: string,
        title: string,
        description: string,
        price: string,
        fileUri: string
    ) => {
        if (!account) {
            throw new Error('Please connect your wallet first.');
        }

        // Convert strings to hex before sending to the smart contract
        const hexCollectionName = stringToHex(collectionName);
        const hexTitle = stringToHex(title);
        const hexDescription = stringToHex(description);
        const hexUri = stringToHex(fileUri);

        const response = await signAndSubmitTransaction({
            sender: account,
            data: {
                function: `${MODULE_ADDRESS}::createNFT::mint_token`,
                typeArguments: [],
                functionArguments: [hexCollectionName, hexDescription, hexTitle, price, hexUri],
            }
        });

        const result = await client.waitForTransaction({ transactionHash: response.hash });
        return result.hash;
    };

    return (
        <div className="create-nft">
            <h2>Create a New NFT</h2>
            <form onSubmit={handleSubmit} className="create-nft__form">
                <div className="create-nft__form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="create-nft__form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="create-nft__form-group">
                    <label htmlFor="price">Price (APT)</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

                <div className="create-nft__form-group">
                    <label htmlFor="file">Upload Image</label>
                    <input
                        type="file"
                        id="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    />
                    {preview && (
                        <div className="create-nft__preview">
                            <img src={preview} alt="NFT Preview" />
                        </div>
                    )}
                </div>

                <button type="submit" className="create-nft__submit-button">Mint NFT</button>
            </form>
        </div>
    );
};

export default CreateNFT;
