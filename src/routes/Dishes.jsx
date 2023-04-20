//  Routing
import { useNavigate } from "react-router-dom";

//  Custom hook for fetching
import { useFetch } from "../hooks/useFetch";

//  Loader
import { DotSpinner } from '@uiball/loaders';

//  Components
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { Title } from "../components/Title";

export const Dishes = () => {
    const { data, loading } = useFetch("https://www.themealdb.com/api/json/v1/1/categories.php", "dishes_categories");
    const navigate = useNavigate();

    const clickHandler = (category) => {
        navigate(`/dishes/${category}`);
    }

    return (
        <Container>
            <Title>Categories</Title>
            {loading && <div className="grid place-content-center">
                <DotSpinner
                    size={40}
                    speed={0.9}
                    color="#7d7259"
                />
            </div>}
            <div className="flex justify-center">
                <div className="grid md:grid-cols-2 xl:grid-cols-3">
                    {data?.categories?.map((item) => {
                        return (
                            <Card
                                key={item.idCategory}
                                clickHandler={() => clickHandler(item.strCategory)}
                                image={item.strCategoryThumb}
                                title={item.strCategory}
                            />
                        )
                    })}
                </div>
            </div>
        </Container>
    );
};