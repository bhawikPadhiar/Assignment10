let required = (propertyType) => {
    return v => v && v.length > 0 || `you must input a ${propertyType}`
}
let minLength = (propertyType,minLength)=> {
    return v => v && v.length>=minLength || `${propertyType} must be least ${minLength}`
}
let maxLength = (propertyType,maxLength) => {
    return v => v && v.length <= maxLength || `${propertyType} must be less than ${maxLength}`
}

let emailFormat =() => {
    let regex = 
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return v => v && regex.test(v) || "must be a valid email"
}

export default {
    required,
    minLength,
    maxLength,
    emailFormat,
    
}