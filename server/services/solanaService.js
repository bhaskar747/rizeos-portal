// server/services/solanaService.js
const { Connection, clusterApiUrl } = require('@solana/web3.js');

exports.confirmTransaction = async (signature) => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const result = await connection.getSignatureStatus(signature, {
            searchTransactionHistory: true,
        });
        
        // A successful transaction has `err: null` in its status value.
        return result && result.value && result.value.err === null;
    } catch (error) {
        console.error('Error confirming Solana transaction:', error.message);
        return false;
    }
};
