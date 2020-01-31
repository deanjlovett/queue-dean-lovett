// code golf version 2
let q=[]; 
let isRunning = false;

function addToQueue(runTask) {
  if( q.length === 0)
    q.push(dummyTask);
  q.push(runTask);
  if(isRunning) 
    return;
  isRunning = true;
  doneWithTask();
}

function dummyTask(){}

// doneWithTask has no variables declare on its stack
function doneWithTask(){
  q.shift();
  if(  q.length === 0 ) 
    isRunning = false;
  else 
    q[0]( doneWithTask );
}

function abortFromQueue(run){
  let idx = q.indexOf(run)
  if( idx !== -1) 
    q.splice(idx,1);
};