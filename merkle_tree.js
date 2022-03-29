const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

let whitelistAddresses = [
	"0x5B0Ba3D96e8476E860ea51FeD70B61108F019b16",
	"0x5A3D97056B079B03316f2A45219CC634E32C27E8",
	"0xDC22dd60f8026D17D2187a9FEB219F4a6013F1Ec",
	"0x6E694d01d27347681B69df5a6edaAde65F192EB4",
	"0x09dDe3304E5de5fb93bbD259215e863F863f9217",
	"0xCC5C6038cAc6B372D7e427154C8269aE70bA9b29",
	"0x57486598757C88E1A536b16a925a167f83752544"
];

const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

const rootHash = merkleTree.getRoot();
console.log('Whitelist Merkle Tree\n', merkleTree.toString());
console.log("Root Hash: ", rootHash);

const claminingAddress1 = leafNodes[0];
const claminingAddress2 = "0x57486598757C88E1A536b16a925a167f83752544";

// getHexProof returns the neighbour leaf and all parent nodes hashes that will
// be required to derive the Merkle Trees root hash.

const hexProof1 = merkleTree.getHexProof(claminingAddress1);
console.log("hexProof1 of Node 0");
console.log(hexProof1);

const hexProof2 = merkleTree.getHexProof(claminingAddress2);
console.log("hexProof2 of modified one");
console.log(hexProof2);

// Verification

console.log(merkleTree.verify(hexProof1, claminingAddress1, rootHash)); // true
console.log(merkleTree.verify(hexProof2, claminingAddress2, rootHash)); // false
