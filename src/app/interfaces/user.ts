export interface User {
    _id: string,
    name: string,
    email: string,
    ph_no: string,
    password: string,
    user_level: string,
    buddy: string|User |any,
    reportingTo: string | User |any,
    designation: string,
    aliasname: string,
    mentorTo: []|User[],
    onboardingcompleted: boolean,
    team:string

}