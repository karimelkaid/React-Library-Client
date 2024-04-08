import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ingredients = [
  { nom: "Farine", unite: "g" },
  { nom: "Sucre en poudre", unite: "g" },
  { nom: "Sucre glace", unite: "g" },
  { nom: "Sucre complet", unite: "g" },
  { nom: "Lait entier", unite: "ml" },
  { nom: "Crème fraîche", unite: "ml" },
  { nom: "Oeufs", unite: "" },
  { nom: "Blancs d'oeuf", unite: "" },
  { nom: "Jaunes d'oeuf", unite: "" },
  { nom: "Beurre", unite: "g" },
  { nom: "Levure de boulanger", unite: "g" },
  { nom: "Levure chimique", unite: "g" },
  { nom: "Chocolat", unite: "g" },
  { nom: "Vanille", unite: "" },
  { nom: "Amandes en poudre", unite: "g" },
  { nom: "Sel", unite: "g" },
  { nom: "Eau", unite: "ml" },
]

const recettes = [
  {
    titre: "Pain",
    instructions: "Mélanger la farine, la levure et le sel. Ajouter l'eau tiède et pétrir. Laisser reposer 1h. Enfourner 30 minutes à 180°C.",
    ingredients: {
      create: [
        { ingredient: { connect: { nom: "Farine" } }, quantite: 500 },
        { ingredient: { connect: { nom: "Levure de boulanger" } }, quantite: 10 },
        { ingredient: { connect: { nom: "Sel" } }, quantite: 10 },
        { ingredient: { connect: { nom: "Eau" } }, quantite: 300 },
      ]
    }
  },
  {
    titre: "Brioche",
    instructions: "Mettre la farine, le sucre et le sel et les oeufs dans le bol du robot. Ajouter la levure délayée dans le lait tiède. Pétrir. Ajouter le beurre. Pétrir 20 minutes. Laisser monter la pâte pendant 2h. Dégazer la pâte et former la brioche. Laisser monter à nouveau. Dorer au jaune d'oeuf. Enfourner 30 minutes à 180°C.",
    ingredients: {
      create: [
        { ingredient: { connect: { nom: "Farine" } }, quantite: 300 },
        { ingredient: { connect: { nom: "Sucre en poudre" } }, quantite: 60 },
        { ingredient: { connect: { nom: "Sel" } }, quantite: 5 },
        { ingredient: { connect: { nom: "Oeufs" } }, quantite: 2 },
        { ingredient: { connect: { nom: "Levure de boulanger" } }, quantite: 5 },
        { ingredient: { connect: { nom: "Lait entier" } }, quantite: 75 },
        { ingredient: { connect: { nom: "Beurre" } }, quantite: 90 },
      ]
    }
  },
  {
    titre: "Crêpes",
    instructions: "Mélanger la farine, le sucre et le sel. Ajouter les oeufs, le lait et le beurre fondu. Laisser reposer 1h. Cuire à la poêle.",
    ingredients: {
      create: [
        { ingredient: { connect: { nom: "Farine" } }, quantite: 250 },
        { ingredient: { connect: { nom: "Sucre en poudre" } }, quantite: 50 },
        { ingredient: { connect: { nom: "Sel" } }, quantite: 5 },
        { ingredient: { connect: { nom: "Oeufs" } }, quantite: 2 },
        { ingredient: { connect: { nom: "Lait entier" } }, quantite: 500 },
        { ingredient: { connect: { nom: "Beurre" } }, quantite: 50 },
      ]
    }
  },
  {
    titre: "Crème pâtissière",
    instructions: "Faire chauffer le lait avec la vanille. Mélanger les jaunes d'oeuf avec le sucre. Ajouter la farine. Verser le lait chaud et cuire 2 minutes.",
    ingredients: {
      create: [
        { ingredient: { connect: { nom: "Lait entier" } }, quantite: 500 },
        { ingredient: { connect: { nom: "Vanille" } }, quantite: 1 },
        { ingredient: { connect: { nom: "Jaunes d'oeuf" } }, quantite: 4 },
        { ingredient: { connect: { nom: "Sucre en poudre" } }, quantite: 100 },
        { ingredient: { connect: { nom: "Farine" } }, quantite: 50 },
      ]
    }
  },
  {
    titre: "Meringue",
    instructions: "Monter les blancs en neige. Ajouter le sucre. Cuire 1h à 100°C.",
    ingredients: {
      create: [
        { ingredient: { connect: { nom: "Blancs d'oeuf" } }, quantite: 4 },
        { ingredient: { connect: { nom: "Sucre en poudre" } }, quantite: 200 },
      ]
    }
  },
  {
    titre: "Crème chantilly",
    instructions: "Monter la crème en chantilly avec le sucre glace.",
    ingredients: {
      create: [
        { ingredient: { connect: { nom: "Crème fraîche" } }, quantite: 500 },
        { ingredient: { connect: { nom: "Sucre glace" } }, quantite: 50 },
      ]
    }
  },
  {
    titre: "Financiers",
    instructions: "Mélanger le sucre glace, la farine et les amandes en poudre. Ajouter les blancs d'oeuf et le beurre fondu. Cuire 15 minutes à 180°C.",
    ingredients: {
      create: [
        { ingredient: { connect: { nom: "Sucre glace" } }, quantite: 100 },
        { ingredient: { connect: { nom: "Farine" } }, quantite: 50 },
        { ingredient: { connect: { nom: "Amandes en poudre" } }, quantite: 100 },
        { ingredient: { connect: { nom: "Blancs d'oeuf" } }, quantite: 4 },
        { ingredient: { connect: { nom: "Beurre" } }, quantite: 100 },
      ]
    }
  },
  {
    titre: "Ganache au chocolat",
    instructions: "Faire chauffer la crème. Verser sur le chocolat et mélanger en 3 fois.",
    ingredients: {
      create: [
        { ingredient: { connect: { nom: "Crème fraîche" } }, quantite: 200 },
        { ingredient: { connect: { nom: "Chocolat" } }, quantite: 200 },
      ]
    }
  },
  {
    titre: "Fondant au chocolat",
    instructions: "Faire fondre le chocolat avec le beurre. Mélanger les oeufs avec le sucre. Incorporer le chocolat. Ajouter la farine. Cuire 20 minutes à 180°C.",
    ingredients: {
      create: [
        { ingredient: { connect: { nom: "Chocolat" } }, quantite: 200 },
        { ingredient: { connect: { nom: "Beurre" } }, quantite: 200 },
        { ingredient: { connect: { nom: "Oeufs" } }, quantite: 4 },
        { ingredient: { connect: { nom: "Sucre en poudre" } }, quantite: 150 },
        { ingredient: { connect: { nom: "Farine" } }, quantite: 75 },
      ]
    }
  },
  {
    titre: "Mousse au chocolat",
    instructions: "Faire fondre le chocolat. Ajouter les jaunes d'oeuf. Monter les blancs en neige. Incorporer délicatement. Réserver 4h au frais.",
    ingredients: {
      create: [
        { ingredient: { connect: { nom: "Chocolat" } }, quantite: 200 },
        { ingredient: { connect: { nom: "Jaunes d'oeuf" } }, quantite: 4 },
        { ingredient: { connect: { nom: "Blancs d'oeuf" } }, quantite: 4 },
      ]
    }
  },
  {
    titre: "Biscuit dacquoise",
    instructions: "Mélanger les amandes en poudre, le sucre glace et la farine. Monter les blancs en neige et les serrer avec le sucre en poudre. Incorporer délicatement les poudres dans les oeufs en neige. Mettre en poche et étaler à la douille. Cuire 20 minutes à 170°C.",
    ingredients: {
      create: [
        { ingredient: { connect: { nom: "Amandes en poudre" } }, quantite: 150 },
        { ingredient: { connect: { nom: "Sucre glace" } }, quantite: 150 },
        { ingredient: { connect: { nom: "Farine" } }, quantite: 30 },
        { ingredient: { connect: { nom: "Blancs d'oeuf" } }, quantite: 5 },
        { ingredient: { connect: { nom: "Sucre en poudre" } }, quantite: 50 },
      ]
    }
  },
  {
    titre: "Cookies",
    instructions: "Mélanger la farine avec la levure et le sel. Crémer les sucres avec le beurre puis ajouter l'oeuf et mélanger. Incorporer les poudres. Ajouter des morceaux de chocolat. Former des boules et refroidir. Cuire 12 minutes à 180°C.",
    ingredients: {
      create: [
        { ingredient: { connect: { nom: "Farine" } }, quantite: 240 },
        { ingredient: { connect: { nom: "Levure chimique" } }, quantite: 10 },
        { ingredient: { connect: { nom: "Sel" } }, quantite: 5 },
        { ingredient: { connect: { nom: "Sucre en poudre" } }, quantite: 100 },
        { ingredient: { connect: { nom: "Sucre complet" } }, quantite: 50 },
        { ingredient: { connect: { nom: "Beurre" } }, quantite: 100 },
        { ingredient: { connect: { nom: "Oeufs" } }, quantite: 2 },
        { ingredient: { connect: { nom: "Chocolat" } }, quantite: 100 },
      ]
    }
  }
];

async function main() {
  await Promise.all(ingredients.map((ingredient) => {
    return prisma.ingredient.create({
      data: ingredient
    });
  }));

  await Promise.all(recettes.map((recette) => {
    return prisma.recette.create({
      data: recette
    });
  }));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
