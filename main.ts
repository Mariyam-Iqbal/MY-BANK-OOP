import cfonts from 'cfonts';
import inquirer from "inquirer";
import chalk from "chalk";

// Display welcome message using cfonts
cfonts.say('Welcome to My Bank!', {
    font: 'block',
    align: 'center',
    colors: ['cyan'],
    background: 'black',
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: '0',
});

// Account class
class Account {
    private balance: number;

    constructor(public accountNumber: number, public accountHolder: string, initialBalance: number) {
        this.balance = initialBalance;
    }

    deposit(amount: number): void {
        this.balance += amount;
    }

    withdraw(amount: number): void {
        if (amount > this.balance) {
            console.log(chalk.red("Insufficient funds"));
        } else {
            this.balance -= amount;
        }
    }

    getBalance(): number {
        return this.balance;
    }
}

// Bank class
class Bank {
    private accounts: Account[] = [];

    createAccount(accountNumber: number, accountHolder: string, initialBalance: number): void {
        const account = new Account(accountNumber, accountHolder, initialBalance);
        this.accounts.push(account);
    }

    getAccount(accountNumber: number): Account | undefined {
        return this.accounts.find(acc => acc.accountNumber === accountNumber);
    }
}

// Create a bank and some accounts
const bank = new Bank();
bank.createAccount(1, 'Mariyam Iqbal', 1000);
bank.createAccount(2, 'Mariyam Iqbal', 2000);

// User interaction with inquirer
async function main() {
    const accountChoices = bank.getAccount(1) ? 'Account 1' : undefined;
    const { selectedAccount } = await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedAccount',
            message: 'Select an account:',
            choices: [
                { name: 'Mariyam Iqbal - Account 1', value: 1 },
                { name: 'Mariyam Iqbal - Account 2', value: 2 }
            ],
        },
    ]);

    const account = bank.getAccount(selectedAccount);
    if (account) {
        const { action, amount } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['Deposit', 'Withdraw'],
            },
            {
                type: 'number',
                name: 'amount',
                message: 'Enter the amount:',
            },
        ]);

        if (action === 'Deposit') {
            account.deposit(amount);
            console.log(chalk.green(`Deposit successful! New balance for ${account.accountHolder}: ${account.getBalance()}`));
        } else {
            account.withdraw(amount);
            console.log(chalk.yellow(`Withdrawal successful! New balance for ${account.accountHolder}: ${account.getBalance()}`));
        }
    }
}

main();
