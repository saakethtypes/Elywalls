const appreducer = (state, action) => {
    switch (action.type) {

        case "ERROR":
            return {
                ...state,
                ...state.error,
                error: action.payload
            };

        case "LOGIN":
            return {
                ...state,
                user: action.logged_profile,
                cart: action.logged_profile.cart,
                log_status: true
            };

        case "LOGOUT":
            return {
                ...state,
                user: null,
                log_status: false
            }

        case "EDIT_PROFILE":
            return {
                ...state,
                ...state.user,
                user: action.editted_user
            }

        case "ALL_POSTERS":
            
            return {
                ...state,
                posters: action.all_posters
            }


        case "FEATURED_POSTERS":
            return {
                ...state,
                posters: action.featured
            }

        case "PHOTOGRAPHY_POSTERS":
            return {
                ...state,
                posters: action.photography
            }

        case "PHOTOSHOP_POSTERS":
            return {
                ...state,
                posters: action.photoshop
            }

        case "GRAPHIC_POSTERS":
            return {
                ...state,
                posters: action.graphic
            }

        case "TEXTOGRAPHY_POSTERS":
            return {
                ...state,
                posters: action.textography
            }

        case "INSTAFAMOUS_POSTERS":
            return {
                ...state,
                posters: action.instafamous
            }

        case "POPULAR_POSTERS":
            return {
                ...state,
                posters: action.popular
            }

        case "ADMIRED_POSTERS":
            return {
                ...state,
                posters: action.user_admiredP
            }

        case "ADMIRED_ARTISTS":
            return {
                ...state,
                artists: action.user_admiredA
            }

        case "POSTER_SINGLE":
            return {
                ...state,
                poster: action.poster
            }

        case "ARTIST_SINGLE":
            return {
                ...state,
                artist: action.artist
            }

        case "EDIT_POSTER":
            return {
                ...state,
                poster: action.artist
            }

        case "ADD_TO_CART":
            return {
                ...state,
                cart: action.cart
            }
        
        case "CART":
                return {
                    ...state,
                    cart: action.cart
                }

        case "DELETE_FROM_CART":
            return {
                ...state,
                user:{
                    ...state.user,
                    cart: [
                        ...state.user.cart.filter(
                            cartitem => action.item_removed !== cartitem._id
                        )
                    ]
                },
                cart: state.cart.filter(item =>
                    action.item_removed !== item._id),
            }

        case "CREATE_POSTER":
            return {
                ...state,
                poster: action.poster_created
            }

        default:
            return state;

    }
};

export default appreducer;
