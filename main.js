"useStricts";

import { peoples } from "./peoples";

// Zombie-A
function infectionRecursive_A(group, spread = false) {
    group.forEach(people => {
        if (spread) {
            people.infected = true;
        }
        people.infected && group.forEach(person => person.infected = true);

        people.group.length > 0 && infectionRecursive_A(people.group, people.infected);
    });
}

// Zombie-B
function infectionRecursive_B(group, path = []) {
    group.forEach((people, index) => {
        if (people.group.length > 0) {
            infectionRecursive_B(people.group, [...path, { group, index }]);
        }

        if (people.infected) {
            path.slice().reverse().forEach(({ group, index }) => {
                group[index].infected = true;
            });
        }
    });
}

// Zombie-32
function infectionRecursive_32(group, path = []) {
    group.forEach((people, index) => {
        if (people.group.length > 0) {
            infectionRecursive_32(people.group, [...path, { group, index }]);
        }

        if (people.age >= 32) {
            // Propager l'infection aux personnes dans les groupes enfants
            people.group.forEach(child => {
                if (child.age >= 32) {
                    child.infected = true;
                }
            });
            // Propager l'infection aux parents
            path.slice().reverse().forEach(({ group, index }) => {
                if (group[index].age >= 32) {
                    group[index].infected = true;
                }
            });
        }
    });
}

// Zombie-C
function infectionRecursive_C(group) {
    const uninfectedPeople = group.filter(people => !people.infected);
    uninfectedPeople.forEach((people, index) => {
        if (index % 2 === 0) {
            people.infected = group.some(p => p.infected);
        }
    });

    group.forEach((people) => {
        if (people.group.length > 0) {
            infectionRecursive_C(people.group);
        }
    });
}

// Zombie-Ultime
function infectionRecursive_Ultime(group, root = null) {
    group.forEach(person => {
        if (person.group.length > 0) {
            infectionRecursive_Ultime(person.group, root || person);
        }

        if (person.infected && root) {
            root.infected = true;
        }
    });
}

// Vaccin-A
function currationRecursive_A(group) {
    group.forEach(person => {
        if (person.infected && person.age < 30) {
            person.infected = false; 
        }

        if (person.group.length > 0) {
            currationRecursive(person.group);
        }
    });
}

// Vaccin-B




// ! Test Zombies : A, B, 32, C, Ultime
infectionRecursive_A(peoples);
infectionRecursive_B(peoples);
infectionRecursive_32(peoples);
infectionRecursive_C(peoples);
infectionRecursive_Ultime(peoples);

// ? Test Vaccin : A, B, Ultime
currationRecursive_A(peoples);
currationRecursive_B(peoples);
currationRecursive_Ultime(peoples);



console.log(peoples);