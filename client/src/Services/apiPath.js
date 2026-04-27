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
        Book_Appointment:"/api/appointment/book",
        Get_Patient_Appointments:"/api/appointment/myappointment"
    },
    Admin:{
        Get_Appointments:"/api/appointment",
        Status: (id)=>`/api/appointment/${id}/status`,
        Delete:(id) => `/api/appointment/${id}`,
        Get_pending:"/api/appointment/pending",
        Get_Doctors:"/api/doctor/all",
        Delete_doctor:(id)=>`/api/doctor/${id}`,
        Add_Doctor:"/api/doctor",
        Get_patient:"/api/patient",
        Delete_Patient:(id) =>`/api/patient/${id}`,
        
    }

};  