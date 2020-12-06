import CryptoJS from 'crypto-js'
class Crypto {
	private croptoKey = 'zouweipeng'
	encryptoAES(word: string) {
		return CryptoJS.AES.encrypt(word, this.croptoKey).toString()
	}
	decryptoAES(word: string) {
		return CryptoJS.AES.decrypt(word, this.croptoKey).toString(
			CryptoJS.enc.Utf8
		)
	}
	encryptoSHA256(word: any) {
		return CryptoJS.SHA256(word).toString()
	}
}
let crypto = new Crypto()
export { crypto }
