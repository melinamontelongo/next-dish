//  Routing
import { useParams, useNavigate } from 'react-router-dom';

//  Custom hook for fetching
import { useFetch } from '../../hooks/useFetch';

//  Loader
import { DotSpinner } from '@uiball/loaders';

//  Components
import { Card } from '../../components/Card';
import { Container } from '../../components/Container';
import { Title } from '../../components/Title';

export const DishesCategories = () => {

    const { category } = useParams();
    const { data, loading } = useFetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`, `${category}_category`);
    
    const navigate = useNavigate();
    
    const clickHandler = (id) => {
        navigate(`/dishes/${category}/${id}`);
    }

    return (
        <Container>
            <Title>{category && category} Dishes</Title>
                    {loading && <div className="grid place-content-center">
                        <DotSpinner
                            size={40}
                            speed={0.9}
                            color="#7d7259"
                        />
                    </div>}
            <div className="flex justify-center">
                <div className="grid md:grid-cols-2 xl:grid-cols-3">
                    {data?.meals?.map((item) => {
                        return (
                            <Card
                                key={item.idMeal}
                                id={item.idMeal}
                                clickHandler={() => clickHandler(item.idMeal)}
                                image={item.strMealThumb}
                                title={item.strMeal}
                            />
                        )
                    })}
                </div>
            </div>
        </Container>
    );
};