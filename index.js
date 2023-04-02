// Your code here
function createEmployeeRecord(array) {
    const record = {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  
    return record;
  }
  
  function createEmployeeRecords(arrays) {
    const records = arrays.map(createEmployeeRecord);
    return records;
  }
  
  function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
  
    employeeRecord.timeInEvents.push({
      type: 'TimeIn',
      hour: parseInt(hour, 10),
      date: date
    });
  
    return employeeRecord;
  }
  
  function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
  
    employeeRecord.timeOutEvents.push({
      type: 'TimeOut',
      date: date,
      hour: parseInt(hour, 10)
    });
  
    return employeeRecord;
  }
  
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  
    return hoursWorked;
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payRate = employeeRecord.payPerHour;
  
    const wagesEarned = hoursWorked * payRate;
  
    return wagesEarned;
  }
  
  function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
  
    const wages = datesWorked.reduce((totalWages, date) => {
      const wagesEarned = wagesEarnedOnDate(employeeRecord, date);
      return totalWages + wagesEarned;
    }, 0);
  
    return wages;
  }
  
  function calculatePayroll(employees) {
    let totalPay = 0;
    employees.forEach(employee => {
      totalPay += allWagesFor(employee);
    });
    return totalPay;
  }
  