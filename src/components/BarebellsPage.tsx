import React from "react";
import { motion } from "framer-motion";

interface BarebellsPageProps {
  onBack: () => void;
}

// Barebells chocolate bar data
const bareBellsData: Partial<unknown>[] = [
  {
    id: "caramel-cashew",
    name: "Caramel Cashew",
    description: "Smooth caramel with crunchy cashews",
    image: "/images/barebells/caramel-cashew.jpg",
    category: "protein-bar",
    metadata: {
      protein: "20g",
      calories: 199,
      flavor: "Sweet & Nutty",
      ingredients: ["cashew", "caramel", "protein", "chocolate"],
    },
  },
  {
    id: "cookies-cream",
    name: "Cookies & Cream",
    description: "Classic cookies and cream flavor",
    image: "/images/barebells/cookies-cream.jpg",
    category: "protein-bar",
    metadata: {
      protein: "20g",
      calories: 199,
      flavor: "Sweet & Creamy",
      ingredients: ["cookies", "cream", "protein", "chocolate"],
    },
  },
  {
    id: "salty-peanut",
    name: "Salty Peanut",
    description: "Perfect balance of salty and sweet",
    image: "/images/barebells/salty-peanut.jpg",
    category: "protein-bar",
    metadata: {
      protein: "20g",
      calories: 199,
      flavor: "Salty & Sweet",
      ingredients: ["peanuts", "salt", "protein", "chocolate"],
    },
  },
  {
    id: "coconut-cocoa",
    name: "Coconut Cocoa",
    description: "Tropical coconut meets rich cocoa",
    image: "/images/barebells/coconut-cocoa.jpg",
    category: "protein-bar",
    metadata: {
      protein: "20g",
      calories: 199,
      flavor: "Tropical & Rich",
      ingredients: ["coconut", "cocoa", "protein", "chocolate"],
    },
  },
  {
    id: "mint-dark-chocolate",
    name: "Mint Dark Chocolate",
    description: "Refreshing mint with dark chocolate",
    image: "/images/barebells/mint-chocolate.jpg",
    category: "protein-bar",
    metadata: {
      protein: "20g",
      calories: 199,
      flavor: "Fresh & Dark",
      ingredients: ["mint", "dark chocolate", "protein"],
    },
  },
  {
    id: "vanilla-milkshake",
    name: "Vanilla Milkshake",
    description: "Creamy vanilla milkshake taste",
    image: "/images/barebells/vanilla-milkshake.jpg",
    category: "protein-bar",
    metadata: {
      protein: "20g",
      calories: 199,
      flavor: "Creamy & Vanilla",
      ingredients: ["vanilla", "milk protein", "cream"],
    },
  },
];

export const BarebellsPage: React.FC<BarebellsPageProps> = ({ onBack }) => {
  return <><h1>Barebells</h1></>;
};

export default BarebellsPage;
