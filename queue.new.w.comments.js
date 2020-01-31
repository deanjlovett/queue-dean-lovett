let q=[];
let isRunning = false;

function addToQueue(runTask) {
  q.push(runTask);
  if(isRunning) {
    return;
  }
  isRunning = true;
  doneWithTask(); // call doneWithTask(), rather than repeat code that shifted function off of queue and ran it
}

function doneWithTask(){
  if( q.length === 0){
    isRunning = false;
    return;
  }
  let nextRunTask =  q.shift();
  // if( typeof nextRunTask !== 'function'){
  //   console.log('error: expected object typeof \'function\'. Object is type:',typeof nextRunTask );
  //   return;
  // }
  nextRunTask( doneWithTask ); 
}

function abortFromQueue(run){
  let foundit = q.indexOf(run);
  if( foundit != -1){
    q.splice(foundit,1);
  }
};