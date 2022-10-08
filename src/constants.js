const CONTRACT_ADDRESS = '0x60246d8E8463ECAAf3965D48270b803825b8ac2c';
const transformCharacterData = (characterData) => {
    return {
        name: characterData.name,
        imageURI: characterData.imageURI,
        hp: characterData.hp.toNumber(),
        maxHp: characterData.maxHp.toNumber(),
        attackDamage: characterData.attackDamage.toNumber(),
    };
};

export {CONTRACT_ADDRESS, transformCharacterData};
