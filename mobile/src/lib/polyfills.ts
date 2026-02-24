import crypto from 'react-native-nitro-crypto';

if (typeof global.crypto === 'undefined') {
  global.crypto = {} as Crypto;
}

if (typeof global.crypto.randomUUID !== 'function') {
  global.crypto.randomUUID =
    function randomUUID(): `${string}-${string}-${string}-${string}-${string}` {
      const uuid = crypto.randomUUID();

      return uuid as `${string}-${string}-${string}-${string}-${string}`;
    };
}
