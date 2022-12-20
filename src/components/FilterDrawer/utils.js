const days_passed = (dt) => {
    var current = new Date(dt.getTime());
    var previous = new Date(dt.getFullYear(), 0, 1);
  
    return Math.ceil((current - previous + 1) / 86400000);
  }

  export const periods = () => { 

    let periodObj = {}
    const dt = new Date();
    const num = days_passed(dt);

    if (num <= 7) { 
      periodObj['7D'] = '7 Days'
    } 
    else if (num <= 30) { 
      periodObj[7] = '7 Days'
      periodObj[30] = '30 Days'

    }
    else if (num <= 90) {
      periodObj[7] = '7 Days'
      periodObj[30] = '30 Days'
      periodObj[90] = '90 Days'

    }
    else if (num > 90) { 
      periodObj[7] = '7 Days'
      periodObj[30] = '30 Days'
      periodObj[90] = '90 Days'
      periodObj[num] =`All of ${dt.getFullYear()}`
    }

     return periodObj;
  }
