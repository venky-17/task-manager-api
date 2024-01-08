const celsiusToFarh =(temp)=>{
      return (temp*1.8) +32
}

const farhtoCelsius=(temp)=>{
    return (temp-32) / 1.8
}


module.exports ={celsiusToFarh, farhtoCelsius}