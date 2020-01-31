let q=[];
let isrunning = false;

function addToQueue(runTask) {
  // addToQueue runs when the task is added to the queue.

  // q.push()  add to top
  // q.shift() remove from bottom
  // ...
  q.push(runTask);
  //console.log('addToQueue');
  let id = setInterval(function(){
      if(!isrunning){
        isrunning = true;
        let task = q.shift();
        task(function(){
          isrunning = false;
          clearInterval(id);
        })
      }
    }
    ,
    100
  );
  // // Call runTask when the task is ready to start.
  // if(q.length >0){
  //   let mt;
  //   if( typeof t === 'undefined') {
  //     console.log('hey t is undefined')
  //     t = q.shift();
  //   }else{
  //     runTask(function() {
  //       // The function passed to runTask will run when the task is done.
  //       console.log('inside runTask');
  //       // ...
  //       t = undefined;
  //     });
  //   }  
  // }
}
