const net = require ('net')

const client = new net.Socket();

client.connect(21, '34.244.195.252', (connect) => {
    if (connect)
        console.log('Success')
    client.write('Test')
})

console.log(client)