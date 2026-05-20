import axios from 'axios';
import constants from '../constants';

// API access to frontend JSON data transformation or decoder
const API = axios.create({
    baseURL: `${constants.HOST}/gigs`,
});

// Fetch all gigs
export const fetchGigs = () => API.get('/');

// Fetch one gig by MongoDB ObjectId
export const fetchGigById = (id) => API.get(`/${id}`);

// Create gig
export const createGig = (gig) => API.post('/', gig);

// Update gig
export const updateGig = (id, gig) => API.put(`/${id}`, gig);

// Delete gig
export const deleteGig = (id) => API.delete(`/${id}`);