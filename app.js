;(function() {
     const mainBtns = document.querySelectorAll(`.main-button`)
     const secondaryBtns = document.querySelectorAll(`.sec-btn`)
     let workDisplay = document.querySelector(`.set-work-time-display`)
     let breakDisplay = document.querySelector(`.set-break-time-display`)
     let display  = document.querySelector(`.display`)
     let workTime = 1500
     let breakTime = 300
     let min
     let tillBreak = 25
     let tillWork = 5
     let breakTimeout
     let workTimeout
     let countdown

     ;(function() {
          mainBtns.forEach(button => {
               button.addEventListener(`click`, () => {
                    if (button.classList.contains(`start`)) {
                         workD()
                    } else {
                         stop() 
                         display.innerHTML = `00 : 00`
                    }
               })
          })
     })();

     function breakD() {
          timer(breakTime)
          workTimeout = setInterval(() => {
               if (tillWork > 0) {
               tillWork--
                    if (tillWork === 0) {
                         workD()
                         tillWork = 5
                         clearInterval(workTimeout)
                    }
               }
          }, 60000);
     }
     function workD() {
          timer(workTime)
          breakTimeout = setInterval(() => {
               if (tillBreak > 0) {
                    tillBreak--
                         if (tillBreak === 0) {
                              breakD() 
                              tillBreak = 25
                              clearInterval(breakTimeout)
                         }
                    }
          }, 60000);
     }

     function stop() {
          clearInterval(countdown)
          clearInterval(breakTimeout)
          clearInterval(workTimeout)
          display.innerHTML = `00 : 00`
     }


     ;(function() {
          secondaryBtns.forEach(button =>{
               button.addEventListener(`click`, () => {
                    if (button.classList.contains(`work`)) {
                         if (button.classList.contains(`up`)) {
                              if (workTime < 3600) {
                                   controller(`work`, `+`)
                              }
                         } else {
                              if (workTime > 1500) {
                                   controller(`work`, `-`)
                              }
                         }
                    } 
                    if (button.classList.contains(`break`)) {
                         if (button.classList.contains(`up`)) {
                              if (breakTime < 1500) {
                              controller(`break`, `+`)                          
                              }
                         } else {
                              if (breakTime > 300) {
                              controller(`break`, `-`)
                              }
                         }
                    }
               })
          })
     })();

     function timer(seconds) {
          const now = Date.now()
          const then = now + seconds * 1000
          displayTimeLeft(seconds)
          countdown = setInterval(() => {
          const secondsLeft = Math.round((then - Date.now()) / 1000)
          if (secondsLeft <= 0) {
          clearInterval(countdown)
          return
          }
          displayTimeLeft(secondsLeft)
          }, 1000)
     }
     
     function displayTimeLeft(seconds) {
          let minutes = Math.floor(seconds / 60);
          const remainderSeconds = seconds % 60;
          setDisplay(minutes, remainderSeconds)
     }
     
     function setDisplay(minutes, remainderSeconds) {
          display.innerHTML = `${minutes} :${remainderSeconds < 10 ? ' 0' : ' ' }${remainderSeconds}`;
     }


     function increaseWork() {
          workTime += 300
          min = Math.floor(workTime / 60);
          sec = workTime % 60;
          workDisplay.innerHTML = `${min} : 00`
          tillBreak = min
          tBdef = min
     }

     function decreaseWork() {
          workTime -= 300
          min = Math.floor(workTime / 60);
          sec = workTime % 60;
          workDisplay.innerHTML = `${min} : 00`
          tillBreak = min 
          tBdef = min
     }

     function increaseBreak() {
          breakTime += 300
          min = Math.floor(breakTime / 60);
          sec = breakTime % 60;
          breakDisplay.innerHTML = `${min} : 00`    
          tillWork = min 
          tWdef = min
     }

     function decreaseBreak() {
          breakTime -= 300
          min = Math.floor(breakTime / 60);
          sec = breakTime % 60;
          breakDisplay.innerHTML = `${min} : 00`      
          tillWork = min 
          tWdef = min
     }

     function controller(switcher, controller) {
          if (switcher === `work`) {
               if (controller === `+`) {
                    increaseWork()
               } else if (controller === `-`) {
                    decreaseWork()
               }
          } else if (switcher === `break`) {
               if (controller === `+`) {
                    increaseBreak()
               } else if (controller === `-`) {
                    decreaseBreak()
               }
          }
     }

})();
