import LikeButton from './button-like'

interface Props {
  title: string;
  intro: string;
  ingredients: string[];
  instructions: string[];
  joke: string;
  warning: string;
}

const RecipeCard = ({ title, intro, ingredients, instructions, joke, warning }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl text-indigo-600 mb-5 text-center font-bold">{title}</h2>
      <p className="italic mb-8 text-center text-gray-600">{intro}</p>

      <div className="mb-8">
        <h3 className="text-xl text-gray-800 mb-4 pb-2 border-b-2 border-dashed border-green-500">Ingredients</h3>
        <ul className="recipe-list space-y-3">
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="text-xl text-gray-800 mb-4 pb-2 border-b-2 border-dashed border-green-500">Cooking Instructions</h3>
        <ul className="recipe-list space-y-3">
          {instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ul>
      </div>

      <div className="bg-blue-50 border-l-4 border-green-500 p-4 my-8 italic">
        {joke}
      </div>

      <div className="mb-8">
        <h3 className="text-xl text-gray-800 mb-4 pb-2 border-b-2 border-dashed border-green-500">Warning</h3>
        <p>{warning}</p>
      </div>

      <LikeButton recipeId={'1'}/>

    </div>
  );
};

export default RecipeCard;