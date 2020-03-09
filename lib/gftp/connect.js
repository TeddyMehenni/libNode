const net = require('net')

let ret = false
let dataSocketConnection = false
const client = net.createConnection(21, '34.244.195.252', () => {
})

client.on('ready', () => {
     ret = client.write('USER goot\n', () => {
        ret = client.write('PASS B7Kzs0Rfa1P7\n', () => {
            ret = client.write('PASV\n', () => {
                client.write('NLST /home/goot/\n', () => {
                    console.log('List')
                })
            })
        })
    })
})

client.on('drain', () => {
    console.log('buffer is free to use')
})


const getDataSocketAddr = (logStr) => {
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
    return { addr: dataSocketIp, port: dataSocketPort }
}

const connectDataSocket = (logStr) => {
    const dataSocket = getDataSocketAddr(logStr)
    return net.createConnection(dataSocket.port, dataSocket.addr, () => {
        console.log('Connected to the dataSocket !')
    })
}

client.on('data', data => {
    let logStr = data.toString('utf-8')
    let servCode = logStr.split('\n').map(str => str.slice(0, 3))
    console.log(logStr)

    /* Connection to the dataSocket */
    if (servCode.includes('227')) {
        const dataSocket = connectDataSocket(logStr)
        dataSocket.on('ready', () => {
            dataSocketConnection = true
        })

        dataSocket.on('data', data => {
            let dataSocketLog = data.toString('utf-8')
            console.log(dataSocketLog)
        })
    } 
})