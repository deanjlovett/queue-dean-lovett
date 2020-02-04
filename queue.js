// almost there... stay on target...

let q=[]; 
let isRunning = false;

function addToQueue(runTask) {
  // addToQueue runs when the task is added to the queue.

  q.push(runTask);
  if(isRunning) {
      return;
  }
  isRunning = true;
  chequeQueue();
}

function chequeQueue(){
  if( q.length === 0){
    isRunning = false;
    return;
  }
  let promise = new Promise((done)=> q.shift()(done) );
  promise
    .then( chequeQueue )
    .catch(error=>{isRunning = false;console.log(error)});
}

function abortFromQueue(run){ 
  let idx = q.indexOf(run);
  if( idx !== -1) {
    q.splice(idx,1);
  }
};
