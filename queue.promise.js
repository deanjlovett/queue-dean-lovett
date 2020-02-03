// almost there... stay on target...
let q=[]; 

function addToQueue(runTask) {
  q.push(runTask);
  if(isRunning) 
    return;
  isRunning = true;

  await q.forEachSequential(
    async (task)=>{
      return new Promise(resolve =>{
        task(resolve);
      })
    }
  );
}

function cancelFromQueue(run){
  let idx = q.indexOf(run)
  if( idx !== -1) 
    q.splice(idx,1);
};