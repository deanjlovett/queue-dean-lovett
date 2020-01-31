// code golf version
let q=[]; 
let isRunning = false;

function addToQueue(runTask) {
  q.push(runTask);
  if(isRunning) 
    return;
  isRunning = true;
  return doneWithTask();
  // does calling the above function via a "return" help?
}

function doneWithTask(){
  if(  q.length === 0) 
    isRunning = false;
  else 
    return q.shift()( doneWithTask ); 
  // does calling the above function via a "return" help?
}

function abortFromQueue(run){
  let idx = q.indexOf(run)
  if( idx !== -1) 
    q.splice(idx,1);
};