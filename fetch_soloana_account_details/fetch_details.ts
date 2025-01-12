import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import 'dotenv/config';

const connection = new Connection(clusterApiUrl('devnet'));

const publicKey = new PublicKey(process.env.PUBLIC_KEY as string);

const accountInfo = await connection.getAccountInfo(publicKey);

const accountBalance = await connection.getBalance(publicKey);  

const balanceInSol = accountBalance / LAMPORTS_PER_SOL;

console.log('accountInfo', accountInfo);
console.log('accountBalance', accountBalance);
console.log('balanceInSol', balanceInSol);