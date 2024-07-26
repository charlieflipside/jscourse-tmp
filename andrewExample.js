// example code
// run in node

let myArray = [1,2,3,1,2,4];

myArray.push(5);

// stolen from chatGPT
function calculateMedian(arr) {
    const sortedArr = arr.slice().sort((a, b) => a - b);
    const midIndex = Math.floor(sortedArr.length / 2);

if (sortedArr.length % 2 === 0) {
    return (sortedArr[midIndex - 1] + sortedArr[midIndex]) / 2;
} else {
    return sortedArr[midIndex];
}
}


// wrote myself 

function cumulativeMedian(array_){
    const cumulativeSum = array_.reduce( (total, number) => total = total+number, 0)
    const median = calculateMedian(array_); 

    return( cumulativeSum / median )
}

console.log( cumulativeMedian(myArray) );


