import axios from 'axios';
export const updateUser=(userId,user)=>axios.put('http://localhost:8080/api/user/'+userId);
