export const submitContactUsRequest = async (formattedData) =>{
    return await fetch(`${process.env.REACT_APP_API_URL}/contact_us`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData),
    }); 
}