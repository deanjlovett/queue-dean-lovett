
// almost there... stay on target...
let queue=[]; 
let isRunning = false;

function addToQueue(runTask) {
  // addToQueue runs when the task is added to the queue.

  queue.push(runTask);
  if(isRunning) 
    return;
  isRunning = true;
  runTask(doneWithTask);
}

function doneWithTask(){
  queue.shift();
  if(  queue.length === 0 ) 
    isRunning = false;
  else 
    queue[0]( doneWithTask );
}

function abortFromQueue(run){
  let idx = queue.indexOf(run)
  if( idx !== -1) 
    queue.splice(idx,1);
};

