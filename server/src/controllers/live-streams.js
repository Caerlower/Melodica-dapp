// Controller for live streams
exports.isArtistLive = async (client, artistAddress) => {
    try {
        const resources = await client.getAccountResources(artistAddress);
        const liveStreamResource = resources.find(
            (r) => r.type === `${artistAddress}::live_stream::LiveStream`
        );

        if (!liveStreamResource) {
            return false; // No live stream resource found, so artist is not live
        }

        // Check if `is_live` field exists and is a boolean
        const isLive = liveStreamResource.data.is_live;
        if (typeof isLive !== 'boolean') {
            throw new Error("Invalid is_live field in LiveStream resource");
        }
        return isLive;
    } catch (error) {
        console.error('Error checking live status:', error);
        throw new Error('Could not retrieve live stream status.'); // Re-throw a generic error for higher level handling
    }
};

exports.getStreamUrl = async (client, artistAddress) => {
    try {
        if (await this.isArtistLive(client, artistAddress)) {
            // Fetch the actual stream URL from your streaming service provider (e.g., Livepeer, Muvi)
            // or from your custom streaming server
            // You'll need to replace this with your actual implementation
            const response = await fetch(`YOUR_STREAMING_API_ENDPOINT/${artistAddress}`);
            const data = await response.json();
            
            // Error handling for fetching stream URL
            if (!response.ok) {
                throw new Error(`Error fetching stream URL from API: ${response.statusText}`);
            }

            return data.streamUrl; // Or the appropriate field from your API response
        } else {
            return null; // Artist is not live
        }
    } catch (error) {
        console.error('Error fetching stream URL:', error);
        throw new Error('Could not retrieve stream URL.'); // Re-throw a generic error for higher level handling
    }
};

exports.getFeaturedLiveStream = async (client) => {
    try {
        // Implement your logic to get the featured live stream.
        // You can check the blockchain for recent live stream events 
        // or use a database/external service to store this information.
        const featuredArtistAddress = '0x...'; // Replace with actual featured artist address
        const streamUrl = await this.getStreamUrl(client, featuredArtistAddress);

        if (streamUrl) {
            const resources = await client.getAccountResources(featuredArtistAddress);
            const profileResource = resources.find(
                (r) => r.type === `${artistAddress}::artist_profile::ArtistProfile`
            );

            if(profileResource) {
                const artistProfileData = profileResource.data;
                return {
                    artistAddress: featuredArtistAddress,
                    artistName: artistProfileData.name, // Fetch from artist's profile
                    streamUrl,
                };
            }
        }
        return null; 
    } catch (error) {
        console.error('Error fetching featured live stream:', error);
        throw new Error('Could not retrieve featured live stream.');
    }
};
