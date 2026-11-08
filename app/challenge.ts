/** A per-structure budget based on the number of answer-letter slots. */
export function secondsForStructure(letterCount:number):20|30|45{
 return letterCount<=8?20:letterCount<=16?30:45;
}
export function remainingSeconds(deadline:number,now:number){
 return Math.max(0,Math.ceil((deadline-now)/1000));
}
export function answerTiming(limit:number,deadline:number,now:number){
 return {timedOut:now>=deadline,secondsUsed:Math.round(Math.min(limit,Math.max(0,limit-(deadline-now)/1000))*10)/10};
}
export function clockLabel(seconds:number){
 return `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;
}
