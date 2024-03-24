function calculateDemeritPoints(speed) {
    const speedLimit = 70;
    const kmPerDemeritPoint = 5;
    const initialPoints = 0;

    if(speed <= speedLimit) {
        console.log("Ok")
    } else {
        const demeritPoint= Math.floor((speed - speedLimit)/ kmPerDemeritPoint)
    console.log("Points: "+ initialPoints + demeritPoint)
    }
}
//Testing the function with different speeds
calculateDemeritPoints(50);
calculateDemeritPoints(80);
calculateDemeritPoints(90);