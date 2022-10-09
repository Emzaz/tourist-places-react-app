import * as yup from "yup";

export const placeSchema = yup.object({
    name: yup.string().required("address required"),
    address: yup.string().required("address required"),
    rating: yup.number().min(1).max(5).required("rating required"),
    type: yup.string().required("type required"),
    picture: yup.string().required("picture required")
})