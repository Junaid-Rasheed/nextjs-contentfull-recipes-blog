import React from "react";
import Image from "next/image";
import Link from "next/link";
function RecipeCard({ recipe }) {
  const { cookingTime, slug, title, thumbnail } = recipe.fields;
  return (
    <div >
      <Image
        className="card"
        src={"https:" + thumbnail.fields.file.url}
        // height={thumbnail.fields.file.details.image.height}
        // width={thumbnail.fields.file.details.image.width}
        width={350}
        height={270}
      />

      <div className="content">
        <h3>{title}</h3>
        <p>Takes approx {cookingTime} mins to cook</p>

        <Link href={'/recipes/' + slug}>
          <a>
            <h5>Cook This</h5>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;
