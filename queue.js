// code golf version
let q=[]; 
let isRunning = false;

function addToQueue(runTask) {
  q.push(runTask);
  if(isRunning) return;
  isRunning = true;
  doneWithTask(); 
}

function doneWithTask(){
  if(  q.length === 0) isRunning = false;
  else q.shift()( doneWithTask ); 
}

function abortFromQueue(run){
  let idx = q.indexOf(run)
  if( idx !== -1) q.splice(idx,1);
};