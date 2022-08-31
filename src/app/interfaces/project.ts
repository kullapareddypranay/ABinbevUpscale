import { User } from "./user";

export interface Project {
    _id:string,
    projecttitle:string,
    projectdescription:string,
    projectstatus:string,
    projectmembers:User[],
    projectstakeholders:User[],
    projectstartdate:Date,
    projectunder:string,
    projectowner:User[],
    projectlink:string

}
