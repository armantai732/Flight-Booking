const BASE_URL = 'http://localhost:8080/api'

export const RegisterData = async (form)=>{
    try {
        const res = await fetch(`${BASE_URL}/register`, {
            method: 'post',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(form)
        })
        return await res.json()
    } catch (error) {
        console.log(error);
    }
}


export const LoginData = async (form)=>{
    try {
        const res = await fetch(`${BASE_URL}/login`, {
            method: 'post',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(form)
        })
        return await res.json()
    } catch (error) {
        console.log(error);
    }
}


export const GetProfile = async () => {
    try {

        const token = localStorage.getItem("token");

        const res = await fetch(`${BASE_URL}/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        return await res.json();

    } catch (error) {
        console.log(error);
    }
};




export const GetFlight = async ()=>{
    try {
        const res = await fetch(`${BASE_URL}/getflight`, {
            method: "get",
            headers: {
                "Content-Type" : "application/json"
            },
        })

        return await res.json()
    } catch (error) {
        console.log(error)
    }
}



export const UpdateProfile = async (form) => {
    try {

        const token = localStorage.getItem("token");

        const res = await fetch(`${BASE_URL}/profile/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(form)
        });

        return await res.json();

    } catch (error) {
        console.log(error);
    }
};


export const changePassword = async (data) => {
    try {
                const token = localStorage.getItem("token");

        const response = await fetch(`${BASE_URL}/change-password`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            credentials: "include",
            body: JSON.stringify({
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
                confirmPassword: data.confirmPassword
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Password change failed");
        }

        return result;

    } catch (error) {
        console.error("Change Password API Error:", error);
        throw error;
    }
};




export const getDashboardStats = async () => {
    try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${BASE_URL}/dashboard-stats`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();

        console.log("Dashboard Stats:", data);

        if (!res.ok) {
            throw new Error(
                data.message || "Failed to fetch dashboard stats"
            );
        }

        return data;

    } catch (error) {
        console.error("Dashboard Stats API Error:", error);
        throw error;
    }
};