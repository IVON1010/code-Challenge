const score= 20;
//assume score to be 20

if(score >= 79) {
    grade= "A"
} else if (score>= 60 && score<= 79) {
    grade= "B"
} else if(score>= 49 && score<= 59) {
    grade= "C"
} else if(score>= 40 && score<= 49) {
    grade= "D"
} else {
    grade= "E"
}
console.log("for score: "+ score + "" + "for grade: "+ grade)

