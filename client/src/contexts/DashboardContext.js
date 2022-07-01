import { createContext, useReducer } from "react";
import { LAPTOP, MOBILE, SET_MARGIN_LEFT_CONTAINER, TABLET } from "../constants";
import { DashboardReducer } from "../reducers/DashboardReducer";


export const DashboardContext = createContext()

const DashboardContextProvider = ({children}) => {
    const [dashboardState, dispatch] = useReducer(DashboardReducer, {
        marginLeftContainer: 60,
        wMobile: false,
        wTablet: false
    })

    const setMarginLeftContainer = (isShort, screen = null) => {
        if(isShort) {
            dispatch({
                type: SET_MARGIN_LEFT_CONTAINER,
                payload: {
                    marginLeftContainer: screen === MOBILE ? 0: 60,
                }
            })
        } else {
            dispatch({
                type: SET_MARGIN_LEFT_CONTAINER,
                payload: {
                    marginLeftContainer: screen === MOBILE ? 0: 250,
                }
            })
        }
    }

    const data = {
        dashboardState,
        setMarginLeftContainer
    }

    return (
        <DashboardContext.Provider value={data}>
            {children}
        </DashboardContext.Provider>
    )
}

export default DashboardContextProvider