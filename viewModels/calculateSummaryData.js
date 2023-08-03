export {calculateSummaryData}

function calculateSummaryData(
  sessionLength,
  isRunning = true, //we consider it to be 'running' if the session has already ran and completed, basically as long as it already started at some point
  {
    dangerousData,
    nonDangerousData,
    interactiveBehaviorData,
    engagementData,
    calmnessData,
    reinforcementData,
  }
) {
  if (sessionLength == 0) {
    //before the session has been started, the data to be returned is different
    const eoPresses = reinforcementData.length == 2 ? 0 : 1;
    return {
      ria: "-",
      rpi: "-",
      eoTime: "-",
      srTime: "-",
      time: "-",
      eoPb: "-",
      eoSr: "-",
      lowestPbRate: null,
      lowestSrRate: null,
      eoPresses,
    };
  } else { //session has been started (and possibly is finished, doesn't matter)
    const eoIsFirst = reinforcementData.length < 2 || reinforcementData[1] != 0; //session started w/ eo
    const eoPresses = (() => { //immediately invoked function
      if (eoIsFirst) {
        return Math.floor((reinforcementData.length - 1) / 2) + 1;
      }
      return Math.floor((reinforcementData.length - 1) / 2); //this case is where the session started with sr
    })();
    let [ria, rpi] = countPbsInRanges(dangerousData, reinforcementData, eoIsFirst);
    // let [tempRia, tempRpi] = countPbsInRanges(nonDangerousData, reinforcementData, eoIsFirst);
    // ria += tempRia;
    // rpi += tempRpi;
    const [eoTime, srTime] = countEoSrTime(reinforcementData, eoIsFirst, sessionLength);
    return {
        ria,
        rpi,
        eoTime,
        srTime,
        time: sessionLength,
        eoPb: null,
        eoSr: null,
        lowestPbRate: null,
        lowestSrRate: null,
        eoPresses,
      };
  }
}

function countPbsInRanges(pbArray, reinforcementArray, eoIsFirst){
    let ria = 0;
    let rpi = 0;
    let reinforcementDataUpperBound = (eoIsFirst) ? 1 : 2; //if sr is first we start w/ 2nd index since the beginning of the data is [0, 0]
    let isRiaInterval = eoIsFirst;
    let pbIndex = 0;
    while(reinforcementDataUpperBound < reinforcementArray.length){
        while(pbIndex < pbArray.length && pbArray[pbIndex][0] < reinforcementArray[reinforcementDataUpperBound]){
            if(isRiaInterval){
                ria ++;
            }
            else{
                rpi ++;
            }
            pbIndex ++;
        }
        isRiaInterval = !isRiaInterval;
        reinforcementDataUpperBound ++;
    }
    while(pbIndex < pbArray.length){
        if(isRiaInterval){
            ria ++;
        }
        else{
            rpi ++;
        }
        pbIndex ++;
    }
    return [ria, rpi];
}

function countEoSrTime(reinforcementArray, eoIsFirst, sessionLength){
    let eoTime = 0;
    let srTime = 0;
    let tempReinforcementArray = reinforcementArray.slice();
    let isCountingEoTime = eoIsFirst;
    let intervalIndex = (eoIsFirst) ? 0 : 1;
    tempReinforcementArray.push(sessionLength)
    while(intervalIndex < tempReinforcementArray.length - 1){
        let topBound = tempReinforcementArray[intervalIndex + 1];
        let bottomBound = tempReinforcementArray[intervalIndex]
        if(isCountingEoTime){
            eoTime += ((topBound - bottomBound) / 1000); //converting from ms to s
        }
        else{
            srTime += ((topBound - bottomBound) / 1000);
        }
        intervalIndex ++;
        isCountingEoTime = !isCountingEoTime;
    }
    return [eoTime, srTime];
}
