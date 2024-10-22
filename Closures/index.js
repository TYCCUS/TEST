function scorePoint(playerName) {
    let score = 0
    return {
        displayScore: function () {
            console.log(`${playerName} has ${score} points`)
        },
        increaseScore: function(){
            score++
        },
        decreaseScore: function(){
            score--
        },
        
/*
Challenge:
   1. Add two more functions to this object. One to increment 
      the score and one to decrement the score. Call those functions 
      a couple of times for each player and then call displayScore 
      to check it’s working. 
*/
    }
}
//NOTE: the function is returning an object with methods. It's a factory function, there is no inheritance or the need to use `this`
const player1 = scorePoint('Vicky')
const player2 = scorePoint('Leo')
//console.log(player1)
player1.increaseScore()
player2.increaseScore()
player1.increaseScore()
player2.decreaseScore()
player1.increaseScore()
player2.increaseScore()
player1.increaseScore()
player2.decreaseScore()
player2.increaseScore()

player1.displayScore()
player2.displayScore()


/* 
Challenge: 
    1. Write a function that simulates a simple bank account. 
       The function should store the balance and enable users  
       to deposit money, withdraw money, and check the balance.

Requirements:

- The account balance should start at zero.

- The function should return an object containing 
  3 functions. One for depositing money, one for 
  withdrawing money, and a getBalance function which 
  logs the balance and the account holder's name.

- Deposits should add to the balance, and withdrawals should subtract 
  from it. 
*/

function bankAccount() {
    // Write logic here    
    balance = 0;
    return {
        add: (amount) => balance += amount,
        withdraw: (amount) => balance -= amount,
        getBalance: () => console.log(balance)
    }
    
    }
    
    const daveAccount = bankAccount()
    const wendyAccount = bankAccount()
    
    daveAccount.add(10)
    daveAccount.withdraw(2)
    daveAccount.getBalance()
    wendyAccount.add(100)
    wendyAccount.withdraw(30)
    wendyAccount.getBalance()
    // Test your code by calling the functions.