import ExercisesDAO from "./exercisesDAO.js";
import SetsDAO from "./setsDAO.js";
import userDAO from "./userDAO.js";
import workoutsDAO from "./workoutsDAO.js";

/**
 * Main Data Access Object that encapsulates all the other DAOs
 */
const mainDAO = {
    exercisesDao: ExercisesDAO,
    setsDao: SetsDAO,
    usersDao:userDAO,
    workoutsDao: workoutsDAO
}

export default mainDAO