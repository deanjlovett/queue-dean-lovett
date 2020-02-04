let q=[];
let isRunning = false;

let tc=0;

function addToQueue(runTask) {
  // addToQueue runs when the task is added to the queue.

  runTask['moniker']=''+ (++tc);
  console.log('adding task:',runTask.moniker);
  q.push(runTask);
  let id = setInterval(()=>{
      if(!isRunning && q.length>0){
        isRunning = true;
        let task = q.shift();
        console.log('  ...running task:',task.moniker);
        task(()=>{
          console.log('    finished task:',task.moniker);
          isRunning = false;
          clearInterval(id);
        })
      }
    }
    ,
    100
  );
}

function abortFromQueue(run){ 
  let idx = q.indexOf(run);
  if( idx !== -1) {
    q.splice(idx,1);
  }
};
