const first = document.querySelector('#number1');
const buttonWithoutWebWorker = document.querySelector('#runOnMainThread');
const buttonWithWebWorker = document.querySelector('#runOnWorker');
const result = document.querySelector('.result');



if (window.Worker) {
	const myWorker = new Worker("worker.js");

    buttonWithoutWebWorker.onclick = function () {
        result.textContent = someHeavyOperation(first.value);
    }

    buttonWithWebWorker.onclick = function () {
        myWorker.postMessage(first.value);
	    console.log('Message posted to worker');
    }

	// first.onchange = function() {
	//   myWorker.postMessage(first.value);
	//   console.log('Message posted to worker');
    // }
    
	myWorker.onmessage = function(msg) {
		result.textContent = msg.data;
		console.log('Message received from worker');
	}
} else {
	console.log('Your browser doesn\'t support web workers.')
}


function someHeavyOperation(data) {
    let result = 0;
    for (let index = 1; index < data; index++) {
        result += index;
    }
    let workerResult = 'Via Main Thread : Sum upto '+ data +' is ' + result;
    return workerResult;
}