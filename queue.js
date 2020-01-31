let q=[];
let isRunning = false;

function addToQueue(runTask) {
  q.push(runTask);
  let id = setInterval( 
    () => {
      if(!isRunning && q.length>0){
        isRunning = true;
        let task = q.shift();
        task( () => {
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
  let foundit = q.indexOf(run);
  if( foundit != -1){
    q.splice(foundit,1);
  }
};
