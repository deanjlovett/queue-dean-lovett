// almost there... stay on target...

let qBacklog=[];  //  pre queue 
let rOnDeck=[];   // main queue 
let isRunning = false;
let tc = 0;
let lastTask;
let evilCount=0;

function addToQueue(runTask) {
  console.log('addToQueue. isRunning', isRunning);
  ++tc;
  // lets just force a few attribute/properties onto that runTask
  runTask['cancel']=false;
  runTask['moniker']=''+tc;
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
  rOnDeck=qBacklog;
  qBacklog=[];
  if( rOnDeck.length === 0){
    console.log('     OnDeck queue is empty');
    console.log('   no evil left to be done');
    console.log(' stop doing EvilThings',evilCount--);
    isRunning = false;
    return;
  } 
          console.log('     No rest for the wicked');
          if(rOnDeck.length>1)
            console.log('   there are', rOnDeck.length,'evil things left to be done!');
          else
            console.log('   there is still ONE evil thing left to be done!');
          if(qBacklog.length>1)
            console.log('      Oh, NO!  There is even a backlog of', rOnDeck.length,'evil things left to be done after that!');
          else
            console.log('      Oh, NO!  There is even a backlog of ONE evil thing left to be done after that!');

  let requests = rOnDeck.reduce((promiseChain, task) => {
    return promiseChain.then(() => new Promise((resolve,reject) => {
      console.log('let\'s run a task.  task count:',tc,'rs:',rOnDeck.length,'q:',qBacklog.length);
      if( ! task.cancel ){
        console.log('running:',task && task.moniker);
        task(resolve);
      } else {
        console.log('Whoops! That was canceled:',task.moniker);
        //reject( new Error('Whoops! That was canceled: '+task.moniker));
        resolve();
      }
    })
    .catch(alert));
    }, Promise.resolve()
  );
  if( qBacklog.length > 0){
    console.log('        Huh... this console.log is never hit.  Oh google! ... tell me more about promises...');
    console.log('      evil still to be done. Backlog of:', qBacklog.length);
  }
  console.log('  about to run into requests.then(doEvilThings)...');
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
  else {
    idx = rOnDeck.indexOf(run);
    if( idx !== -1) {
      where ='rOnDeck'
      rOnDeck.splice(idx,1);
    }
  }
  console.log('let\'s cancel task:',run.moniker,'from queue:',where,'tc:',tc,'rs:',rOnDeck.length,'q:',qBacklog.length);
};
