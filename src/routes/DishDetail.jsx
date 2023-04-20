import { useRef, useState } from 'react';

//  Routing (to get url parameter)
import { useParams } from 'react-router-dom';

//  Custom hook for fetching
import { useFetch } from '../hooks/useFetch';

//  Redux 
import { useSelector, useDispatch } from 'react-redux'
import { addFavorite } from '../features/user/userSlice';

//  Loader
import { DotSpinner } from '@uiball/loaders';

//  Components
import { Container } from '../components/Container';
import { YoutubePlayer } from '../components/YoutubePlayer';
import { Table } from '../components/Table';
import { Subtitle } from '../components/Subtitle';
import { Paragraph } from '../components/Paragraph';
import { Title } from '../components/Title';
import { Button } from '../components/Button';
import { Alert } from '../components/Alert';

export const DishDetail = () => {
    const { id } = useParams();
    const { data, loading } = useFetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, `${id}`);

    const [addSuccess, setAddSuccess] = useState(null);
    const alertContainer = useRef(null);
    //  Redux state
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser);

    const addToFavorites = (data) => {
        setAddSuccess(null);
        const fav = {
            id: data.idMeal,
            name: data.strMeal,
            category: data.strCategory,
            image: data.strMealThumb,
        }
        //  If user is logged in
        if (user[0] !== undefined) {
            dispatch(addFavorite({ fav: fav, id: user[0].id }));
            const alreadyExists = user[0].favs.filter(f => f.id === fav.id);
            alreadyExists.length > 0 ? setAddSuccess(false) : setAddSuccess(true);
        } else {
            setAddSuccess(false);
        }
        alertContainer.current.classList.remove("opacity-0");
        setTimeout(() => {
            alertContainer.current.classList.add("opacity-0");
        }, 1500);
    }
    //  Converts objects data to table
    const ingredientsMeasuresToTable = (obj) => {
        const ingredients = Object.values(Object.keys(obj).filter(key => key.includes("strIngredient")).reduce((cur, key) => Object.assign(cur, { [key]: obj[key] }), {}));
        const measures = Object.values(Object.keys(obj).filter(key => key.includes("strMeasure")).reduce((cur, key) => Object.assign(cur, { [key]: obj[key] }), {}));
        const table = [["Ingredient", "Quantity"]];
        ingredients.map((ingredient, i) => {
            if (ingredient !== "" && ingredient !== null && measures[i] !== "" && measures[i] !== null) {
                table.push([ingredient, measures[i]]);
            }
        })
        return table;
    };

    return (
        <Container>
            <div className="flex justify-center opacity-0 fixed top-50 left-0 right-0 z-50" ref={alertContainer}>
                <Alert isError={!addSuccess} text={addSuccess ? "Successfully added to your favorites!" : !addSuccess & user[0] === undefined ? "You need to be logged in to do this." : "Seems like this item is already on your favorites."} />
            </div>
            <div>
                {loading && <div className="grid place-content-center">
                    <DotSpinner
                        size={40}
                        speed={0.9}
                        color="#7d7259"
                    />
                </div>}
                {data?.meals[0] && (
                    <div className="content-center">
                        <div className="grid md:grid-cols-2 place-items-between gap-8">
                            <div className="w-1/2 md:w-full grid place-content-between gap-5">
                                <div className="">
                                    <div className="md:hidden"><Title>{data?.meals[0]?.strMeal && data.meals[0].strMeal}</Title></div>
                                    <img className="object-contain rounded-xl" src={data.meals[0].strMealThumb} />
                                </div>
                                <div>
                                    <Subtitle>Instructions</Subtitle>
                                    <Paragraph>{data.meals[0].strInstructions}</Paragraph>
                                </div>
                                <div>
                                    <Button clickHandler={() => addToFavorites(data.meals[0])}>Add to favorites</Button>
                                </div>
                            </div>
                            <div className="w-1/2 md:w-full grid place-content-between gap-5">
                                <div className="w-1/2 md:w-full">
                                    <div className="md:block hidden"><Title>{data?.meals[0]?.strMeal && data.meals[0].strMeal}</Title></div>
                                    <Table data={ingredientsMeasuresToTable(data.meals[0])} />
                                    <Paragraph>Dish origin: {data.meals[0].strArea}</Paragraph>
                                    <Paragraph>Recipe source: <a className="underline" href={data.meals[0].strSource} target="_blank">{data.meals[0].strSource ? "Click here" : "Not available"}</a></Paragraph>

                                </div>
                                <div className="w-1/2 md:w-full">
                                    <Subtitle>Watch the step by step: </Subtitle>
                                    <YoutubePlayer videoId={data.meals[0].strYoutube.split("=")[1]} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
};