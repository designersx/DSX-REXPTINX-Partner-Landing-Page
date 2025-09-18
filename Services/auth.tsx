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

export const listSiteMap = async (url) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/map/list-sitemap2`,
      { url },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response)
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting agent file:",
      error.response?.data || error.message
    );
    throw new Error("Error deleting agent file");
  }
};

export const validateWebsite = async (websiteUrl) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/validate-website`, { website: websiteUrl });
    return res.data;
  } catch (error) {
    console.error("Error validating website:", error);
    return { valid: false, reason: 'Error validating website' };
  }
};
export const AddKB = async (formData) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/enterprise/AddEnterpriseKnowledgeBase`, formData,{
      headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data;
  } catch (error) {
    console.error("Error validating website:", error);
    return { valid: false, reason: 'Error validating website' };
  }
};