const net = require('net')

let ret = false
const client = net.createConnection(21, '34.244.195.252', () => {
})

client.on('ready', () => {
     ret = client.write('USER goot\n', () => {
        ret = client.write('PASS B7Kzs0Rfa1P7\n', () => {
            ret = client.write('PASV\n', () => {
            })
        })
    })
})

client.on('drain', () => {
    console.log('buffer is free to use')
})

client.on('data', data => {
    let logStr = ''
    if ((logStr = data.toString('utf-8'))) {
        const servCode = logStr.split('\n').map(str => str.slice(0, 3))
        if (servCode.includes('227')) {
            let dataSocketIp = ''
            let dataSocketPort
            logStr.slice(logStr.indexOf('(') + 1, logStr.indexOf(')'))
                .split(',')
                .forEach((str, index) => {
                    if (index <= 3) {
                        dataSocketIp += str
                        dataSocketIp += index < 3 ? '.' : ''
                    }
                    else if (index === 4) {
                        dataSocketPort = parseInt(str, 10) * 256
                    }
                    else if (index === 5) {
                        dataSocketPort += parseInt(str, 10)
                    }
                })
                console.log('socket', dataSocketIp)
                console.log('port', dataSocketPort)
                const socketData = net.createConnection(dataSocketPort, dataSocketIp, () => {
                    console.log('Connected again !')
                })

                socketData.on('ready', () => {
                    console.log("dataSocket ready !")
                })
            console.log(logStr)
        }
    }
    if (parseInt(logStr, 10) === 227) {
        console.log("yolo")
        ret = client.write('LIST\n', () => {
        })
    }
})