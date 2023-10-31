exports.encrypt_to_Caesar = async (req, res) => {
  try {
    const { text, shift } = req.body
    const encryptedText = caesarCipher(text, parseInt(shift))
    res.status(500).json({
      success: true,
      message: 'encryption completed successfully',
      data: encryptedText,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'failed to encrypt the plain text',
      err,
    })
    console.log(err)
  }
}

function caesarCipher(str, shift) {
  if (shift < 0) {
    return caesarCipher(str, shift + 26)
  }

  let output = ''

  for (let i = 0; i < str.length; i++) {
    let char = str[i]

    if (char.match(/[a-z]/i)) {
      let code = str.charCodeAt(i)

      if (code >= 65 && code <= 90) {
        char = String.fromCharCode(((code - 65 + shift) % 26) + 65)
      } else if (code >= 97 && code <= 122) {
        char = String.fromCharCode(((code - 97 + shift) % 26) + 97)
      }
    }

    output += char
  }

  return output
}
