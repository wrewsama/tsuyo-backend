import ExercisesDAO from "./exercisesDAO";
import SetsDAO from "./setsDAO";
import userDAO from "./userDAO";
import workoutsDAO from "./workoutsDAO";

/**
 * Main Data Access Object that encapsulates all the other DAOs
 */
const mainDAO = {
    ExercisesDAO,
    SetsDAO,
    userDAO,
    workoutsDAO
}

export default mainDAO