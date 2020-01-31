let q=[];
let isRunning = false;
//let intervalCount = 0;

function addToQueue(runTask) {
  q.push(runTask);
  let id = setInterval( 
    () => {
      if(!isRunning && q.length>0){
        //++intervalCount;
        //console.log('ic:',intervalCount,'id:',id);
        isRunning = true;
        let task = q.shift();
        task( () => {
          isRunning = false;
          //--intervalCount;
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
