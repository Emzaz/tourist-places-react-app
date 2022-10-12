import * as yup from "yup";

export const placeSchema = yup.object({
    name: yup.string().required(),
    address: yup.string().required(),
    rating: yup.number().min(1).max(5).required(),
    type: yup.string().required(),
    picture: yup.string().required()
})