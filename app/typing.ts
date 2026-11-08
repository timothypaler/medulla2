/** Dashes count letters only; spaces, hyphens and case never consume a slot. */
export const answerLetters=(value:string)=>value.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z]/gi,'').toLowerCase();
export const answerCapacity=(name:string)=>answerLetters(name).length;
export const limitAnswer=(value:string,name:string)=>answerLetters(value).slice(0,answerCapacity(name));
export function answerState(name:string,aliases:string[],value:string):'typing'|'correct'|'incorrect'{
 const letters=limitAnswer(value,name);
 // Numeric aliases cannot silently lose their number (e.g. "metacarpal 4").
 if(letters&&[name,...aliases.filter(n=>!/[0-9]/.test(n))].some(n=>answerLetters(n)===letters))return 'correct';
 return letters.length===answerCapacity(name)?'incorrect':'typing';
}
