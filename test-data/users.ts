export type UserKind = "standard_user" | "locked_out_user" | "problem_user" | "performance_glitch_user" | "error_user" | "visual_user" | "invalid_user_login";

export interface User {
    username:string;
    password:string;
    expectedError?:string;
}

export const users: Record<UserKind, User> = {
    standard_user:{username:"standard_user", password:"secret_sauce"},
    locked_out_user:{username:"locked_out_user", password:"secret_sauce", expectedError:"Epic sadface: Sorry, this user has been locked out."},
    problem_user:{username:"problem_user", password:"secret_sauce"},
    performance_glitch_user:{username:"performance_glitch_user", password:"secret_sauce"},
    error_user:{username:"error_user", password:"secret_sauce"},
    visual_user:{username:"visual_user", password:"secret_sauce"},
    invalid_user_login:{username:"standard_user", password:"not_the_password"},


}