const BASE_URL = 'http://localhost:8080/api'

export const RegisterData = async (form) => {
    try {
        const res = await fetch(`${BASE_URL}/register`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
        return await res.json()
    } catch (error) {
        console.log(error);
    }
}


export const LoginData = async (form) => {
    try {
        const res = await fetch(`${BASE_URL}/login`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
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




export const GetFlight = async () => {
    try {
        const res = await fetch(`${BASE_URL}/getflight`, {
            method: "get",
            headers: {
                "Content-Type": "application/json"
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

        console.log("Sending Change Password Data:", data);
        console.log("Token:", token);

        const response = await fetch(`${BASE_URL}/change-password`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                password: data.oldPassword,
                newPassword: data.newPassword,
                confirmPassword: data.confirmPassword
            })
        });

        const result = await response.json();

        console.log("Change Password API Response:", result);

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

        // console.log("Dashboard Stats:", data);

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




export const AddFlightAdmin = async (formData) => {
    try {

        const token = localStorage.getItem("token");

        const res = await fetch(`${BASE_URL}/createflight`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });

        const result = await res.json();

        if (!res.ok) {
            throw new Error(
                result.message || "Failed to add flight"
            );
        }

        return result;

    } catch (error) {

        console.error("Add Flight API Error:", error);

        throw error;
    }
};




export const DeleteFlight = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/deleteflight/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to delete flight");
        }

        return result;

    } catch (error) {
        console.error("Delete Flight API Error:", error);
        throw error;
    }
};

export const CreateBooking = async (bookingPayload) => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${BASE_URL}/booking`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(bookingPayload)
        });

        const result = await response.json();

        // console.log("Create Booking API Response:", result);

        if (!response.ok) {
            throw new Error(
                result.message || `Booking failed with status ${response.status}`
            );
        }

        return result;

    } catch (error) {
        console.error("Create Booking API Error:", error);
        throw error;
    }
};


export const GetMyBookings = async () => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${BASE_URL}/my-bookings`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const result = await response.json();


        if (!response.ok) {
            throw new Error(
                result.message || "Failed to fetch bookings"
            );
        }

        return result;

    } catch (error) {
        console.error("Get My Bookings API Error:", error);
        throw error;
    }
};



export const GetAllBookings = async () => {

    try {

        const response = await fetch(
            `${BASE_URL}/all-bookings`
        );

        const result = await response.json();


        if (!response.ok) {
            throw new Error(
                result.message || "Failed to fetch all bookings"
            );
        }

        return result;

    } catch (error) {

        console.error(
            "Get All Bookings API Error:",
            error
        );

        throw error;
    }
};




export const ApproveBooking = async (bookingId) => {
    try {

        const response = await fetch(
            `${BASE_URL}/approve-booking/${bookingId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const result = await response.json();

        // console.log("Approve Booking Response:", result);

        if (!response.ok) {
            throw new Error(
                result.message || "Failed to approve booking"
            );
        }

        return result;

    } catch (error) {

        console.error("Approve Booking API Error:", error);

        throw error;
    }
};