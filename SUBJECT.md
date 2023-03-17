# Exercice :

    Vous devez donc reproduire une fonction capable d’infecter un arbre de données contenant des personnes. Bien entendu votre ZOMBIE-19 devra faire la différence entre les personnes seules et groupées pour mieux déployer le virus !

    Chaque personne aura un nom et un âge et un statut d’infection vous devrez faire en sorte de répandre le virus à l’ensemble des personnes d’un groupe qui contient une personne infectée.

    Bien entendu dans chaque groupe une personne infectée pourra avoir côtoyer d’autres personnes qui font elle-même partie d’un groupe.

    Vous devrez donc faire en sorte que le ZOMBIE-19 infecte et se répande
    sur toutes les personnes qui sont entrées en contact.




1. **Vous devrez créer des variants :**
- Zombie-A : Qui infecte du haut vers le bas. (les personnes de touts les groupes sociaux Descendant)
- Zombie-B : Qui infecte du bas vers le haut. (les personnes de touts les groupes sociaux Ascendant)
- Zombie-32 : Qui infecte du bas vers le haut et du haut vers le bas toutes personnes qui à 32 ans et plus. (de tout les groupes social Ascendant et Descendant)
- Zombie-C : Qui infecte une personne sur 2 dans un groupe social (mais pas les groupes social en contact Ascendant ou Descendant)
- Zombie-Ultime : Qui infecte seulement la personne racine la plus Ascendante (La personne la plus haute de tous les cercles social)


2. **En fonction des variants qui ont propagé l’infection une première fois vous allez devoir déployer les vaccins suivants :**

- Vaccin-A.1 contre Zombie-A et Zombie-32 : N’est pas encore très efficace il permet de soigner toutes les personnes d’un âge compris entre 0 ans et 30 ans et de les immuniser contre tous les variants (Ascendant et Descendant)
- Vaccin-B.1 contre Zombie-B et Zombie-C : Il tue une personne sur 2 et soigne les autres mais ne leur donne pas l’immunité. (Ascendant et Descendant)
- Vaccin-Ultime contre Zombie-Ultime : Son porteur ne pourra plus jamais être infecté et infecter les autres.