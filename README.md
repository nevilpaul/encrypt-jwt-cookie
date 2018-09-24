# encrypt-jwt-cookie

## install
<p>The source is available for download from GitHub. Alternatively, you can install using npm (Node Package Manager):</p>
```
npm install encrypt-jwt-cookie
```
### Or

```
npm i encrypt-jwt-cookie
```

<p>This is a testing encryption code that encrypts and decrypt id that you store as cookie does not display user id and its not an md5 value but encrypts ID</p>

>Note this is under development but encryption and decryption are now working correctly as expected only numbers can be encrypted encrypt any user id or number you want.
## Usage

### Encrypt your user id and store as a varchar in your cookie
```
var ejc = require("encrypt-jwt-cookie")
ejc.encrypt(2000)
```
### Decrypt to get your user id
```
var ejc = require("encrypt-jwt-cookie")
 
ejc.decrypt('r7Mu5HmeozE0P9G165_hXf6z46000==');
```
<br><hr>
>just updated the encryption code and the decryption get random key for any of your user_id or any number.
