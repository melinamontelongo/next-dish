//  Routing
import { useNavigate } from 'react-router-dom';

//  Redux
import { useDispatch, useSelector } from 'react-redux';
import { removeFavorite } from "../features/user/userSlice";

//  Components
import { Container } from "../components/Container";
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Message } from "../components/Message";
import { Title } from '../components/Title';

export const Favorites = () => {

    const navigate = useNavigate();

    //  Redux state
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser);
    const favorites = useSelector(state => {
        return state.user.users.filter(u => u.id === user[0]?.id)[0]?.favs;
    })
    
    const seeDetails = (category, id) => {
        navigate(`/dishes/${category}/${id}`);
    }
    const deleteFav = (dishId) => {
        dispatch(removeFavorite({ userId: user[0].id, favId: dishId }));
    }
    return (
        <Container>
            <Title>Your Favorites</Title>
            <Message>{user[0] ? `Welcome back, ${user[0].firstName}!` : "You should be logged in to view your favorites!"}</Message>
            {user[0] && favorites?.length <= 0 && <Message>Seems like you don't have any favorites yet.</Message>}
            <div className="flex justify-center">
                <div className="grid md:grid-cols-2 xl:grid-cols-3">
                    {favorites?.map((fav) => {
                        return (
                            <Card
                                key={fav.id}
                                image={fav.image}
                                title={fav.name}
                                footer={<><Button clickHandler={() => seeDetails(fav.category, fav.id)}>See details</Button> <Button clickHandler={() => deleteFav(fav.id)}>Delete</Button></>}
                            />
                        )
                    })}
                </div>
            </div>
        </Container>
    );
};