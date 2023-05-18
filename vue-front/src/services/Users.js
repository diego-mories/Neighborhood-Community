import http from '../http-common'
const API_URL_PATH = 'users/'

class ServicesUser {
    /* ---- MAIN SERVICES ---- */ 
    // Login
    login (user) {
        const body = {
            email: user.email,
            password: user.password
        }
        return http.post(API_URL_PATH + 'login', body)
    }
    // Register new user (President or Owner)
    signUp (user) {
        const body = {
            name: user.name,
            surname: user.surname,
            community_id: user.community_id,
            email: user.email,
            phone: user.phone,
            role: user.role
        }
        return http.post(API_URL_PATH + 'signUp', body)
    }
    // Reset password user (Forgot password)
    resetPassword (email) {
        return http.get(API_URL_PATH + 'resetPassword?email=' + email)
    }
    // Change password user
    changePassword (tokenPass, password, userPass) {
        const body = {
            tokenPass: tokenPass,
            password: password,
            userPass: userPass
        }
        return http.post(API_URL_PATH + 'changePassword', body)
    }
    
    // Find data of one user by id
    findOne (id) {
        return http.get(API_URL_PATH + 'findOne?user_id=' + id)
    }
    // Find data of one user by email
    findOneEmail (email) {
        return http.get(API_URL_PATH + 'findOneEmail?email=' + email)
    }
    // Register doorman
    signUpDoorman (user) {
        const body = {
            name: user.name,
            surname: user.surname,
            email: user.email,
            phone: user.phone,
            role_id: user.role_id,
            community_id: user.community_id
        }
        return http.post(API_URL_PATH + 'signUpDoorman', body)
    }
    // Active user to login
    activeUser (tokenActive) {
        return http.get(API_URL_PATH + 'activeUser?tokenActive=' + tokenActive)
    }
}
export default new ServicesUser()