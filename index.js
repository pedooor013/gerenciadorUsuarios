// ==============================
// Library Import
// ==============================
const readline = require('readline');

// ==============================
// Readline
// ==============================
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ==============================
// Variables (Arrays)
// ==============================

let users = [];

// ==============================
// Main Function
// ==============================

// Function form read user infos

const question = (query) => new Promise(resolve => rl.question(query, resolve));


// Function form add users

async function addUsers(){
    const registerUser = await question("\nDigite o nome do usuário que irá ser adicionado: ");
    if(registerUser === ''){
        console.log('Digite um valor valido...');
        addUsers();
        return;
    }
    users.push({description: registerUser});
    console.log(`O usuário ${registerUser} foi adicionado(a) com sucesso!`);
    showMenu();
}

// ==============================
// Users list
// ==============================

async function listUsers(){
    if(users.length === 0){
        console.log(`Você ainda não tem nenhum usuário cadastrado...`);
    }else if(users.length>=1){
        console.log(`Você tem ${users.length} usuário(s) cadastrado(s):`);
        users.forEach((users, index) => {
            console.log(`${index + 1}. ${users.description}`);
        });
    }
    showMenu();
}

// ==============================
// Remove Users
// ==============================

async function removeUser(){
    if(users.length === 0){
        console.log('Você não tem usuários para serem removidos...')
        showMenu();
        return;
    }
    console.log(`Você tem ${users.length} usuário(s) cadastrado(s):`);
    users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.description}`);
    });

    // Question for client which user he want remove

    const whichUser = await question(`\nDigite o número do usuário que será removido: `);
    const index = parseInt(whichUser) - 1;

    if (isNaN(index) || index < 0 || index >= users.length) {
        console.log("\nPor favor, insira um número válido de tarefa...");
        removeUser();  // Chama novamente se a entrada for inválida
    }else{
        users.splice(index, 1);
        showMenu();
    }
}

// ==============================
// Switch menu
// ==============================

async function showMenu(){
    console.log(`\nManipulação de usuários\n` +
        'Escolha o que fazer: \n' +
        '    (1) Adicionar usuário\n' +
        '    (2) Listar usuários\n' +
        '    (3) Remover usuários\n' +
        '    (4) Sair\n');

    const option = await question('Digite uma ação: ');
    switch (option){
        case '1':
            await addUsers();
            break;
        case '2':
            await listUsers();
            break;
        case '3':
            await removeUser();
            break;
        case '4':
            rl.close();
            break;
        default:
            console.log('Opção inválida...');
            await showMenu();
            break;
    }
}

// ==============================
// Start code
// ==============================

showMenu();

