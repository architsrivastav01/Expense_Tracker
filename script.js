//1
const balance = document.getElementById(
    "balance"
  );
  const money_plus = document.getElementById(
    "money-plus"
  );
  const money_minus = document.getElementById(
    "money-minus"
  );
  const list = document.getElementById("list");
  const form = document.getElementById("form");
  const text = document.getElementById("text");
  const amount = document.getElementById("amount");
  
  //last 
  const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
  
  let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];
  
  //5
  //Add Transaction
  function addTransaction(e){
    e.preventDefault();
    if(text.value.trim() === '' || amount.value.trim() === ''){
      alert('Please add TEXT and AMOUNT to proceed')
    }else{
      const transaction = {
        id:generateID(),
        text:text.value,
        amount:+amount.value
      }
  
      transactions.push(transaction);
  
      addTransactionDOM(transaction);
      updateValues();
      updateLocalStorage();
      text.value='';   //  input fields ko clear karta hai, taki nayi transaction ke liye fields khali ho jaayein.
      amount.value='';
    }
  }
  
  
  //5.5
  //Generate Random ID
  function generateID(){
    return Math.floor(Math.random()*1000000000);
  }
  
  //2
  
  // transaction ko DOM list mein add karna
  function addTransactionDOM(transaction) {
    //GET sign
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");  // new list is created and is stored in item variable in DOM 
  
    //Add Class Based on Value
    item.classList.add(
      transaction.amount < 0 ? "minus" : "plus"
    );
  
    item.innerHTML = `
      ${transaction.text} <span>${sign}${Math.abs(
      transaction.amount  //<span> element banata hai jisme transaction amount aur sign ko display karta hai.
    )}</span>
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
      `;
    list.appendChild(item);
  }
  
  //4
  
  //Update the balance income and expence
  function updateValues() {
    const amounts = transactions.map(  // hr transaction se amount ko nikal k unki ek array bana rha hai
      (transaction) => transaction.amount  //transactions array se transaction amounts ko extract karke store karta hai.
    );
    const total = amounts  // balance amount
      .reduce((acc, item) => (acc += item), 0)  //method array ke sabhi elements ko combine karke ek single value (total) banata hai.
      .toFixed(2);  //total amount ko 2 decimal places tak format karna
    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);
    const expense =
      (amounts
        .filter((item) => item < 0)
        .reduce((acc, item) => (acc += item), 0) *
      -1).toFixed(2);
  
      balance.innerText=`$${total}`;
      money_plus.innerText = `$${income}`;
      money_minus.innerText = `$${expense}`;
  }
  
  
  //6 
  
  //Remove Transaction by ID
  function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    Init();
  }
  //last
  //update Local Storage Transaction
  function updateLocalStorage(){
    localStorage.setItem('transactions',JSON.stringify(transactions));//ransactions array ko JSON string mein convert karta hai jisse woh local storage mein save ho sake.
  }
  
  //3
  
  //Init App
  function Init() {  // initialize the application
    list.innerHTML = "";  // list element html content clear
    transactions.forEach(addTransactionDOM);
    updateValues();
  }
  
  Init();
  
  form.addEventListener('submit',addTransaction);