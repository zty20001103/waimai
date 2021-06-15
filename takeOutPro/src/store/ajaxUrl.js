import axios from "axios";
const requests = new axios.create({
  baseURL:"http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT"
});
export  default  requests;
