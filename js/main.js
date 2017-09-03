/**
 * Created by Peter Ryszkiewicz on 8/10/2017.
 * https://github.com/pRizz/iota-seed-encryptor-decryptor
 */

var $dataToEncrypt
var $dataToEncryptPassword

var fileToEncrypt
var $fileToEncryptForm
var $fileToEncryptPassword
var generatedEncryptedFile

var fileToDecrypt
var $fileToDecryptForm
var $fileToDecryptPassword
var generatedDecryptedFile

function encryptData() {
    if (!$dataToEncrypt[0].value) {
        $dataToEncrypt.parent().addClass("has-error")
        return
    }
    $dataToEncrypt.parent().removeClass('has-error')

    if ($dataToEncryptPassword[0].value == "") {
        $dataToEncryptPassword.parent().addClass('has-error')
        return
    }
    $dataToEncryptPassword.parent().removeClass('has-error')

    var encryptionOptions = {
        data: $dataToEncrypt[0].value,
        passwords: [$dataToEncryptPassword[0].value],
        armor: false
    };

    openpgp.encrypt(encryptionOptions).then(function(ciphertext) {
        const encrypted = ciphertext.message.packets.write(); // get raw encrypted packets as Uint8Array
        const encryptedData = new Blob([encrypted], {type: "application/pgp-encrypted"})
        generatedEncryptedFile = window.URL.createObjectURL(encryptedData)
        const currentDateString = new Date().toISOString()
        const downloadLink = $('<a></a>', {
            href: generatedEncryptedFile,
            download: `iotaSeeds-${currentDateString}.pgp`
        }).appendTo('body')
        downloadLink[0].click()
        downloadLink.remove()
    });
}

function encryptFileData() {
    if (!fileToEncrypt) {
        $fileToEncryptForm.addClass("is-error")
        setTimeout(() => $fileToEncryptForm.removeClass("is-error"), 250)
        return
    }

    if ($fileToEncryptPassword[0].value == "") {
        $fileToEncryptPassword.parent().addClass('has-error')
        return
    }

    $fileToEncryptPassword.parent().removeClass('has-error')

    const fileReader = new FileReader()
    fileReader.onload = function(e) {
        const fileString = e.target.result

        var encryptionOptions = {
            data: fileString,       // input as Uint8Array (or String)
            passwords: [$fileToEncryptPassword[0].value],              // multiple passwords possible
            armor: false                              // don't ASCII armor (for Uint8Array output)
        };

        openpgp.encrypt(encryptionOptions).then(function(ciphertext) {
            const encrypted = ciphertext.message.packets.write(); // get raw encrypted packets as Uint8Array
            const encryptedData = new Blob([encrypted], {type: "application/pgp-encrypted"})
            generatedEncryptedFile = window.URL.createObjectURL(encryptedData)
            const currentDateString = new Date().toISOString()
            const downloadLink = $('<a></a>', {
                href: generatedEncryptedFile,
                download: `iotaSeeds-${currentDateString}.pgp`
            }).appendTo('body')
            downloadLink[0].click()
            downloadLink.remove()
        });
    };

    fileReader.readAsText(fileToEncrypt)
}

function decryptFileData(action) {
    if (!fileToDecrypt) {
        $fileToDecryptForm.addClass("is-error")
        setTimeout(() => $fileToDecryptForm.removeClass("is-error"), 250)
        return
    }

    if ($fileToDecryptPassword[0].value == "") {
        $fileToDecryptPassword.parent().addClass('has-error')
        return
    }

    $fileToDecryptPassword.parent().removeClass('has-error')

    const fileReader = new FileReader()
    fileReader.onload = function(e) {
        const encryptedUInt8Array = new Uint8Array(e.target.result)

        var decryptionOptions = {
            message: openpgp.message.read(encryptedUInt8Array),
            password: $fileToDecryptPassword[0].value,
            format: 'binary'
        };

        openpgp.decrypt(decryptionOptions).then(function(plaintext) {
            if(action == 'download') {
                const decryptedData = new Blob([plaintext.data], {type: "text/plain"})
                generatedDecryptedFile = window.URL.createObjectURL(decryptedData)
                const currentDateString = new Date().toISOString()
                const downloadLink = $('<a></a>', {
                    href: generatedDecryptedFile,
                    download: `iotaSeeds-${currentDateString}.txt`
                }).appendTo('body')
                downloadLink[0].click()
                downloadLink.remove()
            } else if (action == 'view') {
                $('#decryptedTextModalBody')[0].innerText = new TextDecoder('utf-8').decode(plaintext.data)
                $('#decryptedTextModal').modal('show')
            }
        }).catch(function(error) {
            alert(`Incorrect password or bad pgp file.\nError message: ${error}`)
        })
    };

    fileReader.readAsArrayBuffer(fileToDecrypt)
}

$(function(){
    $dataToEncrypt = $('#dataToEncrypt')
    $dataToEncryptPassword = $('#dataToEncryptPassword')

    $fileToEncryptForm = $("#fileToEncryptForm")
    $fileToEncryptPassword = $("#fileToEncryptPassword")

    $fileToEncryptForm.on('drop', function(e) {
        const droppedFiles = e.originalEvent.dataTransfer.files
        fileToEncrypt = droppedFiles[0]
    })

    $fileToDecryptForm = $("#fileToDecryptForm")
    $fileToDecryptPassword = $("#fileToDecryptPassword")

    $fileToDecryptForm.on('drop', function(e) {
        const droppedFiles = e.originalEvent.dataTransfer.files
        fileToDecrypt = droppedFiles[0]
    })
})