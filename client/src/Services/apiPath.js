export const Base_Url = "http://localhost:5158";

export const Api_Paths ={
    Auth : {
        Login : "/api/auth/login",
        Register:"/api/auth/register"
    },
    Doctor :{
        GetDoctors :"/api/doctor",
        GetSpecialization:"/api/doctor/specialization"
    },
    Appointment : {
        Book_Appointment:"/api/appointment/book"
    }

};