import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        currentUser: [],
        error: {},
    },
    reducers: {
        registerUser: (state, action) => {
            const userExists = state.users.filter(user => user.username === action.payload.username);
            if (userExists.length > 0) return { ...state, error: { message: "The user already exists." } }
            return {
                ...state,
                users: [...state.users, action.payload],
                error: {},
            }
        },
        loginUser: (state, action) => {
            const findUser = state.users.filter(user => user.username === action.payload.username && user.password === action.payload.password);
            return {
                ...state,
                currentUser: findUser,
                error: {},
            }
        },
        logoutUser: (state, action) => {
            return {
                ...state,
                currentUser: [],
                error: {},
            }
        },
        editUser: (state, action) => {
            const updatedUsers = state.users.map(user => {
                console.log(user)
                if(user.id === action.payload.id){
                        return user = {id: action.payload.id, ...action.payload.edited, favs: user.favs};
                } else {
                    return user;
                }
            })
            return {
                ...state,
                users: updatedUsers,
            }
        },
        addFavorite: (state, action) => {
            const findUserFavs = state.users.map(user => {
                if(user.id === action.payload.id){
                   const favExists = user.favs.filter(fav => fav.id === action.payload.fav.id);
                   if(favExists.length > 0) {
                    return {...state}
                } else {
                    user.favs = [...user.favs, action.payload.fav];
                    state.currentUser[0].favs.push(action.payload.fav)
                }
            }
            });
        },
        removeFavorite: (state, action) => {
            const removeFav = state.users.map(user => {
                if(user.id === action.payload.userId){
                    user.favs = user.favs.filter(fav => fav.id !== action.payload.favId);
                }
            })
            
        }
    }
})

export const { registerUser, loginUser, logoutUser, editUser, addFavorite, removeFavorite } = userSlice.actions

export default userSlice.reducer