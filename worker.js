onmessage = function (msg) {
    console.log('Worker: Message received from main thread', msg);
    if (isNaN(msg.data) || msg.data < 0) {
        postMessage('Please input a valid positive number');
    } else {
        let result = 0;
        for (let index = 1; index < msg.data; index++) {
            result += index;
        }
        let workerResult = 'Via Web Worker: Sum upto '+ msg.data +' is ' + result;
        console.log('Worker: Posting message back to main thread', workerResult);
        postMessage(workerResult);
    }
}