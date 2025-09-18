import axios from "axios";

// const URL = "https://rex-bk.truet.net";
console.log(process.env.NEXT_PUBLIC_API_URL)
// admin login api

export const Login = async (email, password) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/enterprise/EnterprisePartnerLogin`, { email, password });
        console.log(res)
        return res.data;
    } catch (error) {
      console.log(error)
         return error.response.data;
        if (error.response?.data?.msg) {
            throw new Error(error.response.data.msg);
        }
      
    }
};
