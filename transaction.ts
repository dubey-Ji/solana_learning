import { Connection, clusterApiUrl, Transaction, SystemProgram, PublicKey, sendAndConfirmTransaction, LAMPORTS_PER_SOL } from "@solana/web3.js";
import 'dotenv/config';
import {airdropIfRequired, getKeypairFromEnvironment} from '@solana-developers/helpers';

const suppliedPublicKey = process.argv[2] || null;

if (!suppliedPublicKey) {
    // throw new Error('Provide to public key');
    console.log('Prvoide valid public key to transfer');
    process.exit(1);
}

const connection = new Connection(clusterApiUrl('devnet'));
const keyPair = getKeypairFromEnvironment('SECRET_KEY');

await airdropIfRequired(
    connection,
    keyPair.publicKey,
    1 * LAMPORTS_PER_SOL,
    0.5 * LAMPORTS_PER_SOL,
);

const LAMPORTS_TO_SEND = 5000;

const toPublicKey = new PublicKey(suppliedPublicKey);

const transaction = new Transaction();
const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: keyPair.publicKey,
    toPubkey: toPublicKey,
    lamports: LAMPORTS_TO_SEND
});

transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
    keyPair
]);
// console.log(keyPair)
console.log(`Finished sending ${LAMPORTS_TO_SEND} to ${toPublicKey}`);
console.log(`Transaction signature is: ${signature}`);

