import { gql } from "@apollo/client";

export const GET_PRODUCTS_QUERY = gql`
query {
    categories {
      name
      products {
        id
        name
        gallery
        description
        category
        brand
        attributes{
          id
          name
          type
          items {
            displayValue
            id
            value
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
    }
`

export const GET_CURRENCIES = gql`
query {
    currencies {
      label
      symbol
    }
}
`