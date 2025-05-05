import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from '../components/layout/layout'
import ComingSoon from '../components/coming-soon'
import RecipeCard from '../components/recipe-card'
import {Seo} from '../components/seo/seo'

const spaghettiRecipe = {
  title: "Recipe of the Day: Spaghetti Code Carbonara",
  intro: "A tangled mess of logic that somehow works when you compile it!",
  ingredients: [
    "500g of freshly written functions (al dente)",
    "2 cups of variable declarations (the more cryptic, the better)",
    "A handful of nested if-statements",
    "3 tablespoons of commented-out debug print statements",
    "A pinch of syntax errors for that authentic flavor",
    "Liberal amounts of copy-pasted Stack Overflow answers"
  ],
  instructions: [
    "Begin by heating up your IDE to maximum performance",
    "Throw in your variables before they're properly initialized",
    "Mix in your functions, making sure to never document what they do",
    "Add nested if-statements until you can't remember what you're checking for",
    "Sprinkle with global variables throughout the codebase",
    "Let it simmer until deadline, then serve immediately before testing"
  ],
  joke: "Why did the programmer quit his job? Because he didn't get arrays!",
  warning: "Side effects may include: hair loss, uncontrollable muttering, and the sudden urge to rewrite everything in a new framework."
};

const IndexPage: React.FC<PageProps> = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <RecipeCard {...spaghettiRecipe} />
        <ComingSoon
          text="More delicious code recipes"
          highlight="cooking soon"
        />
      </div>
    </section>
  )
}

export default IndexPage

export const Head: HeadFC = () => (
  <Seo>
    <title>Cook The Code - Where Programming Gets Delicious</title>
    <meta name="description" content="Cooking up code recipes and programming humor" />
  </Seo>
)

export const Footer: HeadFC = () => (
  <footer className="py-8 bg-gray-800 text-white">
    <div className="container mx-auto text-center">
      <p>&copy; {new Date().getFullYear()} Cook The Code. All rights reserved.</p>
    </div>
  </footer>
)
