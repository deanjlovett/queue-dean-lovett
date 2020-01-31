let q=[];
let isRunning = false;

function addToQueue(runTask) {
  q.push(runTask);
  if(isRunning) return;
  isRunning = true;
  doneWithTask(); 
}

function doneWithTask(){
  if( q.length === 0){ isRunning = false; return;}
  q.shift()( doneWithTask ); 
}

function abortFromQueue(run){
  if( q.indexOf(run) != -1){
    q.splice(q.indexOf(run),1);
  }
};