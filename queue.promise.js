// almost there... stay on target...

let qBacklog=[];  //  pre queue 
let rOnDeck=[];   // main queue 
let iOnDeck=-1;
let isRunning = false;
let tc = 0;
let task;
let evilCount=0;

function addToQueue(runTask) {
  console.log('addToQueue. isRunning', isRunning);
  ++tc;
  // lets just force a few attribute/properties onto that runTask
  runTask['cancel']=false;
  runTask['moniker']=''+tc;
  runTask['complete']=false;
  qBacklog.push(runTask);
  if(isRunning) {
    console.log('Whoo there partner!  Put that task in the backlog queue.  Move along... move along');
    return;
  }
  isRunning = true;
  doEvilThings();
}

function doEvilThings(){
  console.log('start doing EvilThings: recursion count:',++evilCount);
  if( qBacklog.length === 0){
    console.log('     OnDeck queue is empty');
    console.log('   no evil left to be done');
    console.log(' stop doing EvilThings',evilCount--);
    isRunning = false;
    return;
  } 
  task=qBacklog.shift();
  let promise = new Promise((resolve, reject)=>{
    if( ! task.cancel ){
        console.log('running:',task.moniker);
        task(resolve);
      } else {
        console.log('Whoops! That task was canceled:',task.moniker);
        //reject( new Error('Whoops! That was canceled: '+task.moniker));
        resolve();
      }
    });
    promise.then( doEvilThings );  
}

function cancelFromQueue(run){
  run.cancel = true;
  let idx = qBacklog.indexOf(run);
  let where='unknown';
  if( idx !== -1) {
    where ='qBacklog'
    qBacklog.splice(idx,1);
  }
};
