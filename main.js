"useStricts";

import { peoples } from "./peoples";

const VARIANT = {
    A: "A",
    B: "B",
    V32: "32",
    C: "C",
    ULTIME: "Ultime"
};

const VACCINE = {
    A: "A",
    B: "B",
    ULTIME: "Ultime"
};

// Zombie-A
function infectionRecursive_A(group, spread = false) {
    group.forEach(people => {
        if (spread && !people.infection.infected) {
            people.infection.infected = true;
            people.infection.variant = VARIANT.A;
        }
        people.infection.infected && group.forEach(person => { person.infection.infected = true; people.infection.variant = "A"; });

        people.group.length > 0 && infectionRecursive_A(people.group, person.infection.infected);
    });
}

// Zombie-B
function infectionRecursive_B(group, path = []) {
    group.forEach((people, index) => {
        if (people.group.length > 0) {
            infectionRecursive_B(people.group, [...path, { group, index }]);
        }

        if (people.infection.infected) {
            path.slice().reverse().forEach(({ group, index }) => {
                group[index].infection.infected = true;
                group[index].infection.variant = VARIANT.B;
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
                    child.infection.infected = true;
                    child.infection.variant = VARIANT.V32;
                }
            });
            // Propager l'infection aux parents
            path.slice().reverse().forEach(({ group, index }) => {
                if (group[index].age >= 32) {
                    group[index].infection.infected = true;
                    group[index].infection.variant = VARIANT.V32;
                }
            });
        }
    });
}

// Zombie-C
function infectionRecursive_C(group) {
    const uninfectedPeople = group.filter(people => !people.infection.infected);
    uninfectedPeople.forEach((people, index) => {
        if (index % 2 === 0) {
            people.infection.infected = group.some(p => { p.infection.infected; p.infection.variant = VARIANT.C; });
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
            root.infection.infected = true;
            root.infection.variant = VARIANT.ULTIME;
        }
    });
}

// Vaccin-A
function curationRecursive_A(group) {
    group.forEach((person) => {
        if (person.group.length > 0) {
            curationRecursive_A(person.group);
        }

        if (person.infection.infected && person.age <= 30) {
            if (person.infection.variant === VARIANT.A || person.infection.variant === VARIANT.V32) {
                person.infection.variant = null;
                person.infection.infected = false;
                person.infection.vaccine = VACCINE.A;
                person.infection.immune = true;
            }
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
curationRecursive_A(peoples);
curationRecursive_B(peoples);
curationRecursive_Ultime(peoples);



console.log(peoples);