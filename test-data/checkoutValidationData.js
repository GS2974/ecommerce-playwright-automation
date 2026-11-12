export const checkoutValidationData = [
    {
        name: "First Name",
        firstName: "",
        lastName: "Doe",
        postalCode: "12345",
        expectedError: "Error: First Name is required"
    },
    {
        name: "Last Name",
        firstName: "John",
        lastName: "",
        postalCode: "12345",
        expectedError: "Error: Last Name is required"
    },
    {
        name: "Postal Code",
        firstName: "John",
        lastName: "Doe",
        postalCode: "",
        expectedError: "Error: Postal Code is required"
    }
];