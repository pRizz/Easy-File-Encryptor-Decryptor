# Easy File Encryptor/Decryptor
Encrypts and decrypts your files and text.

[View the page hosted on GitHub Pages here.](https://prizz.github.io/Easy-File-Encryptor-Decryptor/)

# Secure Usage of this Webapp
This webapp does not store or transmit your data. But to be safe, in case of malware, or rogue browser extensions, follow these steps:
* [Download this webapp](https://github.com/pRizz/Easy-File-Encryptor-Decryptor/archive/master.zip) for offline use
* Disconnect from the internet
* Open this webapp (the index.html file) in incognito, or private browsing mode, with no extensions, or all extensions disabled
* Encrypt and Decrypt
* Quit your browser

# Benefits of Using this Webapp
## Simple
### No knowledge of encrypting, decrypting, or the terminal is needed
## Easy to Use
### No need to download external clients or interact with package managers
## Platform Independent
### Works anywhere in any web browser
## Offline Usage
### This webapp does not need internet to work
## Secure
### Uses the PGP standard which has gone through decades of improvements and testing

# How does this work?
Easy File Encryptor/Decryptor utilizes symmetric encryption from the [PGP protocol](https://en.wikipedia.org/wiki/Pretty_Good_Privacy). Your password acts as the symmetric key during the encryption and decryption process.

The PGP implementation used in this project comes from the open source project [OpenPGP.js](https://github.com/openpgpjs/openpgpjs)

# Encrypting and Decrypting on the Terminal
First, you must install a PGP client on your computer. GNU's implementation, [GPG](https://gnupg.org/download/index.html), is quite popular and available on most common platforms.

Here is how to encrypt files on the terminal
```
gpg --symmetric file.txt
```
You are then asked to enter the encryption passphrase.

Decrypting is similar; just pass the encrypted file to gpg
```
gpg file.txt.pgp
```
And enter in the passphrase

# Disclaimer
You use this software at your own risk. I, Peter Ryszkiewicz, am not responsible for any misuse or abuse of this software. See the MIT License below for more details.

# About the Author
This project was originally created by Peter Ryszkiewicz [pRizz@Github](https://github.com/pRizz), software engineer in Chicago, IL. Beware of copycats.

# About the Project
This project is hosted on GitHub at [https://github.com/pRizz/Easy-File-Encryptor-Decryptor](https://github.com/pRizz/Easy-File-Encryptor-Decryptor) under the MIT license.

# License
```
MIT License

Copyright (c) 2017 Peter Ryszkiewicz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

# Donate
To support this project, you can donate IOTA to this address
`ARDPDHLZPQZRDBPKTZBIK9OFKCJMGCHFQJTQEXL9KRIVSHNRGHJCEOCMRFXGJMQXDVGNFTTS9GUIOJXXW9RONFYJKW`
