import * as Yup from "yup";

const name_length = {
  min: 2,
  max: 70
};

const valid_grades = {
  min: 0,
  max: 13
};

export const FormSchema = Yup.object().shape({
  parent_name: Yup.string()
    .min(name_length.min, `Parents name minimum length is ${name_length.min}`)
    .max(name_length.max, `Parents name maximum length is ${name_length.mac}`)
    .required("Parents name is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  order_type: Yup.string().required("Must choose pizza type .. silly"),
  quantity_pizza: Yup.number()
    .moreThan(0, "Must have 1 or more slices")
    .required("Number of slices required"),
  grade: Yup.number()
    .moreThan(valid_grades.min, `Grade minimum ${valid_grades.min} `)
    .lessThan(valid_grades.max, `Grade maximum ${valid_grades.max}`),
  teacher: Yup.string()
    .min(name_length.min, `Teacher's name minimum ${name_length.min}`)
    .required("Teachers name required"),
  child_name: Yup.string()
    .min(name_length.min, `Childs name minimum length is ${name_length.min}`)
    .max(name_length.max, `Childs name maximum length is ${name_length.mac}`)
    .required("Childs name is required")
});
