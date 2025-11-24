import React, { Component } from 'react';
import CryptoJS from 'crypto-js';
import { JSEncrypt } from './jsencrypt';
import { Base64 } from 'js-base64';
import appConstant from '../../constant/appConstant';


export function generateRandomString() {
    var d = new Date().getTime();
    if (Date.now) {
        d = Date.now(); //high-precision timer
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

export function aesEncryption(data, randomString) {
    var key = CryptoJS.enc.Utf8.parse(randomString);
    var new_pass = randomString.substring(0, 16);
    var iv = CryptoJS.enc.Utf8.parse(new_pass);

    var encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    var transitmessage = encrypted.toString();
    return transitmessage;
}

export function aesDecryption(transitmessage, pass) {
    var key = CryptoJS.enc.Utf8.parse(pass);
    var new_pass = pass.substring(0, 16);
    var iv = CryptoJS.enc.Utf8.parse(new_pass);

    var decrypted = CryptoJS.AES.decrypt(transitmessage, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    })
    return decrypted;
}

export function rsaEncryption(password, zumlo_pvtKey) {
    let options = {
        default_key_size: '1024',
        default_public_exponent: '010001',
        log: true
    };
    var encrypt_method = new JSEncrypt(options);
    encrypt_method.setPublicKey(zumlo_pvtKey);
    var rsaEncrypted = encrypt_method.encrypt(password);
    return rsaEncrypted;
}


export function rsaDecryption(rsaEncrypted, private_key) {
    // Decrypt with the private key...
    let options = {
        default_key_size: '1024',
        default_public_exponent: '010001',
        log: true
    };
    var decrypt_method = new JSEncrypt(options);
    decrypt_method.setPrivateKey(private_key);

    var rsaDecrypted = decrypt_method.decrypt(rsaEncrypted);

    return rsaDecrypted;
}

export function sha256Encryption(AESEncryptedString, private_key) {
    // Sign with the private key...
    let options = {
        default_key_size: '1024',
        default_public_exponent: '010001',
        log: false
    };
    var sign1 = new JSEncrypt();
    sign1.setPrivateKey(private_key);
    var signature = sign1.sign(AESEncryptedString, CryptoJS.SHA256, "sha256");
    return signature;
}


export function sha256Decryption(AESEncryptedString, signature, zumlo_pvtKey) {
    // Verify with the public key...
    // let options = {
    //   default_key_size: '1024',
    //   default_public_exponent: '010001',
    //   log: false
    // };
    var verify = new JSEncrypt();
    verify.setPublicKey(zumlo_pvtKey);
    var verified = verify.verify(AESEncryptedString, signature, CryptoJS.SHA256);
    return verified;
}



export function rsaEncryptionData(requestData) {
    try {

        var randomString = generateRandomString();
        randomString = randomString.substring(0, 32);

        // encryption process
        // AES Encryption
        var AESEncryptedString = aesEncryption(JSON.stringify(requestData), randomString);

        // RSA Encryption
        var RSAEncryptedString = rsaEncryption(randomString, appConstant.zumlo_pvtKey);

        // SHA256 Encryption
        var signatureString = sha256Encryption(AESEncryptedString, appConstant.private_key);
        var reqID = generateRandomString();
        console.log('reqIDEnc', reqID)
        var data = {
            "RequestId": reqID,
            "SessionId": RSAEncryptedString,
            "Data": AESEncryptedString,
            "Sign": signatureString
        }
        var encodeString = Base64.encode(JSON.stringify(data));
        // var encodeString=btoa(JSON.stringify(data));
        var reqModel = {
            Request: encodeString,
        }
        return { reqModel, data };
    } catch (ex) {
        return null;
    }
}


export function rsaEncryptionDataNew(requestData) {
    try {
        var randomString = generateRandomString();
        randomString = randomString.substring(0, 32);

        // AES Encryption
        var AESEncryptedString = aesEncryption(JSON.stringify(requestData), randomString);

        // RSA Encryption
        var RSAEncryptedString = rsaEncryption(randomString, appConstant.zumlo_pvtKey);

        var result = {
            data: {
                "RequestId": generateRandomString(),
                "SessionId": RSAEncryptedString,
                "Data": AESEncryptedString,
                "Sign": ""
            },
            RandomString: randomString
        }

        return result;
    } catch (ex) {
        return null;
    }
}


export function rsaDecryptionData(responseString, reqData) {
    ////debugger;
    var responceObject = JSON.parse(responseString);
    var responseData = JSON.parse(Base64.decode(responseString));
    console.log('responseDataEncrypt', responseData, reqData)
    try {

        var decresponseData = "";
        var verifiedSign = sha256Decryption(responseData.Data, responseData.Sign, appConstant.zumlo_pvtKey);
        if (verifiedSign) {
            var RSADecryptedString = rsaDecryption(responseData.SessionId, appConstant.private_key);

            var AESDecryptedString = aesDecryption(responseData.Data, RSADecryptedString);
            var AESRequestString = aesDecryption(responseData.RequestId, RSADecryptedString);
            console.log('responseDataEncrypt', AESDecryptedString, AESRequestString)
            decresponseData = AESDecryptedString.toString(CryptoJS.enc.Utf8);
            decrequestData = AESRequestString.toString(CryptoJS.enc.Utf8);
            console.log('responseDataEncrypt', decrequestData)

        }
        if (reqData != undefined && decrequestData == reqData.RequestId) {
            return JSON.parse(decresponseData);
        }
        else if (reqData == undefined) {
            return JSON.parse(decresponseData);
        }
        else {
            return {
                returnCode: 'PA011'
            }
        }
        // return JSON.parse(decresponseData);

    } catch (ex) {
        return null;
    }
}

export function rsaDecryptDataWithSessionId(responseData, sessionId) {
    try {
        var decresponseData = "";

        var verifiedSign = sha256Decryption(responseData.Data, responseData.Sign, appConstant.zumlo_pvtKey);

        if (verifiedSign) {
            var AESDecryptedString = aesDecryption(responseData.Data, sessionId);
            decresponseData = AESDecryptedString.toString(CryptoJS.enc.Utf8);
        }

        return JSON.parse(decresponseData);
    } catch (ex) {
        return null;
    }
}