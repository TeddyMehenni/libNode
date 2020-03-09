const net = require('net')
const fs = require('fs')

'use strict'

class Gftp {
    constructor(ipv4Addr, port) {
        this.client = net.createConnection(port, ipv4Addr, () => {
            console.log("Connection established !")
        })
        this.client.on('error', (err) => {
            console.log(new Error(err))
        })
    }

    authServe(user, pwd, callback) {
        this.client.write('USER ' + user + '\n', (err) => {
            if (err) console.log(new Error(err))
            else {
                this.client.write('PASS ' + pwd + '\n', (err) => {
                    if (err) console.log(new Error(err))
                    else {
                        console.log('Authentification sucess !')          
                    }
                })
            }
        })
    }
}

const gftp = new Gftp('34.244.195.252', 21)
gftp.authServe('goot', 'B7Kzs0Rfa1P7')