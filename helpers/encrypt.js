const crypto = require('crypto');
const iterations = 16384;
const key_length = 128;
const digest = 'sha512';

var Encrypt = {
	encrypt_password : function(unencrypted_password, salt, callback) {
		if(salt == null)
		{
			salt = crypto.randomBytes(key_length).toString("hex");
		}
		crypto.pbkdf2(unencrypted_password, salt, iterations, 
						key_length, digest, function(err, key) {
							if(err) callback(err, null);
							else callback(null, { "key": key.toString("hex"), "salt" : salt });
						});
	},

	compare_passwords : function(unencrypted_password, encrypted_password, salt, callback) {
		Encrypt.encrypt_password(unencrypted_password, salt, function(err, data) {
								if(err) callback(err, null);
								else {
										callback(null, { equal : (data.key == encrypted_password) });
									}
							});
	}
}

module.exports = Encrypt;