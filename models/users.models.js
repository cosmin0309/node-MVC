class UserModel {
    constructor(name, surname, salary){
        this.username = name;
        this.surname = surname;
        this.salary = salary;
    }

    doubleSalary(){
        this.salary *= 2;
    }
}

module.exports = UserModel;