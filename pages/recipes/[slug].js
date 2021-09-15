import { createClient } from "contentful";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// GetStaticPaths

export const getStaticPaths = async () => {
  const res = await client.getEntries({ content_type: "recipe" });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

// GetStaticProps

export const getStaticProps = async ({ params }) => {
  const res = await client.getEntries({
    content_type: "recipe",
    "fields.slug": params.slug,
  });


  // we use this below function if someone tried to access any recipe using slug that doent even exist 
  if(!res.items.length){
    return{
      redirect:{
        destination:'/',
        permanent:false
      }
    }
  }


  return {
    props: {
      recipe: res.items[0],
    },
    revalidate: 1,
  };
};

export default function RecipeDetails({ recipe }) {
  if (!recipe) return <div>Loading ..</div>;

  console.log(recipe);
  const { featuredImage, cookingTime, title, ingredient, method } =
    recipe.fields;
  return (
    <div>
      <div className="banner">
        <Image
          src={"https:" + featuredImage.fields.file.url}
          // height={featuredImage.fields.file.details.image.height}
          // width={featuredImage.fields.file.details.image.width}
          width={1100}
          height={370}
        />
        <h1>{title}</h1>
      </div>

      <div className="info">
        <p> It take approx {cookingTime} mins</p>
        <h3>Ingrediants : </h3>
        {ingredient.map((obj) => (
          <span key={obj}>{obj}</span>
        ))}
      </div>
      <div className="method">
        <h3>Method : </h3>
        {documentToReactComponents(method)}
      </div>
    </div>
  );
}
