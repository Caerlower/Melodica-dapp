const { AptosAccount } = require('aptos');
const jwt = require('jsonwebtoken'); // For generating JWT tokens (if you use them)
const {recover} = require("@noble/secp256k1");
const sha3 = require('js-sha3');
const {hexlify} = require("@ethersproject/bytes");

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Replace with a strong secret

// Function to verify an Aptos signature
async function verifyAptosSignature(address, signature, originalMessage) {
    const hashMessage = sha3.keccak_256(originalMessage);
    
    const bytesMessage = new Uint8Array(Buffer.from(hashMessage, 'hex'));

    try {
        const publicKey = recover(
            Uint8Array.from(Buffer.from(signature, "hex")),
            bytesMessage
        );

        const recoveredAddress = hexlify(publicKey);
        if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
            return;
        } else {
            throw new Error('Invalid Aptos signature');
        }
    } catch (error) {
        throw new Error('Invalid Aptos signature');
    }
}

// Sign up function
exports.signup = async (address, signature) => {
    const messageToSign = "Signup to SocialFi Music Dapp";

    try {
        await verifyAptosSignature(address, signature, messageToSign);

        // Optional: Store the user in your database (if you're using one)
        // const user = await User.create({ address });

        // Generate JWT token (optional)
        const token = jwt.sign({ address }, JWT_SECRET, { expiresIn: '1d' });

        return token;
    } catch (error) {
        console.error('Error during signup:', error);
        throw new Error('Signup failed: Invalid signature or internal error'); 
    }
};

// Login function
exports.login = async (address, signature) => {
    const messageToSign = "Login to SocialFi Music Dapp";

    try {
        await verifyAptosSignature(address, signature, messageToSign);

        // Optional: Check if the user exists in your database and is active

        // Generate JWT token (optional)
        const token = jwt.sign({ address }, JWT_SECRET, { expiresIn: '1d' });

        return token;
    } catch (error) {
        console.error('Error during login:', error);
        throw new Error('Login failed: Invalid signature or internal error'); 
    }
};
