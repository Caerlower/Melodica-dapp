module socialfi_music_dapp::music_nft {
    use std::signer;
    use std::string::{String};
    use std::vector;
    use aptos_framework::token::{Token, TokenId};
    use aptos_std::table::{Table};
    use socialfi_music_dapp::royalty_distribution::{Self, Royalty};
    use socialfi_music_dapp::fractional_ownership::{Self, FractionalNFT};

    // Define the MusicNFT resource
    struct MusicNFT has key {
        token_id: TokenId,
        artist: address,
        title: String,
        metadata_uri: String,
        royalty: Royalty,
        fractional_nft_id: Option<TokenId>,
    }

    struct NFTCounter has key {
        counter: u64,
    }

    // Storing MusicNFT
    struct NFTData has key {
        nft_table: Table<TokenId, MusicNFT>,
    }

    // Table to store NFTCounter
    struct NFTCounterData has key {
        counter_table: Table<address, NFTCounter>,
    }

    fun init_module(account: &signer) {
        move_to(account, NFTData { nft_table: table::new() });
        move_to(account, NFTCounterData { counter_table: table::new() });
    }

    // Creates a new MusicNFT
    public entry fun create_nft(
        account: &signer,
        artist: address,
        title: String,
        metadata_uri: String,
        royalty_numerator: u64,
        royalty_denominator: u64
    ) acquires NFTCounterData {
        let collection_name = string::utf8(b"MusicNFT");
        let description = string::utf8(b"Music NFT collection");
        let nft_counter = get_nft_counter(artist);
        let token_id = Token::create_named_token(
            account,
            collection_name,
            title,
            description,
            nft_counter.counter,
            1,
            metadata_uri,
            artist
        );
        increment_nft_counter(artist);
        
        let nft = MusicNFT {
            token_id,
            artist,
            title,
            metadata_uri,
            royalty: Royalty { numerator: royalty_numerator, denominator: royalty_denominator },
            fractional_nft_id: Option::none(),
        };

        borrow_global_mut<NFTData>(signer::address_of(account)).nft_table.add(token_id, nft);
    }

    public entry fun set_fractional_nft_id(
        account: &signer,
        token_id: TokenId,
        fractional_nft_id: TokenId
    ) acquires NFTData {
        let nft = borrow_global_mut<NFTData>(signer::address_of(account)).nft_table.borrow_mut(&token_id);
        nft.fractional_nft_id = Option::some(fractional_nft_id);
    }

    // Helper functions to manage NFT counter 
    fun get_nft_counter(artist: address): &NFTCounter acquires NFTCounterData {
        if (!borrow_global<NFTCounterData>(@socialfi_music_dapp).counter_table.contains(&artist)) {
            table::add(&mut borrow_global_mut<NFTCounterData>(@socialfi_music_dapp).counter_table, artist, NFTCounter { counter: 0 });
        };
        borrow_global<NFTCounterData>(@socialfi_music_dapp).counter_table.borrow(&artist)
    }

    fun increment_nft_counter(artist: address) acquires NFTCounterData {
        let nft_counter = borrow_global_mut<NFTCounterData>(@socialfi_music_dapp).counter_table.borrow_mut(&artist);
        nft_counter.counter = nft_counter.counter + 1;
    }
}
