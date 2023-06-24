import * as Yup from 'yup';

export const signupSchema = Yup.object({
    name : Yup.string().min(2).max(20).required("Please enter Your name"),
    email: Yup.string().email().required("Please enter Your email"),
    subject: Yup.string().min(4).max(20).required("Please enter Your Password"),
    message: Yup.string().min(4).max(20).required("Please enter Your Message")
})