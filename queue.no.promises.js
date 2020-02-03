
// almost there... stay on target...
let q=[]; 
let isRunning = false;

function addToQueue(runTask) {
  q.push(runTask);
  if(isRunning) 
    return;
  isRunning = true;
  runTask(doneWithTask);
}

// doneWithTask has no variables declare on its stack
// still need to check for stack growth in node.js
//
function doneWithTask(){
  q.shift();
  if(  q.length === 0 ) 
    isRunning = false;
  else 
    q[0]( doneWithTask );
}

function cancelFromQueue(run){
  let idx = q.indexOf(run)
  if( idx !== -1) 
    q.splice(idx,1);
};

