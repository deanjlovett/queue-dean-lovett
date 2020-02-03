// almost there... stay on target...

let qBacklog=[];  //  pre queue 
let rOnDeck=[];   // main queue 
let isRunning = false;
let tc = 0;
let evilCount=0;

function addToQueue(runTask) {
  ++tc;
  // lets just dangerously force a few attribute/properties onto that runTask function
  runTask['cancel']=false;
  runTask['moniker']=''+tc;
  qBacklog.push(runTask);
  if(isRunning) {
  //if(rOnDeck.length !== 0) { // probably can just use this, but will still use isRunning flag instead
      return;
  }
  isRunning = true;
  doEvilThings();
}

function doEvilThings(){
  console.log('start doing EvilThings: recursion count:',++evilCount);
  rOnDeck=qBacklog;
  qBacklog=[];
  if( rOnDeck.length === 0){
    console.log('     OnDeck queue is empty, just return.');
    console.log(' stop doing EvilThings: recursion count:',evilCount--);
    isRunning = false;
    return;
  } 

  let requests = rOnDeck.reduce((promiseChain, task) => {
    return promiseChain.then(() => new Promise((resolve,reject) => {
      if( ! task.cancel ){
        task(resolve);
      } else {
        //reject( new Error('Whoops! That was canceled: '+task.moniker));
        resolve();
      }
    })
    .catch(alert));
    }, Promise.resolve()
  );
  requests.then(doEvilThings);
  console.log(' stop doing EvilThings: recursion count:',evilCount--);
}

function abortFromQueue(run){
  run.cancel = true;
  let idx = qBacklog.indexOf(run);
  let where='unknown';
  if( idx !== -1) {
    where ='qBacklog'
    qBacklog.splice(idx,1);
  }
  // probably not a good idea to interupt 
  // the reduce() that is working on that array
  //
  // else {
  //   idx = rOnDeck.indexOf(run);
  //   if( idx !== -1) {
  //     where ='rOnDeck'
  //     rOnDeck.splice(idx,1);
  //   }
  // }
};
