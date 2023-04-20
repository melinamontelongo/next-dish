import { useState } from "react";
//  Routing
import { useNavigate } from 'react-router-dom';
//  React Hook Form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

//  Icons
import { AiOutlineSearch } from "react-icons/ai";

//  Components
import { Container } from "../../components/Container";
import { FormControl } from "../../components/FormControl";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Title } from "../../components/Title";
import { Message } from "../../components/Message";

//  Search validation
import { searchSchema } from '../../utils/validationSchemas';

export const Search = () => {
    const navigate = useNavigate();
    //  Form handling
    const { register, handleSubmit, formState } = useForm({ resolver: zodResolver(searchSchema) });
    const { errors } = formState;
    const [searchResults, setSearchResult] = useState(null);

    //  Search 
    const handleSearch = (searchValues) => {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValues.search}`)
            .then(res => res.json())
            .then(data => {
                setSearchResult(data);
            });
    };
    //  Redirect to selected dish
    const seeDetails = (category, id) => {
        navigate(`/dishes/${category}/${id}`);
    };

    return (
        <Container>
            <div className="grid place-content-center">
                <Title>Search...</Title>
                <form onSubmit={handleSubmit(handleSearch)}>
                    <div className="mb-5">
                        <FormControl error={errors["search"]} register={register} name="search" type="search" icon={<AiOutlineSearch />} placeholder="e.g: Pasta" />
                    </div>
                    <div className="mb-5">
                        <Button type="submit">Find</Button>
                    </div>

                </form>
            </div>
            <div className="flex justify-center">
                {searchResults?.meals ?
                    <div className="grid md:grid-cols-2 xl:grid-cols-3">
                        {searchResults?.meals.map((meal) => {
                            return (
                                <Card
                                    key={meal.idMeal}
                                    image={meal.strMealThumb}
                                    title={meal.strMeal}
                                    footer={<Button type="button">See details</Button>}
                                    clickHandler={() => seeDetails(meal.strCategory, meal.idMeal)}
                                />
                            )
                        })}
                    </div>
                      :
                      searchResults?.meals === null && <div className="w-full"><Message>Results not found</Message></div>
                    }
            </div>
        </Container>
    );
};