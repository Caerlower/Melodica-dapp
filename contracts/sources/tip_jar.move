module socialfi_music_dapp::tip_jar {
    use std::signer;
    use aptos_framework::coin::{Coin};
    use aptos_std::table::{Table};
    use aptos_framework::account::{withdraw, deposit};

    struct TipJar has key {
        tips: Table<address, Coin<CoinType>>, // Artist address to tip amount
    }

    struct CoinType { 
        // Place holder for your coin type
    }

    // Tip an artist
    public entry fun tip_artist(
        account: &signer,
        artist: address,
        amount: u64,
    ) acquires TipJar {
        let tip_jar = borrow_global_mut<TipJar>(@socialfi_music_dapp);
        if (!tip_jar.tips.contains(&artist)) {
            tip_jar.tips.add(artist, Coin::new(0));
        };
        let artist_tips = tip_jar.tips.borrow_mut(&artist);

        let coins = withdraw<CoinType>(account, amount);
        deposit<CoinType>(artist, coins);
        artist_tips.value = artist_tips.value + amount;
    }

    // Get the total amount of tips an artist has received
    public fun get_artist_tips(artist: address): u64 acquires TipJar {
        let tip_jar = borrow_global<TipJar>(@socialfi_music_dapp);
        if (tip_jar.tips.contains(&artist)) {
            tip_jar.tips.borrow(&artist).value
        } else {
            0
        }
    }

    public entry fun initialize_tip_jar(account: &signer) {
        move_to(account, TipJar { tips: table::new() });
    }
}
