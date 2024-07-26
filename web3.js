import Web3 from 'web3';
import { readFile } from 'fs/promises';

const baycABI = JSON.parse(await readFile(new URL('baycABI.json', 
    import.meta.url)));

const web3 = new Web3('https://eth.public-rpc.com');
const baycNFT = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';

const contract = new web3.eth.Contract(baycABI, baycNFT);

async function fetchTokenURIs(tokenIds) {
const calls = tokenIds.map(id => contract.methods.tokenURI(id).call());
return Promise.all(calls);
}

const tokenIds = [1, 2, 3, 44]; 
fetchTokenURIs(tokenIds)
.then(uris => console.log(uris))
.catch(error => console.error(error));
