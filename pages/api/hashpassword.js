const handler = async function (req, res) {
  console.log("ss");
  const strString2Encrypt = req.query.password;
  const arrayEncryptionTable = [
    ["z", "U", "m", "V", "1", "o", "&", "A"],
    ["P", "y", "l", "b", "3", "Y", "p", "B"],
    ["Z", "x", "q", "k", "Q", "c", "R", "C"],
    ["6", ",", "d", "=", "j", "r", "S", "D"],
    ["i", "T", "w", "e", "s", "h", "7", "E"],
    ["t", "f", "9", "v", "u", "O", "8", "F"],
    ["g", "2", "4", "n", "W", "5", "a", "G"],
    ["H", "I", "J", "K", "L", "M", "N", "X"],
  ];

  let strCrypted = "";
  for (let intESRunI = 0; intESRunI < strString2Encrypt.length; intESRunI++) {
    let blnESContinue = true;
    let intESRunJ = 0;
    let strESOneCharacter = strString2Encrypt.charAt(intESRunI);
    while (blnESContinue && intESRunJ < 8) {
      let intESRunK = 0;
      while (blnESContinue && intESRunK < 8) {
        blnESContinue =
          arrayEncryptionTable[intESRunJ][intESRunK] !== strESOneCharacter;
        intESRunK++;
      }
      intESRunJ++;
    }
    if (blnESContinue) {
      // No match found!
    } else {
      strESOneCharacter = arrayEncryptionTable[intESRunJ - 1][intESRunK - 1];
    }
    strCrypted += strESOneCharacter;
  }

  return strCrypted;
};
export default handler;
