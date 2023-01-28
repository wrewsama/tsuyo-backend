import ExercisesDAO from "./exercisesDAO.js";
import SetsDAO from "./setsDAO.js";
import userDAO from "./userDAO.js";
import workoutsDAO from "./workoutsDAO.js";

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