const nestedArray = [1, 2, [3, 4, [5, 6, [7, 8]]]];

const flatten=nestedArray.flat(Infinity);
console.log(flatten);

// reduce method
const flat=nestedArray.reduce((acc,val)=>acc.concat(Array.isArray(val) ? flat(val):val),[]);
console.log(flat);

//json.stringify

const flat2=JSON.parse("[",JSON.stringify(nestedArray).replace(/\[|\]/g,"")+"]");
console.log(flat2);

//without inbuilt methods

function flat3(arr,res=[]){
    for(let i=0;i<arr.length;i++){
        if(Array.isArray(arr[i])){
            flat3(arr[i],res);
        }else{
            res.push(arr[i]);
        }
        
    }
    return res;
}
console.log(flat3(nestedArray));

//=======================================================
function flat4(arr,res=[]){

    for(let i=0;i<arr.length;i++){
        if(Array.isArray(arr[i])){
            flat4(arr[i],res);

        }else{
            res.push(arr[i]);
        }
}
return res;
}
console.log(flat4(nestedArray));