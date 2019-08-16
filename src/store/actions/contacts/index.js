import axios from 'axios';

export const loadContact = async ({ companyID, customerID}) => {
    const res = await axios.get(`/api/c/${companyID}/customer/${customerID}/contact`);
    if (!res) throw new Error(res);
    return res.data.contacts;
};

export const createContact = async (newContact, companyID, customerID) => {
    const res = await axios.post(`/api/c/${companyID}/customer/${customerID}/contact`);
    if (!res) throw new Error(res);
    return res.data.contacts;
};