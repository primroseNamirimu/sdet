
export type detailKind = "no_lastname" | "no_firstname" | "no_postal_code"

export interface checkoutDetails {
    lastname?: string;
    firstname?: string;
    postalCode?: string;
    expectedError: string;
}

export const expectedErrorMessages:Record<detailKind,checkoutDetails> = {
    no_lastname: {firstname: "Primrose", postalCode: "5000", expectedError: "Error: Last Name is required"},
    no_firstname: {lastname: "Nami", postalCode: "5000", expectedError: "Error: First Name is required"},
    no_postal_code: {firstname: "Primrose", lastname: "Nami", expectedError: "Error: Postal Code is required"}
}