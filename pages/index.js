import { createClient } from "contentful";
import RecipeCard from "../components/RecipeCard";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const res = await client.getEntries({ content_type: "recipe" });
  return {
    props: {
      recipes: res.items,
    },
    // we added revalidate to auto reupdate the hosted site when we add new content in cms
    revalidate: 1,
  };
}

export default function Recipes({ recipes }) {
  console.log("helloss", recipes);
  return (
    <div className="recipe-list">
      <div className="main">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.sys.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
